// src/pages/Blog.tsx
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'

export const BLOG_POSTS = [
  {
    slug: 'true-hourly-rate',
    title: "Why Your $75/Hour Rate Is Actually Paying You $31/Hour",
    excerpt: "The math most freelancers never do — and why it explains the gap between your quoted rate and your bank account. Non-billable time, tax gross-ups, and platform fees all compound against you.",
    date: '2026-04-01', readTime: '6 min', category: 'Pricing',
    calcSlug: 'fl-true-hourly-rate',
    content: `
Most freelancers set their rate by looking at what similar freelancers charge, picking a number that feels ambitious but not greedy, and going with it. The problem is that this approach has nothing to do with what you actually need to earn to sustain yourself.

**The three gaps that eat your rate**

The first is non-billable time. Industry research consistently shows that freelancers spend 35–45% of their working hours on activities that don't generate income: responding to emails, sending proposals, invoicing, managing contracts, attending networking events, doing professional development, and handling the dozen other administrative tasks that running a business requires. If you work 40 hours a week but only 24 of those are billable, your effective capacity is 60% of what you think it is.

The second is the tax gross-up. As a freelancer in the US, you pay self-employment tax (15.3% on top of income tax). If you want to take home $75,000 after tax at a 28% effective rate, you don't need to earn $75,000. You need to earn significantly more than that before taxes, SE tax, and deductions. Most freelancers quote a rate that would cover their take-home target if they paid zero taxes — which is never true.

The third is platform fees. If you're on Upwork, you're paying 20% on your first $500 with each client, then 10% up to $10,000, then 5%. Fiverr takes 20% flat. These fees compound against your hourly in a way that's easy to underestimate.

**The correct calculation**

Your minimum viable rate = (Annual income target + Annual business expenses) ÷ (1 - Tax rate) ÷ (1 - Platform fee %) ÷ Annual billable hours

Work through that honestly with your actual numbers. Most people find their rate needs to be 40–60% higher than their current number to actually deliver their target income.

The [True Hourly Rate Calculator](/calculators/fl-true-hourly-rate) does this automatically. Enter your target income, your billable percentage, your tax rate, and your platform fee. The output is the rate below which you cannot hit your goal — and the recommended rate that includes a buffer for slow months.

**What to do with this number**

The minimum viable rate is your floor for every negotiation. It is not your starting price. Your starting price should be the recommended rate (minimum + 25% buffer) or higher. The minimum exists to tell you when to walk away.

If your current clients won't pay the minimum viable rate you calculate, you are either targeting the wrong clients, working in a market that can't support sustainable rates, or underrepresenting your value in your positioning. All three are fixable — but you can't fix what you haven't calculated.

Also from Valcr: the e-commerce version of this problem is just as real. Store owners often confuse revenue with profit. [Valcr's 20 e-commerce calculators](https://valcr.site/calculators) solve that.
    `
  },
  {
    slug: 'project-profit',
    title: "How to Know If a Project Is Worth Taking Before You Agree to It",
    excerpt: "Fixed-price projects are where freelance margin goes to die. Here's the full calculation: core hours, admin, revision rounds, platform fees, and what you actually net.",
    date: '2026-03-25', readTime: '5 min', category: 'Pricing',
    calcSlug: 'fl-project-profit',
    content: `
The most common financial mistake in freelancing is taking on a project that looks profitable at the surface level and discovering mid-project that the effective hourly rate is $18.

**Why fixed-price projects compress margin**

When you quote a project at $2,500 for an estimated 20 hours, you're implicitly promising a $125/hour effective rate. But that estimate almost never accounts for:

**Admin and communication hours.** A client who needs daily status updates, attends long discovery calls, and sends streams of emails is consuming hours that aren't in your core estimate. 3–5 admin hours on a 20-hour project are common.

**Revision rounds.** Two revision rounds at 2 hours each add 4 hours to your project total. Your effective rate just dropped from $125 to $104. Three rounds and you're at $91.

**Platform fees.** At 20% (Fiverr) or 10–20% (Upwork), the platform takes $250–$500 off the top before you see a dollar of that $2,500.

**The compound effect.** Add admin hours, revision rounds, and platform fees to a 20-hour estimate and a $2,500 project often becomes $1,400–$1,700 net across 27–30 real hours. That's roughly $50/hour — and that's before you account for your own time cost.

**How to protect yourself**

Use the [Project Profitability Calculator](/calculators/fl-project-profit) before you quote every fixed-price project. Enter the fee, the core hours, expected admin time, revision rounds, and platform fee. The output gives you the project margin and the effective hourly rate.

If the effective hourly rate is below your minimum viable rate, you have three options: increase the quoted fee, reduce the included scope, or decline the project.

Build revision limits into your contracts. "Two rounds of revisions included; additional rounds billed at $X/hour" protects your margin and sets professional expectations. Most serious clients respect clear terms.

Quote admin time explicitly in your estimates. If you expect 4 hours of meetings and emails, include them in your time estimate. Don't absorb them silently.
    `
  },
  {
    slug: 'tax-reserve',
    title: "The Exact Percentage to Set Aside from Every Freelance Payment",
    excerpt: "Self-employment tax, federal income tax, state tax, and quarterly payments explained simply. The formula is straightforward — the math just has to be done.",
    date: '2026-03-18', readTime: '7 min', category: 'Tax',
    calcSlug: 'fl-tax-reserve',
    content: `
The most common freelancer financial crisis isn't about income — it's about taxes. A freelancer who has been running for a year, has healthy revenue, and has never set aside for taxes suddenly faces a bill that wipes out six months of savings.

This happens because freelancers don't have an employer automatically withholding 25–35% of every paycheck. That responsibility falls entirely on you. And most new freelancers don't know how much to set aside.

**The three layers of US freelance tax**

Layer one: Self-employment tax (SE tax). This is 15.3% of your net self-employment income (12.4% Social Security + 2.9% Medicare). As an employee, your employer pays half of this. As a freelancer, you pay both halves. However, you can deduct half of SE tax from your taxable income, which partially offsets the burden.

Layer two: Federal income tax. This is calculated on your taxable income (gross income minus business expenses minus retirement contributions minus the SE tax deduction minus your standard deduction). Tax rates are progressive — 10% to 37% depending on your income level.

Layer three: State and local tax. This ranges from 0% (Florida, Texas, Washington, Nevada) to over 13% (California). If you're in a no-income-tax state, this layer disappears entirely.

**The quarterly payment requirement**

If you expect to owe more than $1,000 in federal taxes for the year, the IRS requires quarterly estimated payments. Deadlines are April 15, June 15, September 15, and January 15. Underpaying triggers a penalty (currently around 8% annualized on the underpaid amount) even if you pay the full amount at tax time.

**The practical formula**

Most US freelancers should reserve 25–35% of every payment, depending on their state tax rate and income level. The [Tax Reserve Calculator](/calculators/fl-tax-reserve) gives you the precise number for your situation — including the quarterly payment amount you should be setting aside.

The moment you receive any freelance payment, move the calculated reserve percentage into a separate account. Don't touch it. The discipline of treating this as money that was never yours is the single habit that prevents the tax crisis.
    `
  },
  {
    slug: 'rate-increase',
    title: "How to Calculate and Justify Your Next Rate Increase",
    excerpt: "A formula for determining the right new rate based on inflation, skill growth, and market demand — and the exact language to use when you tell your clients.",
    date: '2026-03-12', readTime: '5 min', category: 'Pricing',
    calcSlug: 'fl-rate-increase',
    content: `
Freelancers systematically underraise their rates. The average freelancer goes 2–3 years between increases despite inflation, skill growth, and increased market demand. By the time they raise their rates, they're often overdue by 30–40%.

**Why freelancers don't raise rates**

Fear of losing clients is the primary reason. The logic goes: "If I raise my rates, clients might leave." This is partially true — some clients will leave. But the clients who leave because of a reasonable rate increase were almost always the lowest-value, most difficult clients. The clients who value your work absorb reasonable increases.

The second reason is not knowing what a defensible increase looks like. A random 20% increase feels arbitrary. An increase grounded in inflation, skill development, and market rates feels professional.

**The components of a justified increase**

Inflation adjustment: If inflation ran at 3.5% annually and you haven't raised rates in 2 years, you need a 7.1% increase just to maintain purchasing power. This component alone means annual rate reviews are necessary.

Skill premium: Every year you work, you're faster, better, and more valuable. A new skill, certification, or area of expertise justifies an additional premium. Quantify this honestly — 5–15% is typical for meaningful skill growth.

Market demand adjustment: If demand for your specialty has grown — AI-adjacent skills, specialized compliance areas, emerging technical domains — that supports an additional positive adjustment. If your niche is saturated, a smaller increase is appropriate.

**The [Rate Increase Calculator](/calculators/fl-rate-increase)** takes all three components and outputs the justified new rate, the increase percentage, and the annual revenue impact at 1,000 billable hours.

**How to communicate a rate increase**

Send notice 30–60 days before the effective date. Email is appropriate for most clients; a brief call is better for your highest-value relationships.

The message: "My rates are increasing from $X to $Y effective [date]. This reflects inflation and my continued skill development over the past [timeframe]. I look forward to continuing our work together." No extensive justification. No apology. Just professional notice.

Most clients say nothing and continue. Some negotiate. A few leave — and those are almost always the clients who were undervaluing you anyway.
    `
  },
  {
    slug: 'client-profitability',
    title: "The Client Profitability Score: How to Know Who to Fire",
    excerpt: "Not all clients are equally profitable. Admin time, revision culture, payment delays, and stress all erode your effective hourly rate below what the invoice suggests.",
    date: '2026-03-05', readTime: '6 min', category: 'Business',
    calcSlug: 'fl-client-profit',
    content: `
Your highest-revenue client is almost certainly not your most profitable client. The two are often inversely correlated. The clients who pay the most tend to have the longest invoicing cycles and the highest demand on your time outside of billable hours.

**The hidden costs of client relationships**

When you calculate what a client actually pays you, the invoice amount is the starting point — not the ending point. You need to subtract:

**Admin and communication time.** A client who requires weekly status calls, sends 20-email threads per project, and involves multiple stakeholders in every decision is consuming unbilled hours. If you spend 5 hours a month on admin for a client paying $3,000, you're not making $3,000 that month. You're making $3,000 for 20 (billable) + 5 (admin) = 25 hours. That's $120/hour, not $150/hour.

**Unpaid revision hours.** Some clients treat "revisions" as unlimited. If you spend 4 additional hours on revisions for a fixed-fee project, those hours come directly off your effective rate.

**Payment delay cost.** A client who pays 60 days late is holding your money for two months interest-free. At scale, this creates meaningful cash flow drag. The calculator applies a cost-of-capital penalty for payment delays exceeding your terms.

**Stress premium.** A demanding, unpredictable, or disrespectful client consumes not just hours but mental energy. The calculator applies a multiplier based on stress level — reducing the profitability score for clients who create disproportionate friction.

**The [Client Profitability Analyzer](/calculators/fl-client-profit)** synthesizes all of these into a score from 0–100. Above 80 means keep and nurture. 60–80 means renegotiate terms. Below 60 means the relationship is costing you more than it should. Below 40 means you should actively plan to offboard.

**How to offboard a bad client**

Give 30 days notice. Explain you're moving toward different types of work. Offer to help them find a replacement. Don't burn bridges — the freelance world is smaller than it appears. But do get out. Life is too short to fill your calendar with clients who drain you.
    `
  },
  {
    slug: 'freelance-vs-employment',
    title: "The True Financial Comparison Between Freelancing and a Salaried Job",
    excerpt: "Benefits are worth more than most people calculate. A $120K freelance income and an $85K salary offer might be closer than you think — once you account for health insurance, retirement, and paid leave.",
    date: '2026-02-28', readTime: '7 min', category: 'Business',
    calcSlug: 'fl-freelance-vs-employment',
    content: `
The comparison between freelancing and employment is almost always done wrong. People compare the freelance gross to the employment salary, see a gap (usually in freelancing's favor), and feel confident. But gross freelance revenue is not comparable to employment salary.

**What employment actually provides**

Health insurance is the most undervalued component. Employer-sponsored family health coverage averages $7,000–$12,000 per year in employer contributions. Solo freelancers who buy their own coverage through the marketplace pay this entirely out of pocket — or go uninsured, which is a different kind of financial risk.

Retirement matching is a direct pay increase that most employees undervalue. A 4% match on an $85,000 salary is $3,400 per year in free money. Freelancers can contribute to Solo 401(k)s and SEP-IRAs, but there's no matching — every dollar is self-funded.

Paid leave is essentially deferred income. 20 days of paid vacation and sick leave on an $85,000 salary is worth $6,538 (assuming 260 working days). Freelancers who take 20 unpaid days lose income. The ones who never take time off burn out.

**The tax differential**

Employment income is taxed at lower effective rates than freelance income because employees don't pay the employer half of payroll taxes. At similar gross income levels, a W-2 employee typically faces a 5–8% lower effective tax rate than a freelancer. That gap is real money.

**Running the [Freelance vs Employment Calculator](/calculators/fl-freelance-vs-employment)**

The calculator accounts for all of these factors. It returns the freelance net income, the employment total compensation (salary plus benefits after tax), the advantage or gap, and the break-even freelance revenue — the gross amount a freelancer would need to earn to match the employment offer after all costs.

Most people are surprised to find the break-even is significantly higher than the employment salary. That's not an argument against freelancing — autonomy, variety, and control have real value. But the financial comparison should be honest.

Also worth knowing: Valcr's benchmark data will eventually show what freelancers in your skill category actually net after all costs. That data will ground this comparison in reality rather than estimates.
    `
  },
  {
    slug: 'proposal-pricing',
    title: "Three Prices for Every Project: Minimum, Recommended, and Premium",
    excerpt: "The psychological and financial case for generating three price points before every proposal — and when to use each one.",
    date: '2026-02-20', readTime: '5 min', category: 'Pricing',
    calcSlug: 'fl-proposal-pricing',
    content: `
Most freelancers quote one price for every project and then negotiate down from there. This creates a positioning problem: your first number becomes a ceiling the client is trying to push through, and any discount feels like a loss.

A better approach is generating three distinct price points that represent different scopes and value framings. This reframes the conversation from "how low will you go" to "which option fits what you're trying to accomplish."

**The minimum price**

This is the floor below which you cannot profitably deliver the work. It accounts for your true hourly cost, the estimated hours (including admin and revisions), project-specific expenses, and platform fees. Delivering below this number means you're paying to work on the project — losing money on every hour you put in.

The minimum price is never your opening ask. It's your walk-away number. If negotiations push you here, you either find scope to reduce or decline the project.

**The recommended price**

This is the minimum multiplied by approximately 1.35 — covering your cost basis with a healthy margin and a small risk buffer for scope uncertainty. This is your standard quote for straightforward projects with clients who know what they want.

The recommended price should feel comfortable for both parties. It's not value-based pricing — it's cost-plus with a fair margin.

**The premium price**

This is where value-based pricing enters. A landing page that converts 25% of visitors is worth dramatically more to a client than the hours it took to build. A brand redesign that repositions a company in its market creates value that transcends the design work itself.

The premium price applies your client value multiplier — a number reflecting the relationship between what the work costs you to produce and what it's worth to the client. For high-value work, 2x–3x your cost basis is defensible.

**The [Proposal Pricing Calculator](/calculators/fl-proposal-pricing)** generates all three numbers from your inputs. Use the minimum as your floor, the recommended as your standard quote, and the premium as your opening ask when the project has high strategic value to the client.

**When to quote which**

Quote recommended: new clients, clear scope, familiar work.
Quote premium: strategic projects, enterprise clients, work where the value exceeds the hours.
Quote minimum: only in your head, as your negotiation floor.
    `
  },
  {
    slug: 'income-planning',
    title: "How Many Clients Do You Actually Need? The Math of Freelance Income Planning",
    excerpt: "Working backward from an annual revenue target to active projects, proposals, and pipeline. Most freelancers have no idea what their numbers require.",
    date: '2026-02-12', readTime: '6 min', category: 'Business',
    calcSlug: 'fl-annual-income-planning',
    content: `
Most freelancers set a revenue goal and then work hoping to reach it. The ones who consistently hit their goals work the math backward — from the annual target to the monthly requirement to the active projects needed to the proposals required to the pipeline value to maintain.

**Working backward from a $100,000 goal**

Monthly requirement: $100,000 ÷ 12 = $8,333/month.

If your average project is worth $3,000 and you have no retainer income, you need roughly 2.8 projects per month to hit this. Round up to 3.

If those projects average 3 weeks each, you're running 2–3 projects simultaneously at any given time.

Your proposal win rate determines how many proposals you need to send. At 25%, you need to send 12 proposals to win 3. That's 3 per week — a significant business development commitment.

Your pipeline should hold 4x your monthly target (at 25% win rate) at all times: $33,333 in active proposals to close $8,333.

**The retainer adjustment**

If 30% of your revenue comes from retainers, the math changes. You only need project revenue to cover 70% of your monthly target. That reduces your required project count, proposal volume, and pipeline significantly. Retainers compound: each one reduces your business development burden by its monthly value.

**The [Annual Income Planning Calculator](/calculators/fl-annual-income-planning)** runs all of this from your target and inputs. The output includes monthly revenue needed, simultaneous projects required, proposals to send monthly, pipeline value to maintain, and retainer clients needed.

Most freelancers are surprised by the proposal volume required. If you're not sending enough proposals to support your target at your win rate, you're not going to hit the target — regardless of quality.

**The fastest improvement lever**

Increasing your average project value has the biggest impact on all downstream numbers. Doubling your average from $1,500 to $3,000 cuts required projects in half, which cuts required proposals in half, which cuts pipeline requirements in half. Niching down, repositioning for higher-value clients, and raising rates all work through this mechanism.
    `
  },
  {
    slug: 'retainer-vs-project',
    title: "Retainer vs Project: Which Freelance Model Builds Better Income?",
    excerpt: "Income stability, effective hourly rates, and the true cost of constant project acquisition — a direct comparison of the two freelance business models.",
    date: '2026-02-05', readTime: '5 min', category: 'Business',
    calcSlug: 'fl-retainer-vs-project',
    content: `
The debate between retainer-based and project-based freelancing is usually framed as a personal preference question. It shouldn't be. It's a financial math question with a clear framework for deciding which model fits your situation.

**The case for retainers**

Retainers provide predictable income. If you have four clients each paying $2,000/month, you start every month knowing you have $8,000 coming in. That predictability reduces the emotional and financial cost of the feast-or-famine cycle that project-based work creates.

Retainers also reduce business development overhead. Finding a new project client requires proposals, pitches, negotiations, and onboarding — all of which consume unbilled hours. A retained client renews implicitly. The hours you'd spend acquiring a new project client can instead go to serving existing clients or to your own development.

**The case for projects**

Projects typically yield higher effective hourly rates. When you quote a project, you can price based on scope and value — the ceiling is what the work is worth to the client. Retainers are often priced based on a monthly hour estimate, which more closely resembles hourly billing.

Projects also provide variety. Some freelancers find that working with the same clients on ongoing work leads to stagnation. Rotating projects bring new challenges, new skills, and new portfolio pieces.

**The math**

The [Retainer vs Project Calculator](/calculators/fl-retainer-vs-project) compares the monthly revenue and effective hourly rates of each model based on your specific situation. It also outputs an income stability score — the percentage of your revenue that's predictable at the start of each month.

The optimal mix for most established freelancers is 40–60% retainer revenue (providing a stable floor) plus project work (providing upside and variety). Pure project-based work creates income volatility that's exhausting to manage. Pure retainer work can feel like employment without the benefits.

**Converting project clients to retainers**

The best time to propose a retainer is immediately after a successful project, when the client's satisfaction is highest and the working relationship is established. Frame it around their benefit: "Rather than managing ad-hoc projects, would it make sense to set up a monthly retainer so you have guaranteed access to my time for [specific use case]?"

Most clients respond well to the predictability this offers them too.
    `
  },
  {
    slug: 'platform-fees',
    title: "What Upwork and Fiverr Actually Take — The Real Platform Fee Calculation",
    excerpt: "Platform fees aren't as simple as the headline rate. Upwork's tiered model, Fiverr's flat 20%, Toptal's spread — and what you actually need to charge to net your target.",
    date: '2026-01-28', readTime: '5 min', category: 'Platforms',
    calcSlug: 'fl-platform-fee-impact',
    content: `
Platform fees are one of the most misunderstood costs in freelancing. The headline rate (20% on Upwork, 20% on Fiverr) understates the actual impact on your income — and the calculation for what you need to charge to hit a target net rate is less intuitive than it looks.

**Upwork's tiered fee structure**

Upwork charges 20% on your first $500 with any given client. Once your lifetime billings with that client exceed $500, the rate drops to 10% up to $10,000. Above $10,000, it drops to 5%.

This means the effective fee rate for a new client relationship is 20% — but for a long-term client you've billed $15,000 to date, it's closer to 8%. The actual blended rate depends entirely on your client mix and relationship lengths.

**The gross rate calculation**

If you want to net $60/hour after fees, you don't simply add 20% to get to $72. That math is wrong.

The correct formula: Net rate ÷ (1 - fee rate) = Gross rate needed.
$60 ÷ (1 - 0.20) = $60 ÷ 0.80 = $75/hour.

The difference between adding 20% ($72) and dividing by 0.80 ($75) is $3/hour — which compounds to $3,000 per year at 1,000 billable hours. Many freelancers systematically underquote because they add the fee percentage rather than grossing up correctly.

**The [Platform Fee Impact Calculator](/calculators/fl-platform-fee-impact)** handles the Upwork tiered structure, Fiverr's flat 20%, Toptal's model, and custom rates. Enter your target net rate and your client relationship history. It outputs the gross rate you need to charge, the monthly fee cost, and the annual cost of the platform relationship.

**When to consider going direct**

After Upwork's 24-month no-hire-outside-platform window closes, you can legally contract with clients directly. At that point, the math becomes simple: every year you continue through Upwork, you pay the platform for introductions they made years ago. For a $5,000/month client at 10% Upwork fee, that's $6,000/year to continue using a platform for a relationship that's already established.

Most freelancers who transition established clients to direct work see immediate effective rate increases of 10–20% without changing their quoted price. The fee savings go directly to their margin.

Also from Valcr: [valcr.site](https://valcr.site) has equivalent fee calculators for Shopify, Etsy, Amazon FBA, and other e-commerce platforms — the same problem exists in e-commerce operator finance.
    `
  },
]

export function BlogPage() {
  return (
    <>
      <SEOHead
        title="Freelance Finance Blog — Valcr Freelance"
        description="Practical financial guides for freelancers. Pricing, tax, client management, and how to build a sustainable independent business."
        canonicalPath="/blog"
      />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="section-tag mb-4 inline-flex">Blog</span>
            <h1 className="font-display font-bold text-4xl text-ink-50 mb-3">Freelance finance, clearly explained.</h1>
            <p className="text-ink-400">Practical guides for independent operators who want real numbers.</p>
          </div>
          <div className="space-y-4">
            {BLOG_POSTS.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`}
                className="card p-6 hover:border-acid/30 hover:bg-acid/5 transition-all group block">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-acid bg-acid/10 px-2 py-0.5 rounded">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-ink-600">
                    <Clock className="w-3 h-3"/>{post.readTime}
                  </span>
                  <span className="text-xs text-ink-600">{post.date}</span>
                </div>
                <h2 className="font-display font-bold text-ink-50 text-lg mb-2 group-hover:text-acid transition-colors">{post.title}</h2>
                <p className="text-ink-400 text-sm mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-acid">Read article <ArrowRight className="w-3 h-3"/></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
