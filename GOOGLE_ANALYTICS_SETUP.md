# 📊 Google Analytics Setup Guide

## ✅ Code Setup Complete!

I've already added the Google Analytics code to your site. Now you just need to get your tracking ID and add it to the environment variable.

---

## 🚀 Step-by-Step Instructions

### Step 1: Create Google Analytics Property

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com
   - Sign in with your Google account

2. **Create New Property** (if you don't have one)
   - Click **"Admin"** (gear icon in bottom left)
   - Under "Property" column, click **"Create Property"**

3. **Fill in Property Details:**

   ```
   Property name: Dharma Bandaru Portfolio
   Reporting time zone: (Your timezone - e.g., America/Chicago)
   Currency: USD
   ```

   - Click **"Next"**

4. **Business Information:**

   ```
   Industry: Technology
   Business size: Small (1-10 employees)
   ```

   - Click **"Next"**

5. **Business Objectives:**
   - Select: "Examine user behavior"
   - Click **"Create"**

6. **Accept Terms of Service**
   - Check the boxes
   - Click **"I Accept"**

---

### Step 2: Set Up Data Stream

1. **Choose Platform:**
   - Click **"Web"**

2. **Set Up Web Stream:**

   ```
   Website URL: https://dharmabandaru.com
   Stream name: Portfolio Website
   ```

   - Click **"Create stream"**

3. **Copy Your Measurement ID**
   - You'll see a **Measurement ID** like: `G-XXXXXXXXXX`
   - **COPY THIS ID!** You'll need it in the next step

---

### Step 3: Add Measurement ID to Your Site

1. **Open your `.env.local` file**
   - It's in the root of your project

2. **Add your Measurement ID:**

   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Replace `G-XXXXXXXXXX` with your actual ID

3. **Save the file**

4. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

---

### Step 4: Verify It's Working

1. **Visit your site:**
   - Go to http://localhost:3000
   - Click around a few pages

2. **Check Real-Time Reports:**
   - Go back to Google Analytics
   - Click **"Reports"** → **"Realtime"**
   - You should see yourself as an active user!

3. **Test on Production:**
   - Deploy your site with the new env variable
   - Visit your live site
   - Check real-time reports again

---

## 🎯 What You'll See in Analytics

### Immediately (Real-Time):

- Active users on your site right now
- Which pages they're viewing
- Where they're from (country/city)

### After 24-48 Hours:

- Total visitors
- Page views
- Traffic sources (Google, LinkedIn, Direct, etc.)
- Popular pages
- User demographics
- Device types (mobile, desktop)

### After 1 Week:

- Trends and patterns
- Bounce rate
- Average session duration
- Conversion tracking (if set up)

---

## 📈 Key Metrics to Watch

### 1. **Users**

- How many people visit your site
- **Goal:** Steady growth month-over-month

### 2. **Traffic Sources**

- Where visitors come from
- **Watch for:** LinkedIn, Google, Direct
- **Goal:** Diversify traffic sources

### 3. **Popular Pages**

- Which pages get most views
- **Use this to:** Know what content resonates

### 4. **Bounce Rate**

- % of people who leave after viewing one page
- **Good:** Under 60%
- **Great:** Under 40%

### 5. **Average Session Duration**

- How long people stay
- **Good:** 1-2 minutes
- **Great:** 2+ minutes

---

## 🔧 Advanced Setup (Optional)

### Track Resume Downloads

Add this to your About component where the resume link is:

```javascript
// In app/components/About.jsx
const handleResumeClick = () => {
  // Track with Google Analytics
  if (window.gtag) {
    window.gtag('event', 'resume_download', {
      event_category: 'engagement',
      event_label: 'Resume PDF',
    });
  }
};

// Update the link:
<a
  href="https://dharma-portfolio-pdfs.s3.us-east-1.amazonaws.com/Dharma_Bandaru_Resume.pdf"
  onClick={handleResumeClick}
  target="_blank"
  rel="noopener noreferrer"
>
  My resume
</a>;
```

### Track PDF Opens

Add tracking to book summary clicks:

```javascript
// In app/components/Work.jsx
const handleCardClick = (pdfUrl, title) => {
  if (window.gtag) {
    window.gtag('event', 'pdf_view', {
      event_category: 'engagement',
      event_label: title,
      value: pdfUrl,
    });
  }
  window.open(pdfUrl, '_blank');
};
```

---

## 🎓 Learning Resources

### Google Analytics Academy (Free):

- https://analytics.google.com/analytics/academy/

### Key Reports to Check Weekly:

1. **Acquisition → Traffic acquisition** - Where visitors come from
2. **Engagement → Pages and screens** - Popular pages
3. **User → Demographics** - Who your visitors are
4. **Realtime** - Current activity

---

## 🚨 Important Notes

### Privacy & GDPR:

- Google Analytics is GDPR compliant by default
- No cookie banner needed for basic analytics
- Data is anonymized

### Environment Variables:

- `.env.local` is in `.gitignore` (good!)
- Don't commit your Measurement ID to GitHub
- Add it to your hosting platform's env variables

### Production Deployment:

When deploying to Vercel/Netlify:

1. Go to your project settings
2. Add environment variable:
   - Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`
3. Redeploy

---

## ✅ Checklist

- [ ] Created Google Analytics property
- [ ] Got Measurement ID (G-XXXXXXXXXX)
- [ ] Added ID to `.env.local`
- [ ] Restarted dev server
- [ ] Verified in real-time reports
- [ ] Added to production environment variables
- [ ] Deployed to production
- [ ] Verified on live site

---

## 🎉 You're Done!

Once you complete these steps, you'll have full visibility into:

- How many people visit your site
- Where they come from
- What they're interested in
- How long they stay

This data will help you make informed decisions about your content and career strategy!

---

## 💡 Pro Tip

**Check your analytics weekly** to:

1. See which content is popular
2. Understand your audience
3. Track growth over time
4. Make data-driven decisions

**Set a reminder:** Every Monday morning, check your analytics for 5 minutes!

---

## 🆘 Troubleshooting

### Not seeing data?

1. Check that Measurement ID is correct
2. Verify `.env.local` has the ID
3. Restart dev server
4. Clear browser cache
5. Try incognito mode
6. Wait 24 hours (data can be delayed)

### Still not working?

1. Check browser console for errors
2. Verify the script is loading (View Page Source)
3. Make sure ad blockers are disabled
4. Test on different browser

---

**Need help?** Let me know your Measurement ID and I'll verify everything is set up correctly!
