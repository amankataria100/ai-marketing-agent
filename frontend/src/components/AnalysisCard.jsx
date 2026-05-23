import React from 'react'
import { Target, Layers, TrendingUp, Monitor, Lightbulb, ArrowRight } from 'lucide-react'

const platformColors = {
  Instagram: 'from-pink-500 to-purple-600',
  TikTok: 'from-slate-800 to-slate-600',
  LinkedIn: 'from-blue-600 to-blue-800',
  YouTube: 'from-red-500 to-red-700',
  Twitter: 'from-sky-400 to-sky-600',
  Facebook: 'from-blue-500 to-blue-700',
  Pinterest: 'from-red-400 to-red-600',
  Snapchat: 'from-yellow-400 to-yellow-500',
}

const priorityColor = {
  high: 'text-green-400 bg-green-400/10 border-green-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  low: 'text-muted bg-border',
}

export default function AnalysisCard({ analysis }) {
  if (!analysis) return null

  return (
    <div className="max-w-5xl mx-auto px-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-violet/20 border border-violet/30 flex items-center justify-center">
          <Target size={18} className="text-violet-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-text">Product Analysis</h2>
          <p className="text-xs font-body text-muted">AI-powered brand & audience insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {/* Category + Tone */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={14} className="text-accent" />
            <span className="label mb-0">Product Profile</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted font-body mb-1">Category</p>
              <p className="font-display font-semibold text-text">{analysis.product_category}</p>
            </div>
            <div>
              <p className="text-xs text-muted font-body mb-1">Brand Tone</p>
              <p className="font-body text-sm text-amber capitalize">{analysis.brand_tone}</p>
            </div>
            <div>
              <p className="text-xs text-muted font-body mb-1">Color Psychology</p>
              <p className="font-body text-xs text-muted/80">{analysis.color_psychology}</p>
            </div>
          </div>
        </div>

        {/* Marketing Angle */}
        <div className="card bg-gradient-to-br from-accent/10 to-violet/5 border-accent/20">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={14} className="text-accent" />
            <span className="label mb-0">Marketing Angle</span>
          </div>
          <p className="font-display font-semibold text-lg text-text leading-snug mb-4">
            "{analysis.marketing_angle}"
          </p>
          <div>
            <p className="text-xs text-muted font-body mb-2">Competitor Gap</p>
            <p className="font-body text-xs text-text/70 leading-relaxed">{analysis.competitor_gap}</p>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={14} className="text-green-400" />
            <span className="label mb-0">Differentiators</span>
          </div>
          <ul className="space-y-2.5">
            {analysis.key_differentiators?.map((d, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ArrowRight size={12} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-text/80">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Audience Insights */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} className="text-amber" />
            <span className="label mb-0">Audience Insights</span>
          </div>
          <div className="space-y-3">
            {analysis.audience_insights?.map((item, i) => (
              <div key={i} className="p-3 bg-bg rounded-xl border border-border">
                <p className="font-body text-sm font-medium text-text mb-1">{item.insight}</p>
                <p className="font-body text-xs text-muted leading-relaxed">→ {item.implication}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Recommendations */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={14} className="text-violet-400" />
            <span className="label mb-0">Platform Strategy</span>
          </div>
          <div className="space-y-3">
            {analysis.platform_recommendations?.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-bg rounded-xl border border-border">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platformColors[p.platform] || 'from-accent to-violet'} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[10px] text-white font-display font-bold">
                    {p.platform?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-body text-sm font-medium text-text">{p.platform}</p>
                    <span className={`chip border text-[10px] py-0.5 ${priorityColor[p.priority] || priorityColor.medium}`}>
                      {p.priority}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted">{p.reason}</p>
                  <p className="font-body text-xs text-accent/80 mt-1">{p.content_type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
