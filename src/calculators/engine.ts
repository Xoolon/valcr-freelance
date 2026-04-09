export type Inputs = Record<string,number|string>
export type Outputs = Record<string,number>

const pct = (v:number)=>v/100
const clamp = (v:number,lo:number,hi:number)=>Math.min(hi,Math.max(lo,v))

export function calcTrueHourlyRate(v:Inputs):Outputs {
  const target=+v.annual_income_target,weeks=+v.weeks_work_per_year
  const hrs=+v.hours_per_week,billable=pct(+v.billable_pct)
  const tax=pct(+v.tax_rate),fee=pct(+v.platform_fee),expenses=+v.monthly_expenses*12
  const annualBillable=weeks*hrs*billable
  const grossNeeded=(target+expenses)/(1-tax)/(1-fee)
  const minRate=annualBillable>0?grossNeeded/annualBillable:0
  return {
    minimum_rate:Math.ceil(minRate),
    recommended_rate:Math.ceil(minRate*1.25),
    annual_billable_hours:Math.round(annualBillable),
    effective_hourly_net:Math.round(target/(annualBillable||1)*100)/100,
  }
}

export function calcProjectProfit(v:Inputs):Outputs {
  const fee=+v.project_fee,core=+v.estimated_hours,admin=+v.admin_hours
  const cost=+v.your_hourly_cost,exp=+v.project_expenses
  const pfee=pct(+v.platform_fee),revs=+v.revision_rounds,hpr=+v.hours_per_revision
  const total=core+admin+revs*hpr
  const platformCost=fee*pfee
  const profit=fee-total*cost-exp-platformCost
  const margin=fee>0?profit/fee*100:0
  const eff=(fee-platformCost-exp)/(total||1)
  return {project_profit:Math.round(profit*100)/100,profit_margin:Math.round(margin*10)/10,effective_hourly:Math.round(eff*100)/100,total_hours:Math.round(total*10)/10}
}

export function calcTaxReserve(v:Inputs):Outputs {
  const gross=+v.annual_gross_income,stateTax=pct(+v.state_tax_rate)
  const deduct=+v.deductible_expenses,retire=+v.retirement_contribution
  const status=String(v.filing_status)
  const seTax=gross*0.9235*0.153,halfSE=seTax/2
  const sd=status==='married'?29200:status==='hoh'?21900:14600
  const taxable=Math.max(0,gross-deduct-retire-halfSE-sd)
  const brackets:{m:[number,number][]}={m:status==='married'
    ?[[23850,.10],[96950,.12],[206700,.22],[394600,.24],[501050,.32],[751600,.35],[Infinity,.37]]
    :status==='hoh'?[[17000,.10],[64850,.12],[103350,.22],[197300,.24],[250500,.32],[626350,.35],[Infinity,.37]]
    :[[11925,.10],[48475,.12],[103350,.22],[197300,.24],[250525,.32],[626350,.35],[Infinity,.37]]}
  let fed=0,prev=0
  for(const[ceil,rate]of brackets.m){if(taxable<=prev)break;fed+=(Math.min(taxable,ceil)-prev)*rate;prev=ceil}
  const total=seTax+fed+gross*stateTax
  const eff=gross>0?total/gross*100:0
  const res=clamp(Math.ceil(eff)+2,20,45)
  return {reserve_pct:Math.round(res*10)/10,monthly_reserve:Math.round(gross*pct(res)/12),quarterly_payment:Math.round(total*0.25),self_employment_tax:Math.round(seTax),effective_tax_rate:Math.round(eff*10)/10}
}

export function calcRateIncrease(v:Inputs):Outputs {
  const cur=+v.current_rate,yrs=+v.years_since_increase
  const inf=pct(+v.inflation_rate),skill=pct(+v.skill_improvement_pct),mkt=pct(+v.market_demand_adj)
  const adj=cur*Math.pow(1+inf,yrs)
  const nw=adj*(1+skill)*(1+mkt)
  const inc=nw-cur
  return {inflation_adjusted:Math.round(adj*100)/100,justified_new_rate:Math.round(nw*100)/100,increase_amount:Math.round(inc*100)/100,increase_pct:Math.round(inc/cur*1000)/10,annual_revenue_gain:Math.round(inc*1000)}
}

export function calcClientProfit(v:Inputs):Outputs {
  const rev=+v.monthly_client_revenue,bill=+v.billable_hours
  const admin=+v.admin_hours,revh=+v.revision_hours,days=+v.avg_payment_days
  const stress:Record<string,number>={low:1,medium:.9,high:.75,extreme:.55}
  const sm=stress[String(v.stress_level)]??0.9
  const payPen=days>30?(days-30)/30*0.03:0
  const total=bill+admin+revh
  const adjRev=rev*(1-payPen)
  const trueH=total>0?adjRev/total:0
  const score=clamp((trueH/100)*100*sm,0,100)
  const opp=Math.max(0,(80-trueH)*total)
  return {true_hourly_rate:Math.round(trueH*100)/100,profitability_score:Math.round(score),total_hours:Math.round(total*10)/10,monthly_opportunity_cost:Math.round(opp)}
}

