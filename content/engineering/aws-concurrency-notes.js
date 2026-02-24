// To add a new post: create a new .js file in this folder, export the markdown as default.
// Then import it in assets.js and add it to the engineeringPosts array.

const content = `
# Lambda, S3, API Gateway & ECS — My Notes on How They Handle Concurrent Traffic

> These are my personal notes from working through concurrency and scaling questions on AWS. I ra
       n into most of this while building APIs that needed to handle bursty traffic — thousands of reque
       sts hitting Lambda through API Gateway and writing results to S3. I also had a few conversations
       with AWS Support and teammates that cleared up a lot of misconceptions I had. Documenting it here
        so I don't have to re-learn it six months from now.
>
> If you stumbled upon this and find it useful, great.

*Last verified: February 2026*

---

## The Problem That Started All This

We had an API Gateway → Lambda → S3 pipeline. Around 2,000 requests would come in within a 6-minute window, and this pattern repeated every 2 hours throughout the day. Two questions kept coming up:

1. Can Lambda handle this without choking?
2. If all those Lambda instances write to S3 at the same time, will we lose data?

Turns out the answers are nuanced. Here's everything I learned.

---

## Lambda Concurrency — How It Actually Works

### The Basics

Every incoming request gets its own isolated execution environment. 10 simultaneous requests = 10 separate Lambda containers running your code in parallel. They don't share memory, they don't share state, they're completely independent.

Your AWS account starts with a **default concurrency limit of 1,000 per region**. This is shared across ALL Lambda functions in that region. So if you have Function A, Function B, and Function C — they're all drawing from the same pool of 1,000.

**Heads up:** New AWS accounts might start with as low as 10 concurrent executions. It scales up automatically as you use it, but this caught me off guard during initial testing.

### Quick Math for Our Scenario

2,000 requests in 6 minutes = ~5.6 requests/second on average.

If each Lambda takes 500ms to execute:
- Peak concurrent instances needed ≈ 3
- Nowhere near the 1,000 limit

If each Lambda takes 5 seconds:
- Peak concurrent instances needed ≈ 28
- Still fine

The only way this becomes a problem is if all 2,000 arrive in the same second AND each takes a while to finish. Even then, Lambda's scaling is fast enough now.

### The November 2023 Scaling Change (This Is a Big Deal)

The old model was painfully slow: 500 new instances per minute, shared across your entire account. So if one function was scaling up, it slowed down scaling for every other function.

**New model:** Each function scales independently at **1,000 new execution environments every 10 seconds**.

To put that in perspective:
- Second 0: 800 requests arrive → Lambda spins up 800 instances → all handled
- Second 10: 1,500 more arrive → Lambda can add another 1,000 → handled
- Second 20: Still more traffic → another 1,000 available

This is per-function, not per-account. Massive improvement.

### The "Noisy Neighbor" Problem (Learned This the Hard Way)

This one bit us. Here's what happened:

We had three functions in the same account. Our main API function normally used ~200 concurrent instances. Someone triggered a batch processing function that spiked to 900 instances. That left only 100 for everything else. Our API started returning 500 errors to users.

The confusing part: Lambda's throttle error is \`429 TooManyRequestsException\`, but **API Gateway converts this to a \`502\` or \`500\`** before sending it to the client. So in our logs it looked like our API was broken, when really it was just out of concurrency because of an unrelated function.

**Fix: Reserved Concurrency**

You can carve out a dedicated slice of the pool for a specific function. We reserved 300 for our API. No other function can touch those 300, and our API can never exceed 300 — but at least it's guaranteed.

\`\`\`
Account limit:         1,000
Reserved for API:        300  (guaranteed, no matter what)
Remaining shared pool:   700  (available to all other functions)
AWS keeps reserved:      100  (always held back, you can't allocate this)
\`\`\`

Important: reserved concurrency is free. It's just configuration.

### Reserved vs. Provisioned Concurrency

I kept mixing these up, so writing it down clearly:

**Reserved Concurrency (free)**
- Guarantees X instances are available for this function
- Also CAPS the function at X (it's both a floor and ceiling)
- Containers still cold-start when scaling from zero

**Provisioned Concurrency (costs money)**
- Pre-warms X instances so they're ready to go immediately
- Eliminates cold starts (matters a lot for Java/.NET, less for Python/Node)
- Costs ~$0.0000041667 per GB-second on x86
- Must target a published version or alias, not \`$LATEST\`

**When I use what:**
- Reserved concurrency → on any function that can't afford to be starved by other functions
- Provisioned concurrency → only on the 1-2 most latency-sensitive customer-facing endpoints
- Neither → internal tools, background jobs, anything where a cold start doesn't matter

### The TPS Cap I Didn't Know About

Lambda also has a requests-per-second limit: **10× your concurrency limit**. So at default 1,000 concurrency, you're capped at 10,000 RPS.

For most functions this doesn't matter because the concurrency limit is the binding constraint. But if your function executes in <100ms, the TPS cap can actually hit first. A 1ms function with 1,000 concurrency could theoretically handle 1,000,000 RPS, but Lambda caps it at 10,000.

---

## Lambda Writing to S3 Concurrently

This was the part I was most confused about. AWS Support cleared it up on a call.

### Different Keys = No Problem

If each Lambda instance writes to its own unique S3 key, everything is fine:

\`\`\`
Instance 1  →  s3://bucket/data/req-abc123.json  ✅
Instance 2  →  s3://bucket/data/req-def456.json  ✅
Instance 3  →  s3://bucket/data/req-ghi789.json  ✅
\`\`\`

900 concurrent writes to different keys? S3 handles it. The limit is 3,500 PUT requests per second per prefix, so you'd need to be doing way more than 900 to hit that.

**This is what we do.** We include the request ID or a UUID in the S3 key path. Simple, safe, no conflicts.

### Same Key = Last Writer Wins (Silent Data Loss)

If all instances write to the SAME key:

\`\`\`
Instance 1  →  s3://bucket/data/report.json  (writes version A)
Instance 2  →  s3://bucket/data/report.json  (writes version B)  ← overwrites A
Instance 3  →  s3://bucket/data/report.json  (writes version C)  ← overwrites B
\`\`\`

**Only the last write survives. No error. No warning. Every instance gets a 200 OK.**

The data isn't corrupted — S3 guarantees atomicity at the single-key level. A GET always returns a complete object, never a half-written one. But 899 out of 900 writes just vanish.

### Conditional Writes (New in 2024 — This Changes Things)

AWS added two headers that solve the concurrent-write problem without needing DynamoDB locking:

**\`If-None-Match: *\`** — Write only if the key doesn't exist yet.

\`\`\`python
try:
    s3.put_object(
        Bucket='my-bucket',
        Key='reports/daily-report.json',
        Body=report_data,
        IfNoneMatch='*'
    )
    print("Wrote successfully")
except s3.exceptions.ClientError as e:
    if e.response['Error']['Code'] == '412':
        print("Key already exists, someone else got there first")
\`\`\`

**\`If-Match: {etag}\`** — Optimistic locking. Read the object, get the ETag, modify, write back only if nobody changed it in between.

\`\`\`python
# Read
response = s3.get_object(Bucket='my-bucket', Key='data/state.json')
etag = response['ETag']
data = json.loads(response['Body'].read())

# Modify
data['count'] += 1

# Write back (fails with 412 if someone else modified it)
try:
    s3.put_object(
        Bucket='my-bucket',
        Key='data/state.json',
        Body=json.dumps(data),
        IfMatch=etag
    )
except s3.exceptions.ClientError as e:
    if e.response['Error']['Code'] == '412':
        # Retry the whole read-modify-write cycle
        pass
\`\`\`

Before 2024, you had to use DynamoDB as a distributed lock. These headers are way simpler.

### S3 Consistency Model (Quick Note)

Since December 2020, S3 provides **strong read-after-write consistency**. After a successful PUT, any subsequent GET immediately returns the new version. After a DELETE, the object is immediately gone. LIST reflects changes immediately too. No more eventual consistency weirdness.

---

## API Gateway — Things I Keep Looking Up

### Default Throttle Limits

| | Default |
|---|---|
| Steady-state RPS | 10,000 |
| Burst | 5,000 |

These are per-account, per-region, shared across ALL your APIs (REST, HTTP, and WebSocket).

Some smaller regions (Africa/Cape Town, Europe/Milan, Asia Pacific/Jakarta) default to 2,500 RPS / 1,250 burst.

### REST API vs. HTTP API

| | REST API | HTTP API |
|---|---|---|
| Cost per million | $3.50 | $1.00 |
| Usage plans & API keys | Yes | No |
| Request/response transforms | Yes | Limited |
| Async Lambda invocation | Yes | No |

For most of what we do, HTTP API is fine and 3.5x cheaper.

### The 29-Second Timeout

API Gateway has a 29-second default timeout for Lambda integrations. If your function takes longer, the client gets a \`504 Gateway Timeout\` even though Lambda is still running and will eventually finish.

As of June 2024, you can increase this beyond 29 seconds for regional and private REST APIs. But if you're hitting this regularly, it's probably time to rethink the architecture.

---

## ALB + ECS — The Container Side
### How the Pieces Fit Together

\`\`\`
User  →  ALB  →  ECS Service  →  Tasks (containers running on EC2 or Fargate)
\`\`\`

ECS is the **controller**. It decides which instances run which tasks, handles scaling, and manages registration with the ALB. The ALB is the **traffic router** — it decides which healthy container gets the next request.

In our setup, a service like \`athena-data-api\` is defined as an ECS service. ECS runs tasks for that service across instances, and the ALB routes incoming requests to those tasks.

### ALB Routing Algorithms

**Round Robin (what we currently use)**

Requests go to containers in order: 1, 2, 3, 1, 2, 3... Simple. Works fine when all requests take roughly the same time.

Breaks down when some requests are slow. Container 1 gets stuck on a 10-second request. Its turn comes around again but it's still busy. Requests queue up behind it while 2 and 3 sit idle.

**Least Outstanding Requests (probably what we should switch to)**

New requests go to whichever container has the fewest in-flight requests. If Container 1 is handling 5 requests and Container 2 is handling 1, the next request goes to Container 2.

This is better for workloads with variable response times — which is basically everything.

**Weighted Random with Anomaly Detection (newest, added November 2023)**

ALB monitors each container's actual behavior — not just "is it alive?" but "is it returning errors?" If a container starts returning 5xx errors, ALB automatically reduces traffic to it and gradually restores it when it recovers.

This catches the scenario where a container passes health checks but is actually degraded. Regular health checks only catch total failures.

### ECS Auto Scaling

The simplest setup: target tracking on CPU.

\`\`\`
Target: 70% average CPU utilization
Min tasks: 2
Max tasks: 20
\`\`\`

ECS adds tasks when CPU exceeds 70%, removes them when it drops below. New tasks register with the ALB automatically. When scaling down, the ALB drains connections gracefully — stops sending new requests to the task being terminated and waits for in-flight requests to complete.

---

## Lambda vs. ECS — Cost Notes

This is the part that surprised me the most.

At low traffic, Lambda is way cheaper (pay-per-use, zero cost at idle). But API Gateway's per-request pricing compounds fast.

**Rough numbers at ~450 RPS steady-state:**

| Setup | Monthly Cost |
|---|---|
| API Gateway + Lambda | ~$4,163 |
| ALB + ECS | ~$166 |

That's API Gateway's $1.00-$3.50/million pricing doing most of the damage. ALB is a flat ~$16/month plus small LCU fees.

The crossover where containers become cheaper is typically around **100-500 million requests per month**, depending on request characteristics.

**My rule of thumb:**
- Sporadic, bursty, unpredictable traffic → Lambda
- Steady high throughput 24/7 → ECS
- Need long-running processes (>15 min) or >10GB memory → ECS (Lambda can't do this)

---


*These notes are based on AWS documentation, AWS Support conversations, and team discussions. Limits and behavior can change — always verify against [AWS Lambda Quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) and [API Gateway Quotas](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html) for the latest.*
`;

export default content;
