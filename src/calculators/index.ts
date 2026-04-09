export interface FreelanceField {
  key: string; label: string; description?: string
  type: 'currency'|'percent'|'number'|'select'
  default: number|string; min?: number; max?: number; step?: number
  prefix?: string; suffix?: string
  options?: {value:string;label:string}[]
}
export interface FreelanceOutput {
  key: string; label: string
  type: 'currency'|'percent'|'number'|'hours'|'multiplier'
  highlight?: boolean; description?: string
}
export interface FreelanceCalculator {
  slug: string; name: string; shortName: string; tagline: string
  description: string; icon: string; color: string
  seoTitle: string; seoDescription: string; seoKeywords: string[]
  fields: FreelanceField[]; outputs: FreelanceOutput[]
  faqs: {q:string;a:string}[]; relatedSlugs: string[]
  blogSlug?: string
}

export const FREELANCE_CALCULATORS: FreelanceCalculator[] = [
  {
    slug:'fl-true-hourly-rate', name:'True Hourly Rate Calculator',
    shortName:'True Hourly Rate', icon:'⏱️', color:'#C8FF57',
    tagline:'What you actually need to charge to hit your income goal.',
    description:'Calculate your minimum viable hourly rate accounting for non-billable time, taxes, platform fees, and business costs. Stop undercharging.',
    seoTitle:'Freelance Hourly Rate Calculator — What Should I Charge? | Valcr Freelance',
    seoDescription:'Free freelance hourly rate calculator. Accounts for non-billable hours, taxes, platform fees, and expenses. Find your true minimum rate in 30 seconds.',
    seoKeywords:['freelance hourly rate calculator','what should i charge as a freelancer','freelance rate calculator'],
    blogSlug:'true-hourly-rate',
    fields:[
      {key:'annual_income_target',label:'Annual Income Target (after tax)',type:'currency',prefix:'$',default:60000,min:0},
      {key:'weeks_work_per_year',label:'Weeks Worked Per Year',type:'number',default:48,min:1,max:52},
      {key:'hours_per_week',label:'Hours Available Per Week',type:'number',suffix:'h',default:40,min:1,max:80},
      {key:'billable_pct',label:'Billable Time %',type:'percent',suffix:'%',default:60,min:10,max:100,description:'Typically 55–65%. The rest is admin, marketing, and unpaid prep.'},
      {key:'tax_rate',label:'Effective Tax Rate',type:'percent',suffix:'%',default:28,min:0,max:60},
      {key:'platform_fee',label:'Platform Fee %',type:'percent',suffix:'%',default:10,min:0,max:30,description:'Upwork: 10–20%. Fiverr: 20%. Direct clients: 0%.'},
      {key:'monthly_expenses',label:'Monthly Business Expenses',type:'currency',prefix:'$',default:300,min:0,description:'Software, equipment, insurance, coworking, etc.'},
    ],
    outputs:[
      {key:'minimum_rate',label:'Minimum Viable Rate',type:'currency',highlight:true,description:'Below this you cannot hit your income target'},
      {key:'recommended_rate',label:'Recommended Rate',type:'currency',highlight:true,description:'Minimum + 25% buffer for slow months'},
      {key:'annual_billable_hours',label:'Annual Billable Hours',type:'hours'},
      {key:'effective_hourly_net',label:'Net Per Billable Hour',type:'currency',description:'What you keep after tax and fees'},
    ],
    faqs:[
      {q:'Why is my minimum rate so much higher than I expected?',a:'Most freelancers forget two things: non-billable time and the tax gross-up. If you only bill 60% of your available hours and you\'re in a 28% tax bracket, you need to earn significantly more per billable hour to take home your target. This calculator does that math explicitly.'},
      {q:'What counts as non-billable time?',a:'Administrative work (invoicing, contracts, email), business development (proposals, networking, marketing), professional development (courses, reading), and unpaid revision rounds that exceed scope. Most freelancers spend 35–45% of their time on non-billable activities.'},
      {q:'How do I account for Upwork fees?',a:'Upwork charges 10% on earnings over $10,000 with a single client, 20% below that. Use 15% as a blended estimate if you\'re new. This directly increases the rate you need to charge.'},
      {q:'What is the recommended rate buffer for?',a:'Freelance income is irregular. Some months you are fully booked; others you have two weeks with no billable work. A 25% buffer above your minimum covers those gaps without requiring you to dip into savings.'},
    ],
    relatedSlugs:['fl-project-profit','fl-tax-reserve','fl-rate-increase'],
  },
  {
    slug:'fl-project-profit', name:'Project Profitability Calculator',
    shortName:'Project Profit', icon:'📋', color:'#57C8FF',
    tagline:'Is this project actually worth taking?',
    description:'Calculate the true profit on any project after all time costs, expenses, revisions, and platform fees. Know before you commit.',
    seoTitle:'Freelance Project Profitability Calculator | Valcr Freelance',
    seoDescription:'Calculate true project profit including all hours, revisions, admin time, platform fees, and expenses. Know if a freelance project is worth taking.',
    seoKeywords:['freelance project profitability calculator','is this project worth taking freelance','project profit margin calculator'],
    blogSlug:'project-profit',
    fields:[
      {key:'project_fee',label:'Project Fee (quoted to client)',type:'currency',prefix:'$',default:2500,min:0},
      {key:'estimated_hours',label:'Estimated Core Work Hours',type:'number',suffix:'h',default:20,min:0.5},
      {key:'admin_hours',label:'Admin & Communication Hours',type:'number',suffix:'h',default:3,min:0,description:'Briefings, emails, calls, revisions not in scope.'},
      {key:'your_hourly_cost',label:'Your True Hourly Cost',type:'currency',prefix:'$',default:50,min:0,description:'Your minimum rate from the Hourly Rate calculator.'},
      {key:'project_expenses',label:'Project-Specific Expenses',type:'currency',prefix:'$',default:100,min:0,description:'Stock images, fonts, tools, subcontractors, etc.'},
      {key:'platform_fee',label:'Platform Fee %',type:'percent',suffix:'%',default:10,min:0,max:30},
      {key:'revision_rounds',label:'Expected Revision Rounds',type:'number',default:2,min:0,max:10},
      {key:'hours_per_revision',label:'Hours Per Revision Round',type:'number',suffix:'h',default:1.5,min:0},
    ],
    outputs:[
      {key:'project_profit',label:'Project Profit',type:'currency',highlight:true},
      {key:'profit_margin',label:'Project Margin',type:'percent',highlight:true},
      {key:'effective_hourly',label:'Effective Hourly Rate',type:'currency'},
      {key:'total_hours',label:'Total Hours (all in)',type:'hours'},
    ],
    faqs:[
      {q:'Why include revision rounds in the calculation?',a:'Unlimited revisions are the most common source of project scope creep. A project quoted at $2,500 for 20 hours becomes $1,800 profit after two unexpected revision rounds. Always price in a revision buffer.'},
      {q:'What should my project margin be?',a:'A healthy project margin for freelancers is 40–60%. Below 30% and you are essentially working for minimum wage after overheads. Above 70% is excellent but rare on fixed-fee projects.'},
      {q:'Should I include admin hours in my quote?',a:'Always. Admin time is real work. If you spend 3 hours on emails and briefings for a 20-hour project, your actual capacity for that client is 23 hours. Quote accordingly.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-client-profit','fl-proposal-pricing'],
  },
  {
    slug:'fl-tax-reserve', name:'Freelance Tax Reserve Calculator',
    shortName:'Tax Reserve', icon:'🧾', color:'#FF6B57',
    tagline:'Never be caught short at tax time again.',
    description:'Calculate exactly how much to set aside from every payment for taxes, including US self-employment tax, federal income tax, and quarterly estimates.',
    seoTitle:'Freelance Tax Reserve Calculator — How Much to Set Aside | Valcr Freelance',
    seoDescription:'Free freelance tax calculator. Find out exactly what percentage of every payment to reserve for taxes. US self-employment tax, income tax, and quarterly estimates.',
    seoKeywords:['freelance tax calculator','how much to set aside for taxes freelancer','self employment tax calculator','freelance quarterly tax estimate'],
    blogSlug:'tax-reserve',
    fields:[
      {key:'annual_gross_income',label:'Expected Annual Gross Income',type:'currency',prefix:'$',default:80000,min:0},
      {key:'filing_status',label:'Filing Status',type:'select',default:'single',options:[{value:'single',label:'Single'},{value:'married',label:'Married filing jointly'},{value:'hoh',label:'Head of household'}]},
      {key:'state_tax_rate',label:'State / Local Tax Rate',type:'percent',suffix:'%',default:5,min:0,max:15,description:'No state income tax: FL, TX, WA, NV, WY, SD, TN, AK, NH.'},
      {key:'deductible_expenses',label:'Annual Deductible Business Expenses',type:'currency',prefix:'$',default:5000,min:0,description:'Home office, equipment, software, professional development.'},
      {key:'retirement_contribution',label:'Annual Retirement Contribution',type:'currency',prefix:'$',default:3000,min:0,description:'Solo 401k, SEP-IRA. Reduces taxable income.'},
    ],
    outputs:[
      {key:'reserve_pct',label:'Reserve Percentage',type:'percent',highlight:true,description:'Set aside this % of every payment'},
      {key:'monthly_reserve',label:'Monthly Reserve Amount',type:'currency',highlight:true},
      {key:'quarterly_payment',label:'Quarterly Estimated Payment',type:'currency'},
      {key:'self_employment_tax',label:'Annual Self-Employment Tax',type:'currency'},
      {key:'effective_tax_rate',label:'Effective Total Tax Rate',type:'percent'},
    ],
    faqs:[
      {q:'What is self-employment tax?',a:'Self-employment tax is 15.3% on your net self-employment income (12.4% Social Security + 2.9% Medicare). As a freelancer you pay both the employee and employer portions. You can deduct half of SE tax when calculating your income tax, which this calculator accounts for.'},
      {q:'When are quarterly estimated tax payments due?',a:'For US freelancers: April 15, June 15, September 15, and January 15 of the following year. Underpaying by more than $1,000 triggers an underpayment penalty from the IRS.'},
      {q:'What business expenses can I deduct?',a:'Home office (proportional), internet, phone (business portion), software subscriptions, equipment, professional development courses, professional memberships, health insurance premiums, and 50% of business meals.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-annual-income-planning','fl-freelance-vs-employment'],
  },
  {
    slug:'fl-rate-increase', name:'Rate Increase Calculator',
    shortName:'Rate Increase', icon:'📈', color:'#C8FF57',
    tagline:'The number you can justify — and how to say it.',
    description:'Calculate a defensible new rate based on inflation, cost-of-living change, skill improvement, and time since your last increase.',
    seoTitle:'Freelance Rate Increase Calculator — What to Charge Next Year | Valcr Freelance',
    seoDescription:'Calculate your justified rate increase as a freelancer. Factor in inflation, skill growth, and years since last raise. Get the number with confidence.',
    seoKeywords:['freelance rate increase calculator','how much to raise freelance rates','freelancer raise rates'],
    blogSlug:'rate-increase',
    fields:[
      {key:'current_rate',label:'Current Hourly Rate',type:'currency',prefix:'$',default:75,min:1},
      {key:'years_since_increase',label:'Years Since Last Increase',type:'number',default:2,min:0.5,step:0.5},
      {key:'inflation_rate',label:'Annual Inflation Rate',type:'percent',suffix:'%',default:3.5,min:0,max:20,description:'US CPI averaged ~3.5% 2022–2025.'},
      {key:'skill_improvement_pct',label:'Skill / Seniority Premium',type:'percent',suffix:'%',default:10,min:0,max:50,description:'New skills, certifications, portfolio growth since last raise.'},
      {key:'market_demand_adj',label:'Market Demand Adjustment',type:'percent',suffix:'%',default:5,min:-20,max:30,description:'Positive if demand in your niche has grown. Negative if over-saturated.'},
    ],
    outputs:[
      {key:'inflation_adjusted',label:'Inflation-Adjusted Rate',type:'currency'},
      {key:'justified_new_rate',label:'Justified New Rate',type:'currency',highlight:true},
      {key:'increase_amount',label:'Increase Amount',type:'currency'},
      {key:'increase_pct',label:'Increase Percentage',type:'percent',highlight:true},
      {key:'annual_revenue_gain',label:'Annual Revenue Gain (1000h)',type:'currency',description:'At 1,000 billable hours per year'},
    ],
    faqs:[
      {q:'How do I communicate a rate increase to existing clients?',a:'Give 30–60 days notice. Keep it factual: "My rates are increasing from $X to $Y effective [date]. This reflects inflation and my continued skill development." You don\'t need to justify it extensively — most professional clients expect periodic increases.'},
      {q:'Will I lose clients if I raise my rates?',a:'You might lose clients who were only with you because you were cheap — those are usually the most difficult clients too. Clients who value your work typically accept reasonable increases (under 20% with notice).'},
      {q:'How often should freelancers raise rates?',a:'At minimum annually to keep pace with inflation. Many experienced freelancers raise rates every 6–12 months in the first few years as their portfolio and skills compound rapidly.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-client-profit','fl-proposal-pricing'],
  },
  {
    slug:'fl-client-profit', name:'Client Profitability Analyzer',
    shortName:'Client Profit', icon:'👥', color:'#57C8FF',
    tagline:'Which clients are actually worth keeping?',
    description:'Calculate the true effective hourly rate for each client when you factor in admin time, revision rounds, stress premium, and payment delays.',
    seoTitle:'Freelance Client Profitability Calculator | Valcr Freelance',
    seoDescription:'Calculate the true profitability of each freelance client including admin time, revisions, payment delays, and stress. Find out who to fire and who to keep.',
    seoKeywords:['freelance client profitability calculator','which clients are most profitable freelancer','client value calculator freelance'],
    blogSlug:'client-profitability',
    fields:[
      {key:'monthly_client_revenue',label:'Monthly Revenue from This Client',type:'currency',prefix:'$',default:3000,min:0},
      {key:'billable_hours',label:'Billable Hours Per Month',type:'number',suffix:'h',default:20,min:0},
      {key:'admin_hours',label:'Admin & Communication Hours',type:'number',suffix:'h',default:4,min:0,description:'Emails, calls, status updates, reporting.'},
      {key:'revision_hours',label:'Unpaid Revision Hours',type:'number',suffix:'h',default:2,min:0},
      {key:'avg_payment_days',label:'Average Payment Delay (days)',type:'number',default:30,min:0,max:180,description:'Days past invoice due date they typically pay.'},
      {key:'stress_level',label:'Client Stress Level',type:'select',default:'medium',options:[{value:'low',label:'Low — easy to work with'},{value:'medium',label:'Medium — normal friction'},{value:'high',label:'High — demanding / difficult'},{value:'extreme',label:'Extreme — causes real problems'}]},
    ],
    outputs:[
      {key:'true_hourly_rate',label:'True Effective Hourly Rate',type:'currency',highlight:true},
      {key:'profitability_score',label:'Profitability Score',type:'percent',highlight:true,description:'100 = excellent, below 60 = fire them'},
      {key:'total_hours',label:'Total Real Hours Per Month',type:'hours'},
      {key:'monthly_opportunity_cost',label:'Monthly Opportunity Cost',type:'currency',description:'What you lose by not filling this time with better-paying work'},
    ],
    faqs:[
      {q:'What profitability score should I aim for?',a:'Above 80 is excellent — keep and nurture this client. 60–80 is acceptable — there is room to improve terms. Below 60 means you are undercharging, they are taking too much unpaid time, or both. Below 40, seriously consider offboarding.'},
      {q:'How does payment delay affect profitability?',a:'A client who pays 60 days late is effectively borrowing money from you interest-free for two months. At scale, this creates cash flow problems. The calculator applies a cost-of-capital penalty for late payment.'},
      {q:'How do I fire a bad client professionally?',a:'Give at least 30 days notice. Explain you are moving toward different types of work. Offer to help them find a replacement. Never burn bridges — the freelance world is smaller than it seems.'},
    ],
    relatedSlugs:['fl-project-profit','fl-proposal-pricing','fl-true-hourly-rate'],
  },
  {
    slug:'fl-freelance-vs-employment', name:'Freelance vs Employment Calculator',
    shortName:'Freelance vs Job', icon:'⚖️', color:'#FF6B57',
    tagline:'Is freelancing actually paying more than a job would?',
    description:'True apples-to-apples comparison between freelance income and a salaried position, including benefits, taxes, and hidden costs of each.',
    seoTitle:'Freelance vs Employment Calculator — Which Pays More? | Valcr Freelance',
    seoDescription:'Compare freelance income to a salaried job including taxes, benefits, retirement, paid leave, and job security. See the true financial comparison.',
    seoKeywords:['freelance vs employment calculator','is freelancing worth it financially','freelance vs salary comparison calculator'],
    blogSlug:'freelance-vs-employment',
    fields:[
      {key:'freelance_annual_gross',label:'Freelance Annual Gross Revenue',type:'currency',prefix:'$',default:120000,min:0},
      {key:'freelance_expenses',label:'Annual Freelance Business Expenses',type:'currency',prefix:'$',default:8000,min:0},
      {key:'employment_salary',label:'Employment Salary Offer',type:'currency',prefix:'$',default:85000,min:0},
      {key:'employer_health_value',label:'Employer Health Insurance Value',type:'currency',prefix:'$',default:7200,min:0,description:'Annual value of employer-sponsored health coverage.'},
      {key:'employer_retirement_pct',label:'Employer Retirement Match %',type:'percent',suffix:'%',default:4,min:0,max:20},
      {key:'paid_leave_days',label:'Paid Leave Days (employment)',type:'number',default:20,min:0,description:'Vacation + sick days. Freelancers fund their own.'},
      {key:'freelance_tax_rate',label:'Freelance Effective Tax Rate',type:'percent',suffix:'%',default:32,min:0,max:60},
      {key:'employment_tax_rate',label:'Employment Effective Tax Rate',type:'percent',suffix:'%',default:24,min:0,max:50},
    ],
    outputs:[
      {key:'freelance_net',label:'Freelance Net Income',type:'currency',highlight:true},
      {key:'employment_total_comp',label:'Employment Total Comp',type:'currency',highlight:true},
      {key:'freelance_advantage',label:'Freelance Advantage / Gap',type:'currency',highlight:true,description:'Positive = freelancing pays more'},
      {key:'break_even_freelance_rate',label:'Break-Even Freelance Revenue',type:'currency',description:'Gross revenue needed to match employment offer'},
    ],
    faqs:[
      {q:'Why does employment often win on this calculator?',a:'Benefits are expensive. Employer-sponsored health insurance, retirement matching, and paid leave are worth $15,000–$30,000+ annually at many companies. Freelancers fund all of these out of pocket.'},
      {q:'What does the break-even freelance rate mean?',a:'This is the gross freelance revenue you\'d need to earn to match the financial outcome of the employment offer, after accounting for all taxes, benefits, and expenses.'},
      {q:'Should I factor in job security?',a:'This calculator focuses on the pure financial comparison. Job security, autonomy, variety, and personal fulfillment are real factors but cannot be quantified the same way. Use this output as the financial baseline, then layer in your personal priorities.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-tax-reserve','fl-annual-income-planning'],
  },
  {
    slug:'fl-proposal-pricing', name:'Proposal Pricing Calculator',
    shortName:'Proposal Pricing', icon:'💼', color:'#C8FF57',
    tagline:'Three prices you can quote with confidence.',
    description:'Generate a minimum, recommended, and premium price point for any project based on your actual costs, scope risk, and value delivered.',
    seoTitle:'Freelance Proposal Pricing Calculator — What to Quote | Valcr Freelance',
    seoDescription:'Generate minimum, recommended, and premium price points for any freelance project. Based on your real hourly cost, scope risk, and client value.',
    seoKeywords:['freelance proposal pricing calculator','how to price a freelance project','freelance quote calculator','what to charge for freelance project'],
    blogSlug:'proposal-pricing',
    fields:[
      {key:'estimated_hours',label:'Estimated Core Hours',type:'number',suffix:'h',default:25,min:1},
      {key:'your_hourly_cost',label:'Your True Hourly Cost',type:'currency',prefix:'$',default:60,min:1},
      {key:'scope_risk',label:'Scope Risk Level',type:'select',default:'medium',options:[{value:'low',label:'Low — clearly defined, familiar work'},{value:'medium',label:'Medium — some ambiguity'},{value:'high',label:'High — vague brief, new territory'}]},
      {key:'revision_rounds',label:'Included Revision Rounds',type:'number',default:2,min:0,max:10},
      {key:'client_value_mult',label:'Client Value Multiplier',type:'number',default:1.5,min:1,max:5,step:0.1,description:'What is this project worth to the client vs cost to produce?'},
      {key:'expenses',label:'Direct Project Expenses',type:'currency',prefix:'$',default:200,min:0},
      {key:'platform_fee',label:'Platform Fee %',type:'percent',suffix:'%',default:10,min:0,max:30},
    ],
    outputs:[
      {key:'minimum_price',label:'Minimum Price',type:'currency',description:'Below this you lose money'},
      {key:'recommended_price',label:'Recommended Price',type:'currency',highlight:true,description:'Viable margin + scope buffer'},
      {key:'premium_price',label:'Premium Price',type:'currency',highlight:true,description:'Value-based pricing ceiling'},
      {key:'cost_basis',label:'Your Cost Basis',type:'currency'},
    ],
    faqs:[
      {q:'Which price should I quote?',a:'Start with the recommended price for standard clients. Use the premium price when the client is large, the project has high strategic value, or you are already at capacity. Use the minimum only as a floor for negotiation, never as your opening quote.'},
      {q:'What does the client value multiplier mean?',a:'Value-based pricing means charging based on what the work is worth to the client, not just your time. A landing page that converts 20% of visitors is worth far more than the hours it took to build. A multiplier of 1.5x means the recommended price is 50% above your cost basis.'},
      {q:'How do I handle clients who push back on price?',a:'The minimum price in this calculator is the floor below which you lose money. If a client won\'t meet that, decline the project. A well-priced project that covers your costs is better than a discounted project that creates resentment.'},
    ],
    relatedSlugs:['fl-project-profit','fl-true-hourly-rate','fl-client-profit'],
  },
  {
    slug:'fl-annual-income-planning', name:'Annual Income Planning Tool',
    shortName:'Income Planning', icon:'🗓️', color:'#57C8FF',
    tagline:'How many clients do you actually need?',
    description:'Calculate the exact pipeline, client count, and average project value needed to hit your annual income target.',
    seoTitle:'Freelance Income Planning Calculator — How Many Clients Do I Need? | Valcr Freelance',
    seoDescription:'Calculate the number of clients, projects, and proposals needed to hit your freelance income goal. Plan your pipeline with real numbers.',
    seoKeywords:['freelance income planning calculator','how many clients do i need freelancing','freelance revenue planning tool'],
    blogSlug:'income-planning',
    fields:[
      {key:'annual_revenue_target',label:'Annual Revenue Target',type:'currency',prefix:'$',default:100000,min:0},
      {key:'avg_project_value',label:'Average Project Value',type:'currency',prefix:'$',default:3000,min:1},
      {key:'avg_project_duration',label:'Average Project Duration (weeks)',type:'number',default:3,min:0.5,step:0.5},
      {key:'client_churn_rate',label:'Monthly Client Churn Rate',type:'percent',suffix:'%',default:20,min:0,max:100,description:'What % of clients do NOT return the next month?'},
      {key:'proposal_win_rate',label:'Proposal Win Rate',type:'percent',suffix:'%',default:25,min:1,max:100,description:'What % of your proposals turn into paid work?'},
      {key:'retainer_pct',label:'Revenue from Retainers %',type:'percent',suffix:'%',default:30,min:0,max:100,description:'Recurring monthly clients vs one-off projects.'},
    ],
    outputs:[
      {key:'monthly_revenue_needed',label:'Monthly Revenue Needed',type:'currency',highlight:true},
      {key:'active_projects_needed',label:'Simultaneous Projects Needed',type:'number',highlight:true},
      {key:'proposals_per_month',label:'Proposals to Send Monthly',type:'number'},
      {key:'pipeline_value_needed',label:'Pipeline Value to Maintain',type:'currency'},
      {key:'retainer_clients_needed',label:'Retainer Clients Needed',type:'number'},
    ],
    faqs:[
      {q:'What is pipeline value and why does it matter?',a:'Pipeline value is the total potential revenue in your active proposals and conversations. Because not all proposals convert, you need significantly more in your pipeline than your monthly target. With a 25% win rate, you need $4 in pipeline for every $1 of target revenue.'},
      {q:'How do I reduce the number of proposals I need to send?',a:'Two levers: increase your win rate (better proposals, niche specialization, referrals) or increase average project value (charge more per project, shift to larger clients). Both dramatically reduce the proposal volume required.'},
      {q:'What is a realistic proposal win rate?',a:'Industry average is 20–30%. Specialists with strong portfolios in their niche can hit 40–50%. Generalists competing on price are often below 15%. Improving your niche positioning is the fastest way to improve win rate.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-client-profit','fl-freelance-vs-employment'],
  },
  {
    slug:'fl-retainer-vs-project', name:'Retainer vs Project Calculator',
    shortName:'Retainer vs Project', icon:'🔄', color:'#FF6B57',
    tagline:'Which model builds more stable income?',
    description:'Compare the true financial outcome of retainer-based vs project-based freelancing given your client count, churn, and pricing.',
    seoTitle:'Freelance Retainer vs Project Pricing Calculator | Valcr Freelance',
    seoDescription:'Compare retainer vs project-based freelancing. Calculate income stability, effective rates, and annual revenue under each model.',
    seoKeywords:['freelance retainer vs project calculator','retainer pricing freelancer','should i charge retainer or project freelance'],
    blogSlug:'retainer-vs-project',
    fields:[
      {key:'monthly_retainer_fee',label:'Monthly Retainer Fee Per Client',type:'currency',prefix:'$',default:2000,min:0},
      {key:'retainer_hours',label:'Hours Included in Retainer',type:'number',suffix:'h',default:15,min:1},
      {key:'retainer_clients',label:'Number of Retainer Clients',type:'number',default:4,min:1},
      {key:'retainer_churn',label:'Monthly Retainer Churn Rate',type:'percent',suffix:'%',default:5,min:0,max:50},
      {key:'avg_project_fee',label:'Average Project Fee',type:'currency',prefix:'$',default:4000,min:0},
      {key:'projects_per_month',label:'New Projects Per Month',type:'number',default:2,min:0},
      {key:'project_acquisition_cost',label:'Avg Cost to Acquire a Project',type:'currency',prefix:'$',default:200,min:0,description:'Time and money spent on proposals, pitches, networking.'},
    ],
    outputs:[
      {key:'retainer_monthly_revenue',label:'Retainer Monthly Revenue',type:'currency',highlight:true},
      {key:'project_monthly_revenue',label:'Project Monthly Revenue',type:'currency',highlight:true},
      {key:'retainer_effective_hourly',label:'Retainer Effective Rate',type:'currency'},
      {key:'project_effective_hourly',label:'Project Effective Rate',type:'currency'},
      {key:'income_stability_score',label:'Income Stability Score',type:'percent',description:'100 = fully stable, 0 = feast or famine'},
    ],
    faqs:[
      {q:'Should I prefer retainers or projects?',a:'Retainers provide income stability and reduce acquisition costs. Projects typically offer higher effective rates but require constant business development. The optimal mix for most freelancers is 40–60% retainer revenue (predictable floor) topped up with projects.'},
      {q:'How do I convert project clients to retainers?',a:'At the end of a successful project, propose a monthly retainer for ongoing work: maintenance, consulting, monthly updates. Frame it as giving them priority access to your time. Many clients prefer the predictability of a retainer over ad-hoc project pricing.'},
    ],
    relatedSlugs:['fl-client-profit','fl-annual-income-planning','fl-project-profit'],
  },
  {
    slug:'fl-platform-fee-impact', name:'Platform Fee Impact Calculator',
    shortName:'Platform Fees', icon:'💸', color:'#C8FF57',
    tagline:'What Upwork and Fiverr are actually taking.',
    description:'Calculate the true cost of platform fees across Upwork, Fiverr, and other marketplaces, and the rate you need to charge to net your target.',
    seoTitle:'Freelance Platform Fee Calculator — Upwork, Fiverr, Toptal | Valcr Freelance',
    seoDescription:'Calculate what Upwork, Fiverr, and other freelance platforms actually take in fees and what you need to charge to net your target rate.',
    seoKeywords:['upwork fees calculator','fiverr fees calculator','freelance platform fee impact','how much does upwork take'],
    blogSlug:'platform-fees',
    fields:[
      {key:'your_target_net_rate',label:'Your Target Net Hourly Rate',type:'currency',prefix:'$',default:60,min:1,description:'What you want to take home per hour after platform fees.'},
      {key:'platform',label:'Platform',type:'select',default:'upwork',options:[{value:'upwork',label:'Upwork (tiered: 20%/10%/5%)'},{value:'fiverr',label:'Fiverr (20% flat)'},{value:'toptal',label:'Toptal (~40% retained)'},{value:'guru',label:'Guru (5–9%)'},{value:'custom',label:'Custom rate — enter below'}]},
      {key:'custom_fee_pct',label:'Custom Platform Fee %',type:'percent',suffix:'%',default:15,min:0,max:50,description:'Only used if "Custom rate" selected above.'},
      {key:'monthly_platform_earnings',label:'Monthly Earnings on Platform',type:'currency',prefix:'$',default:5000,min:0},
      {key:'client_lifetime_months',label:'Avg Client Relationship (months)',type:'number',default:6,min:1,description:'Upwork fees drop as you earn more with a single client.'},
    ],
    outputs:[
      {key:'gross_rate_needed',label:'Gross Rate to Charge',type:'currency',highlight:true,description:'What to quote to net your target'},
      {key:'monthly_fee_cost',label:'Monthly Platform Fee Cost',type:'currency',highlight:true},
      {key:'annual_fee_cost',label:'Annual Platform Fee Cost',type:'currency'},
      {key:'effective_fee_rate',label:'Effective Fee Rate',type:'percent'},
      {key:'direct_client_advantage',label:'Annual Gain Going Direct',type:'currency',description:'Savings if you moved this client off-platform'},
    ],
    faqs:[
      {q:'When does it make sense to move a client off-platform?',a:'After Upwork\'s 24-month rule, you may legally contract directly with a client you met through Upwork. At that point, moving them to direct billing saves you 5–20% in fees. For a $5,000/month client, that\'s $3,000–$12,000 per year.'},
      {q:'Why does Toptal show such a high platform fee?',a:'Toptal\'s model is different: they charge clients $150–$200+/hour and pay freelancers $60–$120/hour, retaining the difference. The effective platform fee (40%+) is much higher than Upwork or Fiverr, but Toptal provides client acquisition, vetting, and payment guarantee in return.'},
      {q:'Is Fiverr worth it at 20% fees?',a:'Fiverr\'s 20% flat fee is high, but the platform provides significant buyer traffic that you\'d otherwise need to generate yourself. For early-stage freelancers, that traffic may be worth the fee. As you build a direct client base, the calculus shifts.'},
    ],
    relatedSlugs:['fl-true-hourly-rate','fl-project-profit','fl-client-profit'],
  },
]

export const getFreelanceCalculator = (slug:string) => FREELANCE_CALCULATORS.find(c=>c.slug===slug)
export const getRelatedCalculators = (slug:string) => {
  const c = getFreelanceCalculator(slug)
  if (!c) return []
  return c.relatedSlugs.map(getFreelanceCalculator).filter(Boolean) as FreelanceCalculator[]
}
