'use client';

import Head from 'next/head';

const convictions = [
  {
    ticker: 'GTLB',
    name: 'GitLab',
    tag: 'DevSecOps Platform',
    summary:
      'GitLab is widely considered the second-best code repository platform after GitHub, but its real differentiation is being a more end-to-end DevSecOps platform covering the full software development lifecycle — from code repository to CI/CD to deployment.',
    bullets: [
      'Probably the leader in end-to-end SDLC platforms (code repository → code deployment).',
      'Widely adopted across enterprises — ~50% of Fortune 100 companies use GitLab.',
      'Many scaling companies use GitLab for CI/CD maturity compared to GitHub Actions.',
      'Trading near 52-week lows as of May 9, 2026.',
      'Zero debt with enterprise value lower than market cap.',
      'Strong free cash flow trend with improving leverage over time.',
      'Revenue growth remains strong (~20%+ in FY2026).',
      'P/S ratio < 5 — attractive for a high-growth SaaS company.',
      'Dollar-based net retention (DBNRR): 118% — a key metric to monitor.',
      'Leads 4 out of 6 categories in Gartner 2025 evaluations.',
      'GitLab Dedicated for U.S. government and regulated environments.',
      '$400M share buyback authorization signals management confidence.',
    ],
    risks: [
      'FY2027 guidance reduced to 15–17% growth from ~26% prior growth.',
      'Declining DBNRR (152% → 130% → 118%) is a major signal to watch closely.',
    ],
    allocation: '1.75% (planned max ~2.25%)',
  },
  {
    ticker: 'PATH',
    name: 'UiPath',
    tag: 'RPA & Agentic AI',
    summary:
      'UiPath is a leader in the RPA (Robotic Process Automation) segment and is well-positioned in the emerging world of agentic AI workflows. As agentic AI expands, many workflows will still require deterministic decision-making — RPA tools like UiPath are likely to complement AI systems rather than be replaced by them.',
    bullets: [
      'Trading near 52-week lows as of May 9, 2026.',
      'Now a profitable business.',
      'Strong financial position with no major balance sheet concerns.',
      'ARR growth: ~11%.',
      'Dollar-based net retention: ~107%.',
      'Customer expansion in both $100K+ and $1M+ ARR segments.',
      'Strong enterprise use cases in compliance-heavy automation domains.',
      'Buybacks from 2023–2026 add investor confidence.',
    ],
    risks: [
      'Competition risk: software vendors bundling automation into core offerings.',
      'DBNRR declined: 140% (historical highs) → 118% (Q1 2025) → 107% (Q4 FY2026).',
      'Revenue growth slowing from ~11% to ~9%.',
    ],
    allocation: '0.84% (planned max ~1%)',
  },
  {
    ticker: 'KLAR',
    name: 'Klarna',
    tag: 'BNPL & Consumer Fintech',
    summary:
      'Klarna is a leader in the BNPL (Buy Now, Pay Later) segment with strong consumer fintech positioning. A founder-led company with strong growth across both consumers and merchants.',
    bullets: [
      'Trading near 52-week lows as of May 9, 2026.',
      'Founder-led company.',
      'App ranked ~#13 in the App Store — strong engagement signal.',
      'Expanding financial services footprint, including banking initiatives (UK approved, U.S. in progress).',
      'Enterprise value significantly lower than market cap.',
      'Attractive valuation: P/S ratio ~1.53.',
      'Consumer growth: 28% YoY (Q4 2025).',
      'Merchant growth: 42% YoY.',
      'GMV growth: 32% — total GMV ~$38.7B.',
      'Revenue growth: 38%.',
      '4.2M active card users and ~$13B consumer deposits.',
      'Efficient operations with AI-driven headcount optimization.',
    ],
    risks: [
      'Not yet profitable.',
      'Accounting complexity due to forward-looking loss recognition across quarters.',
      'Requires significant capital at this GMV scale.',
      'Naked call position adds upside risk — monitor closely.',
    ],
    allocation: '1.3% current (planned max ~2%)',
  },
  {
    ticker: 'TOST',
    name: 'Toast',
    tag: 'Restaurant POS Platform',
    summary:
      'Toast is a leading restaurant POS (Point of Sale) platform with strong penetration in the hospitality industry. A founder-led company expanding beyond restaurants into grocery and adjacent verticals.',
    bullets: [
      'Trading near 52-week lows as of May 9, 2026.',
      'Founder-led company — App ranked #16 in the App Store.',
      'Revenue growth ~26% YoY.',
      'Location growth ~22% YoY — 171,000 locations.',
      'P/S ratio ~2.36 with attractive forward P/E and PEG.',
      'Profitable business with a strong financial position.',
      'Toast Capital provides lending solutions with innovative repayment directly from daily transaction flows.',
      'AI marketing agent reportedly improves customer revenue by ~8%.',
      'Growth outlook: ~20% range.',
      '~$613M total share repurchases since inception ($400M + $200M additional authorization).',
    ],
    risks: [
      'Competitive restaurant tech market.',
      'Macro sensitivity in hospitality industry.',
    ],
    allocation: 'Planning up to ~1% (with 0.5% buffer for dips)',
  },
  {
    ticker: 'TEAM',
    name: 'Atlassian',
    tag: 'Project Management & Collaboration',
    summary:
      'Atlassian is a leader in project management and collaboration software with strong enterprise adoption. Founder-led, with flagship products Jira and Confluence used across ~85% of Fortune 500 companies.',
    bullets: [
      'Recently rebounded from 52-week lows.',
      'Attractive valuation metrics (forward P/E, PEG, and P/S).',
      '~85% of Fortune 500 use Atlassian tools.',
      'Strong net retention: ~120%.',
      'Revenue growth expected ~20% YoY.',
      'Jira Service Management gaining traction — competing with ServiceNow in ITSM.',
      'AI initiative "Rovo" gaining traction (~75% Fortune 500 usage).',
      'Cloud migration expected to unlock cross-sell and upsell opportunities.',
      'Strong buyback activity: $150M (2023), $395M (2024), $779M (2025).',
    ],
    risks: [
      'Not yet consistently profitable due to acquisitions and high R&D (~50% of revenue).',
      'Data center / regulatory environment complexity for certain enterprise customers.',
    ],
    allocation: '3.91% (down ~20% on core; recurring $5/day until breakeven)',
  },
  {
    ticker: 'UBER',
    name: 'Uber',
    tag: 'Mobility & Delivery Platform',
    summary:
      'Uber is a diversified mobility and delivery platform transitioning into a broader ecosystem company. Strong leadership and execution, trading near 52-week lows.',
    bullets: [
      'Near 52-week lows as of writing.',
      'P/S ratio: ~2.96.',
      'Strong turnaround in free cash flow.',
      'Uber Eats is becoming as large as the rides business.',
      'Expanding into grocery, retail, and hotels (Expedia partnership).',
      'Progress in autonomous vehicle initiatives.',
      'Currently trading like a growth + value hybrid.',
    ],
    risks: ['PEG varies depending on GAAP vs non-GAAP earnings adjustments.'],
    allocation:
      'Planned up to ~4% via recurring investment (currently targeting ~3.5–4%)',
  },
];