export function calcFreelanceVsEmployment(v:Inputs):Outputs {
  const fg=+v.freelance_annual_gross,fe=+v.freelance_expenses
  const sal=+v.employment_salary,hlth=+v.employer_health_value
  const retM=pct(+v.employer_retirement_pct),leave=+v.paid_leave_days
  const fTax=pct(+v.freelance_tax_rate),eTax=pct(+v.employment_tax_rate)
  const fNet=(fg-fe)*(1-fTax)
  const eTComp=sal*(1-eTax)+hlth+sal*retM+(sal/260)*leave
  const adv=fNet-eTComp
  const be=(eTComp/(1-fTax))+fe
  return {freelance_net:Math.round(fNet),employment_total_comp:Math.round(eTComp),freelance_advantage:Math.round(adv),break_even_freelance_rate:Math.round(be)}
}

export function calcProposalPricing(v:Inputs):Outputs {
  const hrs=+v.estimated_hours,cost=+v.your_hourly_cost
  const risk:Record<string,number>={low:1.1,medium:1.25,high:1.45}
  const rb=risk[String(v.scope_risk)]??1.25
  const revH=+v.revision_rounds*(hrs*0.1)
  const total=(hrs+revH)*rb
  const basis=total*cost+(+v.expenses)
  const pm=1/(1-pct(+v.platform_fee))
  return {minimum_price:Math.round(basis*pm),recommended_price:Math.round(basis*pm*1.35),premium_price:Math.round(basis*(+v.client_value_mult)*pm),cost_basis:Math.round(basis)}
}

export function calcAnnualIncomePlanning(v:Inputs):Outputs {
  const ann=+v.annual_revenue_target,apv=+v.avg_project_value
  const dur=+v.avg_project_duration,churn=pct(+v.client_churn_rate)
  const win=pct(+v.proposal_win_rate),retP=pct(+v.retainer_pct)
  const monthly=ann/12
  const projRev=monthly*(1-retP)
  const ppm=apv>0?Math.ceil(projRev/apv):0
  const active=Math.ceil(ppm*(dur/4))
  const props=win>0?Math.ceil(ppm/win):0
  const pipe=win>0?monthly/win:0
  const rVal=apv*0.6,rClient=rVal>0?Math.ceil(monthly*retP/rVal/(1-churn)):0
  return {monthly_revenue_needed:Math.round(monthly),active_projects_needed:Math.max(1,active),proposals_per_month:Math.max(1,props),pipeline_value_needed:Math.round(pipe),retainer_clients_needed:Math.max(0,rClient)}
}

export function calcRetainerVsProject(v:Inputs):Outputs {
  const rf=+v.monthly_retainer_fee,rh=+v.retainer_hours,rc=+v.retainer_clients
  const churn=pct(+v.retainer_churn),apf=+v.avg_project_fee
  const ppm=+v.projects_per_month,acq=+v.project_acquisition_cost
  const retRev=rf*rc*(1-churn)
  const projRev=(apf-acq)*ppm
  const total=retRev+projRev
  const stability=total>0?clamp(retRev/total*100,0,100):0
  return {retainer_monthly_revenue:Math.round(retRev),project_monthly_revenue:Math.round(projRev),retainer_effective_hourly:Math.round(rf/(rh||1)*100)/100,project_effective_hourly:Math.round(apf/((rh||1)*3)*100)/100,income_stability_score:Math.round(stability)}
}

export function calcPlatformFeeImpact(v:Inputs):Outputs {
  const net=+v.your_target_net_rate,platform=String(v.platform)
  const custom=pct(+v.custom_fee_pct),monthly=+v.monthly_platform_earnings
  const lifetime=+v.client_lifetime_months
  let eff:number
  if(platform==='upwork'){
    const tot=monthly*lifetime
    const t1=Math.min(tot,500)*0.20,t2=Math.min(Math.max(tot-500,0),9500)*0.10,t3=Math.max(tot-10000,0)*0.05
    eff=tot>0?(t1+t2+t3)/tot:0.20
  }else if(platform==='fiverr')eff=0.20
  else if(platform==='toptal')eff=0.40
  else if(platform==='guru')eff=0.07
  else eff=custom
  const gross=net/(1-eff)
  const mFee=monthly*eff
  return {gross_rate_needed:Math.round(gross*100)/100,monthly_fee_cost:Math.round(mFee),annual_fee_cost:Math.round(mFee*12),effective_fee_rate:Math.round(eff*1000)/10,direct_client_advantage:Math.round(mFee*12)}
}

export const ENGINE:Record<string,(v:Inputs)=>Outputs>={
  'fl-true-hourly-rate':calcTrueHourlyRate,
  'fl-project-profit':calcProjectProfit,
  'fl-tax-reserve':calcTaxReserve,
  'fl-rate-increase':calcRateIncrease,
  'fl-client-profit':calcClientProfit,
  'fl-freelance-vs-employment':calcFreelanceVsEmployment,
  'fl-proposal-pricing':calcProposalPricing,
  'fl-annual-income-planning':calcAnnualIncomePlanning,
  'fl-retainer-vs-project':calcRetainerVsProject,
  'fl-platform-fee-impact':calcPlatformFeeImpact,
}

export function runCalculator(slug:string,inputs:Inputs):Outputs|null {
  try{return ENGINE[slug]?.(inputs)??null}catch{return null}
}
