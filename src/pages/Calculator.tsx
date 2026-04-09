import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { AdBanner } from '@/components/AdBanner'
import { useTelemetry } from '@/hooks/useTelemetry'
import { getFreelanceCalculator, getRelatedCalculators } from '@/calculators'
import type { FreelanceField, FreelanceOutput } from '@/calculators'
import { runCalculator } from '@/calculators/engine'
import { useAuthStore, hasAccess } from '@/store'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

// ── Format output values ──────────────────────────────────────────────────────
function fmt(value: number, type: string): string {
  if (type === 'currency') {
    if (Math.abs(value) >= 1000) return `$${(value/1000).toFixed(1)}K`
    return `$${value.toFixed(2)}`
  }
  if (type === 'percent') return `${value.toFixed(1)}%`
  if (type === 'hours') return `${value.toFixed(1)}h`
  if (type === 'multiplier') return `${value.toFixed(2)}x`
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

// ── Input field ───────────────────────────────────────────────────────────────
function InputField({ field, value, onChange, onFocus, onBlur }: {
  field: FreelanceField; value: number|string
  onChange:(v:number|string)=>void; onFocus:()=>void; onBlur:()=>void
}) {
  if (field.type === 'select') {
    return (
      <div>
        <label className="label">{field.label}</label>
        {field.description && <p className="text-xs text-ink-600 mb-2">{field.description}</p>}
        <select value={String(value)} onChange={e=>onChange(e.target.value)}
          onFocus={onFocus} onBlur={onBlur} className="input-field appearance-none">
          {field.options?.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    )
  }
  return (
    <div>
      <label className="label">{field.label}</label>
      {field.description && <p className="text-xs text-ink-600 mb-2">{field.description}</p>}
      <div className="relative">
        {field.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm pointer-events-none">{field.prefix}</span>}
        <input type="number" value={value} min={field.min} max={field.max} step={field.step||'any'}
          onFocus={onFocus} onBlur={onBlur}
          onChange={e=>{const v=parseFloat(e.target.value);if(!isNaN(v))onChange(v)}}
          className={`input-field ${field.prefix?'pl-7':''} ${field.suffix?'pr-10':''}`} />
        {field.suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm pointer-events-none">{field.suffix}</span>}
      </div>
    </div>
  )
}

// ── Result card ───────────────────────────────────────────────────────────────
function ResultCard({ output, value, accentColor }: { output: FreelanceOutput; value: number; accentColor: string }) {
  const isNeg = value < 0
  const formatted = fmt(value, output.type)
  return (
    <div className="rounded-xl p-5 border transition-all"
      style={output.highlight
        ? { background: `${accentColor}10`, borderColor: `${accentColor}35` }
        : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="text-xs text-ink-500 uppercase tracking-widest mb-2">{output.label}</div>
      <div className="font-display font-bold text-3xl tabular-nums"
        style={{ color: isNeg ? '#ff6b6b' : output.highlight ? accentColor : '#f0f0fa' }}>
        {formatted}
      </div>
      {output.description && <p className="text-ink-600 text-xs mt-2">{output.description}</p>}
    </div>
  )
}

// ── Benchmark badge ───────────────────────────────────────────────────────────
function BenchmarkBadge({ calculatorSlug, outputs, inputs, accentColor }: {
  calculatorSlug: string; outputs: Record<string,number>
  inputs: Record<string,number|string>; accentColor: string
}) {
  const { token } = useAuthStore()
  const [bm, setBm] = useState<{ percentile: number; vsMedian: string; sampleCount: number; isAnchor: boolean; sourceName?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token || Object.keys(outputs).length === 0) return
    setLoading(true)
    fetch(`${API}/benchmarks/lookup-bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ calculator_slug: calculatorSlug, input_snapshot: inputs, outputs }),
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d?.results) return
        const first = Object.values(d.results).find((v: any) => v?.available) as any
        if (first) {
          setBm({
            percentile: first.user_percentile,
            vsMedian: first.user_vs_median,
            sampleCount: first.sample_count,
            isAnchor: first.is_anchor ?? false,
            sourceName: first.source_name,
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [calculatorSlug, JSON.stringify(outputs), token])

  if (loading) return (
    <div className="card p-4 animate-pulse">
      <div className="h-3 bg-ink-700 rounded w-24 mb-2" />
      <div className="h-4 bg-ink-800 rounded w-40" />
    </div>
  )
  if (!bm) return null

  return (
    <div className="rounded-xl p-4 border" style={{ background: 'rgba(87,200,255,0.06)', borderColor: 'rgba(87,200,255,0.2)' }}>
      <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">Benchmark</p>
      <p className="text-ink-200 text-sm">
        You're in the <strong className="text-sky-400">{bm.percentile}th percentile</strong> for your segment
        — <span className="text-ink-300">{bm.vsMedian}</span> among similar freelancers.
        {' '}<span className="text-ink-500">(n={bm.sampleCount.toLocaleString()})</span>
      </p>
      {bm.isAnchor && bm.sourceName && (
        <p className="text-xs text-ink-600 mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Based on {bm.sourceName}. Updates to live data as your segment grows.
        </p>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function CalculatorPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user, token } = useAuthStore()
  const isPro = hasAccess(user, 'pro')
  const calc = getFreelanceCalculator(slug || '')
  const related = getRelatedCalculators(slug || '')

  const [inputs, setInputs] = useState<Record<string,number|string>>({})
  const [outputs, setOutputs] = useState<Record<string,number>>({})

  const { onFieldFocus, onFieldBlur, onFieldChange, onCalculationRun } = useTelemetry(slug || '')

  useEffect(() => {
    if (!calc) return
    const defaults: Record<string,number|string> = {}
    calc.fields.forEach(f => { defaults[f.key] = f.default })
    setInputs(defaults)
  }, [slug])

  useEffect(() => {
    if (!calc || Object.keys(inputs).length === 0) return
    const result = runCalculator(calc.slug, inputs)
    if (result) {
      setOutputs(result)
      onCalculationRun(inputs as Record<string,number|string>, result as Record<string,unknown>)
    }
  }, [inputs])

  const handleChange = useCallback((key: string, value: number|string) => {
    setInputs(prev => ({ ...prev, [key]: value }))
    onFieldChange(key, value)
  }, [onFieldChange])

  if (!calc) return (
    <div className="pt-28 pb-20 px-4 text-center">
      <h1 className="font-display font-bold text-ink-50 text-2xl mb-4">Calculator not found</h1>
      <Link to="/calculators" className="btn-primary">See all calculators</Link>
    </div>
  )

  return (
    <>
      <SEOHead title={calc.seoTitle} description={calc.seoDescription}
        canonicalPath={`/calculators/${calc.slug}`} keywords={calc.seoKeywords} />

      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          <Link to="/calculators" className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-200 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All calculators
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{calc.icon}</span>
              <span className="section-tag">Freelance</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-50 mb-3">{calc.name}</h1>
            <p className="text-ink-300 text-lg max-w-2xl">{calc.description}</p>
          </div>

          {/* Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Inputs */}
            <div className="card p-6">
              <h2 className="text-xs font-mono text-ink-500 uppercase tracking-widest mb-6">Your Numbers</h2>
              <div className="space-y-5">
                {calc.fields.map(field => (
                  <InputField key={field.key} field={field}
                    value={inputs[field.key] ?? field.default}
                    onChange={val => handleChange(field.key, val)}
                    onFocus={() => onFieldFocus(field.key)}
                    onBlur={() => onFieldBlur(field.key)} />
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-ink-500 uppercase tracking-widest mb-2">Your Results</h2>
              {calc.outputs.map(output => {
                const value = outputs[output.key]
                if (value === undefined) return null
                return <ResultCard key={output.key} output={output} value={value} accentColor={calc.color} />
              })}

              {/* Benchmark — Pro only */}
              {isPro && Object.keys(outputs).length > 0 && (
                <BenchmarkBadge calculatorSlug={calc.slug} outputs={outputs}
                  inputs={inputs} accentColor={calc.color} />
              )}

              {/* Pro upsell */}
              {!isPro && (
                <div className="card p-4 border-acid/20 bg-acid/5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-acid" />
                    <span className="text-acid text-xs font-bold uppercase tracking-widest">Pro Feature</span>
                  </div>
                  <p className="text-ink-300 text-sm mb-3">
                    See how your numbers compare to other freelancers in your skill category and experience tier.
                  </p>
                  <Link to="/pricing" className="btn-primary text-xs py-1.5 px-4">Unlock benchmarks — $9/mo</Link>
                </div>
              )}
            </div>
          </div>

          {/* ── AD BANNER — one per calculator page ─────────────────── */}
          <AdBanner className="mb-12" />

          {/* FAQs */}
          {calc.faqs.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-bold text-ink-50 text-2xl mb-6">Frequently asked</h2>
              <div className="space-y-4">
                {calc.faqs.map(faq => (
                  <details key={faq.q} className="card p-6 group">
                    <summary className="font-display font-bold text-ink-100 text-sm cursor-pointer list-none flex items-center justify-between">
                      {faq.q}
                      <ArrowRight className="w-4 h-4 text-ink-600 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <p className="text-ink-400 text-sm leading-relaxed mt-4">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-ink-50 text-2xl mb-6">Related calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.slug} to={`/calculators/${r.slug}`}
                    className="card p-5 hover:border-acid/30 hover:bg-acid/5 transition-all group">
                    <span className="text-2xl mb-3 block">{r.icon}</span>
                    <h3 className="font-display font-bold text-ink-100 text-sm mb-1 group-hover:text-acid transition-colors">{r.shortName}</h3>
                    <p className="text-ink-600 text-xs">{r.tagline}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-600 group-hover:text-acid mt-3 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog cross-link */}
          {calc.blogSlug && (
            <div className="mt-12 p-5 card border-ink-700 flex items-center justify-between gap-4">
              <p className="text-ink-400 text-sm">Want a deeper explanation? Read our guide.</p>
              <Link to={`/blog/${calc.blogSlug}`} className="btn-secondary text-sm shrink-0">
                Read the article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