const otherConvictions = {
  broaderThesis: {
    title: 'AI Adoption in Traditional Industries',
    body: 'Software currently represents ~10–15% of total addressable market spending. As AI becomes widespread, industries like Manufacturing, Food, Automotive, and Pharma will increasingly adopt AI — often relying on consulting companies due to a lack of in-house AI talent.',
  },
  consulting: [
    {
      ticker: 'ACN',
      name: 'Accenture',
      tag: 'Premium Consulting',
      bullets: [
        'Strong fundamentals.',
        'Forward P/E: 14.79 · PEG: 1.27 · P/S: 1.57',
        'Strong buybacks and dividends (~4% of market cap).',
      ],
    },
    {
      ticker: 'CTSH',
      name: 'Cognizant',
      tag: 'Value Consulting',
      bullets: [
        'Cheaper than Accenture with lower brand premium.',
        'Strong buybacks (~4% of market cap).',
      ],
    },
    {
      ticker: 'INFY',
      name: 'Infosys',
      tag: 'Global IT Services',
      bullets: [
        'Comparable to Accenture in capability.',
        'Slight premium valuation due to brand strength.',
      ],
    },
  ],
  hubspot: {
    title: 'HubSpot',
    bullets: [
      'Recently turned profitable.',
      'Significant gap between GAAP and non-GAAP earnings — analysts primarily use non-GAAP for valuation.',
      'Stock-based compensation is being managed more carefully.',
      'As the GAAP/non-GAAP gap narrows: FCF per share improves, dilution reduces, EV/FCF improves, and valuation strengthens.',
    ],
  },
};

const ConvictionCard = ({ conviction }) => (
  <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8 fade-in-section">
    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            {conviction.ticker}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 font-Ovo">
            {conviction.tag}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white font-Ovo">
          {conviction.name}
        </h3>
      </div>
      {conviction.allocation && (
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-white/40 font-Ovo mb-0.5">
            Allocation
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-white/80 font-Ovo">
            {conviction.allocation}
          </p>
        </div>
      )}
    </div>

    <p className="text-gray-600 dark:text-white/70 leading-relaxed font-Ovo mb-4 text-sm sm:text-base">
      {conviction.summary}
    </p>

    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-2 font-Ovo">
        Key Highlights
      </h4>
      <ul className="space-y-1.5">
        {conviction.bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm text-gray-600 dark:text-white/70 font-Ovo"
          >
            <span className="text-green-500 mt-0.5 flex-shrink-0">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>

    {conviction.risks && conviction.risks.length > 0 && (
      <div>
        <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-2 font-Ovo">
          Key Risks
        </h4>
        <ul className="space-y-1.5">
          {conviction.risks.map((r, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-gray-600 dark:text-white/70 font-Ovo"
            >
              <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const Convictions2026 = ({ isDarkMode }) => {
  const title = 'My 2026 Investment Convictions — Dharma Bandaru';
  const description =
    'Personal investment research notes for 2026: GitLab, UiPath, Klarna, Toast, Atlassian, Uber, and broader AI adoption thesis with consulting exposure via Accenture, Cognizant, and Infosys.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://dharmabandaru.com/investment-thesis/my-2026-convictions"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: 'My 2026 Investment Convictions',
              description,
              author: {
                '@type': 'Person',
                name: 'Dharma Bandaru',
                url: 'https://dharmabandaru.com',
              },
              datePublished: '2026-05-10',
              dateModified: '2026-05-10',
              url: 'https://dharmabandaru.com/investment-thesis/my-2026-convictions',
              keywords:
                'GitLab, UiPath, Klarna, Toast, Atlassian, Uber, investment thesis 2026, SaaS stocks, value investing, stock research',
            }),
          }}
        />
      </Head>

      <section
        className="w-full px-4 sm:px-10 lg:px-[12%] py-10 scroll-mt-20"
        aria-label="2026 Investment Convictions"
      >
        {/* Disclaimer */}
        <div className="mb-10 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 fade-in-section">
          <p className="text-sm text-amber-800 dark:text-amber-300 font-Ovo">
            <strong>Disclosure:</strong> These are my personal investment
            research notes and opinions shared with friends and family. This is
            not financial advice.
          </p>
        </div>

        {/* PDF Download */}
        <div className="mb-10 fade-in-section">
          <a
            href="/Convictions -2026-Edited.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-sm font-Ovo text-gray-700 dark:text-white/70 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Download original research PDF
          </a>
        </div>

        {/* Core Convictions */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-Ovo text-gray-800 dark:text-white mb-2 fade-in-section">
            2026 Convictions
          </h2>
          <p className="text-gray-500 dark:text-white/50 font-Ovo mb-8 fade-in-section">
            Most of these positions are near 52-week lows as of May 2026.
            Research compiled from earnings calls, investor presentations, and
            podcasts.
          </p>
          <div className="space-y-6">
            {convictions.map((c) => (
              <ConvictionCard key={c.ticker} conviction={c} />
            ))}
          </div>
        </div>

        {/* Broader Thesis */}
        <div className="mb-12 fade-in-section">
          <h2 className="text-2xl sm:text-3xl font-Ovo text-gray-800 dark:text-white mb-6">
            Other Convictions (Broader Thesis)
          </h2>

          {/* AI Adoption Thesis */}
          <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Ovo mb-3">
              {otherConvictions.broaderThesis.title}
            </h3>
            <p className="text-gray-600 dark:text-white/70 font-Ovo leading-relaxed text-sm sm:text-base mb-4">
              {otherConvictions.broaderThesis.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {['Manufacturing', 'Food', 'Automotive', 'Pharma'].map(
                (industry) => (
                  <span
                    key={industry}
                    className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-Ovo"
                  >
                    {industry}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Consulting Exposure */}
          <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Ovo mb-4">
              Consulting Exposure
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherConvictions.consulting.map((c) => (
                <div
                  key={c.ticker}
                  className="bg-gray-50 dark:bg-white/5 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {c.ticker}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-white font-Ovo text-sm mb-1">
                    {c.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-Ovo mb-2">
                    {c.tag}
                  </p>
                  <ul className="space-y-1">
                    {c.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-1.5 text-xs text-gray-600 dark:text-white/60 font-Ovo"
                      >
                        <span className="text-green-500 flex-shrink-0">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* HubSpot */}
          <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Ovo mb-3">
              {otherConvictions.hubspot.title}
            </h3>
            <ul className="space-y-1.5">
              {otherConvictions.hubspot.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-gray-600 dark:text-white/70 font-Ovo"
                >
                  <span className="text-green-500 mt-0.5 flex-shrink-0">›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portfolio Allocation Summary */}
        <div className="border border-gray-200 dark:border-white/10 rounded-xl p-6 sm:p-8 fade-in-section">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white font-Ovo mb-4">
            Portfolio Allocation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-Ovo">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left py-2 pr-4 text-gray-500 dark:text-white/40 font-normal">
                    Position
                  </th>
                  <th className="text-left py-2 pr-4 text-gray-500 dark:text-white/40 font-normal">
                    Ticker
                  </th>
                  <th className="text-left py-2 text-gray-500 dark:text-white/40 font-normal">
                    Current / Planned
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {[
                  {
                    name: 'GitLab',
                    ticker: 'GTLB',
                    alloc: '1.75% (max ~2.25%)',
                  },
                  { name: 'UiPath', ticker: 'PATH', alloc: '0.84% (max ~1%)' },
                  {
                    name: 'Klarna',
                    ticker: 'KLAR',
                    alloc: '1.3% (max ~2%) — naked call',
                  },
                  {
                    name: 'Atlassian',
                    ticker: 'TEAM',
                    alloc: '3.91% (recurring $5/day)',
                  },
                  { name: 'Toast', ticker: 'TOST', alloc: 'Planning ~1%' },
                  { name: 'Uber', ticker: 'UBER', alloc: 'Planned ~4%' },
                ].map((row) => (
                  <tr key={row.ticker}>
                    <td className="py-2 pr-4 text-gray-700 dark:text-white/80">
                      {row.name}
                    </td>
                    <td className="py-2 pr-4">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60">
                        {row.ticker}
                      </span>
                    </td>
                    <td className="py-2 text-gray-600 dark:text-white/70">
                      {row.alloc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Convictions2026;
