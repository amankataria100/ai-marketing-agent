import React, { useState } from 'react'
import {
  MessageSquare, Megaphone, Zap, Hash, Film, LayoutGrid, Rocket,
  Copy, Check, ChevronDown, ChevronUp, Tag
} from 'lucide-react'
import toast from 'react-hot-toast'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
    >
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
    </button>
  )
}

function TabBtn({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-all duration-200 ${
        active ? 'bg-accent text-white' : 'text-muted hover:text-text hover:bg-surface'
      }`}
    >
      <Icon size={13} />
      {label}
    </button>
  )
}

// ─── Sub-components ───────────────────────────────────────

function Captions({ data }) {
  return (
    <div className="space-y-4">
      {data?.map((item, i) => (
        <div key={i} className="card group">
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className="chip bg-violet/10 text-violet-300 border border-violet/20 capitalize">{item.style}</span>
            <div className="flex items-center gap-1">
              <span className={`chip text-[10px] ${item.estimated_engagement === 'high' ? 'bg-green-400/10 text-green-400' : 'bg-amber-400/10 text-amber-400'}`}>
                {item.estimated_engagement} engagement
              </span>
              <CopyBtn text={item.caption} />
            </div>
          </div>
          <p className="font-body text-sm text-text leading-relaxed whitespace-pre-wrap">{item.caption}</p>
        </div>
      ))}
    </div>
  )
}

function AdCopy({ data }) {
  return (
    <div className="space-y-4">
      {data?.map((ad, i) => (
        <div key={i} className="card group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="chip bg-accent/10 text-accent border border-accent/20">{ad.platform}</span>
              <span className="chip bg-surface text-muted border border-border capitalize">{ad.objective}</span>
            </div>
            <CopyBtn text={`${ad.headline}\n\n${ad.body}`} />
          </div>
          <h3 className="font-display font-bold text-lg text-text mb-2">{ad.headline}</h3>
          <p className="font-body text-sm text-text/70 leading-relaxed">{ad.body}</p>
        </div>
      ))}
    </div>
  )
}

function Hooks({ data }) {
  const typeColor = {
    'pain-point': 'text-red-400 bg-red-400/10 border-red-400/20',
    curiosity: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'bold-claim': 'text-accent bg-accent/10 border-accent/20',
    question: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    story: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  }
  return (
    <div className="space-y-3">
      {data?.map((hook, i) => (
        <div key={i} className="card flex items-center gap-4 group">
          <div className="text-2xl font-display font-bold text-border flex-shrink-0 w-8 text-center">{i + 1}</div>
          <div className="flex-1">
            <p className="font-body font-medium text-text">{hook.text}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`chip border text-[10px] ${typeColor[hook.type] || 'text-muted bg-border'}`}>{hook.type}</span>
            <CopyBtn text={hook.text} />
          </div>
        </div>
      ))}
    </div>
  )
}

function CTAs({ data }) {
  const urgencyColor = {
    high: 'bg-red-500 hover:bg-red-600',
    medium: 'bg-accent hover:bg-orange-500',
    low: 'bg-surface border border-border hover:border-accent text-text',
  }
  return (
    <div className="space-y-3">
      {data?.map((cta, i) => (
        <div key={i} className="card flex items-center gap-4 group">
          <button className={`px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white transition-all flex-shrink-0 ${urgencyColor[cta.urgency] || urgencyColor.medium}`}>
            {cta.text}
          </button>
          <div className="flex-1">
            <p className="text-xs font-body text-muted">{cta.context}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`chip text-[10px] border ${cta.urgency === 'high' ? 'text-red-400 border-red-400/20 bg-red-400/10' : cta.urgency === 'medium' ? 'text-accent border-accent/20 bg-accent/10' : 'text-muted border-border'}`}>
              {cta.urgency} urgency
            </span>
            <CopyBtn text={cta.text} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Hashtags({ data }) {
  if (!data) return null
  const sections = [
    { key: 'branded', label: 'Branded', color: 'text-accent bg-accent/10 border-accent/20' },
    { key: 'niche', label: 'Niche', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
    { key: 'trending', label: 'Trending', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  ]
  const allTags = [...(data.branded || []), ...(data.niche || []), ...(data.trending || [])].join(' ')
  return (
    <div className="space-y-5">
      {sections.map(({ key, label, color }) => (
        <div key={key} className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag size={13} className="text-muted" />
              <span className="label mb-0">{label} Hashtags</span>
            </div>
            <CopyBtn text={data[key]?.join(' ') || ''} />
          </div>
          <div className="flex flex-wrap gap-2">
            {data[key]?.map((tag, i) => (
              <span key={i} className={`chip border font-body text-xs ${color}`}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
      <div className="card bg-surface/50">
        <div className="flex items-center justify-between mb-2">
          <span className="label mb-0">All Hashtags Combined</span>
          <CopyBtn text={allTags} />
        </div>
        <p className="font-body text-xs text-muted/60 leading-relaxed">{allTags}</p>
      </div>
    </div>
  )
}

function Reels({ data }) {
  const vibeColor = {
    educational: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    entertaining: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    inspiring: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'behind-scenes': 'text-green-400 bg-green-400/10 border-green-400/20',
  }
  return (
    <div className="space-y-4">
      {data?.map((reel, i) => (
        <div key={i} className="card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display font-bold text-text mb-1">{reel.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`chip border text-[10px] ${vibeColor[reel.vibe] || 'text-muted'}`}>{reel.vibe}</span>
                <span className="chip bg-surface text-muted border border-border text-[10px]">{reel.duration}</span>
              </div>
            </div>
            <Film size={18} className="text-muted" />
          </div>
          <p className="font-body text-sm text-text/70 mb-3 leading-relaxed">{reel.concept}</p>
          <div className="p-3 bg-bg rounded-xl border border-border">
            <p className="text-xs text-muted font-body mb-1">⚡ Opening Hook (first 3 seconds)</p>
            <p className="font-body text-sm font-medium text-accent">{reel.hook}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Carousels({ data }) {
  const [expanded, setExpanded] = useState(null)
  return (
    <div className="space-y-4">
      {data?.map((carousel, i) => (
        <div key={i} className="card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display font-bold text-text mb-1">{carousel.title}</h3>
              <span className="chip bg-surface text-muted border border-border text-[10px] capitalize">{carousel.objective}</span>
            </div>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
            >
              {expanded === i ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
          <div className="p-3 bg-bg rounded-xl border border-border mb-3">
            <p className="text-xs text-muted font-body mb-1">Cover Slide</p>
            <p className="font-body text-sm font-medium text-amber">{carousel.cover_hook}</p>
          </div>
          {expanded === i && (
            <div className="space-y-2">
              {carousel.slides?.map((slide, j) => (
                <div key={j} className="flex items-start gap-3 p-3 bg-bg/50 rounded-lg border border-border/50">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-display font-bold flex items-center justify-center flex-shrink-0">{j + 1}</span>
                  <p className="font-body text-sm text-text/80">{slide}</p>
                </div>
              ))}
            </div>
          )}
          {expanded !== i && (
            <p className="text-xs text-muted font-body">{carousel.slides?.length} slides — click to expand</p>
          )}
        </div>
      ))}
    </div>
  )
}

function Campaigns({ data }) {
  return (
    <div className="space-y-4">
      {data?.map((campaign, i) => (
        <div key={i} className="card bg-gradient-to-br from-violet/5 to-accent/5 border-violet/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-1">{campaign.name}</h3>
              <div className="flex items-center gap-2">
                {campaign.platforms?.map((p) => (
                  <span key={p} className="chip bg-surface text-muted border border-border text-[10px]">{p}</span>
                ))}
                <span className="chip bg-accent/10 text-accent border border-accent/20 text-[10px]">{campaign.duration}</span>
              </div>
            </div>
            <Rocket size={20} className="text-violet-400" />
          </div>
          <p className="font-body text-sm text-text/70 leading-relaxed mb-3">{campaign.concept}</p>
          <div className="p-3 bg-bg rounded-xl border border-border mb-3">
            <p className="text-xs text-muted font-body mb-1">🎯 Key Message</p>
            <p className="font-body text-sm font-medium text-amber">{campaign.key_message}</p>
          </div>
          <div>
            <p className="text-xs text-muted font-body mb-2">Content Pillars</p>
            <div className="flex flex-wrap gap-2">
              {campaign.content_pillars?.map((p, i) => (
                <span key={i} className="chip bg-violet/10 text-violet-300 border border-violet/20 text-xs">{p}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main ContentTabs ───────────────────────────────────────

const TABS = [
  { key: 'captions', label: 'Captions', icon: MessageSquare },
  { key: 'adcopy', label: 'Ad Copy', icon: Megaphone },
  { key: 'hooks', label: 'Hooks', icon: Zap },
  { key: 'ctas', label: 'CTAs', icon: Tag },
  { key: 'hashtags', label: 'Hashtags', icon: Hash },
  { key: 'reels', label: 'Reels', icon: Film },
  { key: 'carousels', label: 'Carousels', icon: LayoutGrid },
  { key: 'campaigns', label: 'Campaigns', icon: Rocket },
]

export default function ContentTabs({ content }) {
  const [active, setActive] = useState('captions')
  if (!content) return null

  const renderContent = () => {
    switch (active) {
      case 'captions': return <Captions data={content.instagram_captions} />
      case 'adcopy': return <AdCopy data={content.ad_copy} />
      case 'hooks': return <Hooks data={content.hooks} />
      case 'ctas': return <CTAs data={content.cta_suggestions} />
      case 'hashtags': return <Hashtags data={content.hashtags} />
      case 'reels': return <Reels data={content.reel_ideas} />
      case 'carousels': return <Carousels data={content.carousel_ideas} />
      case 'campaigns': return <Campaigns data={content.campaign_suggestions} />
      default: return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
          <Zap size={18} className="text-accent" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-text">Generated Content</h2>
          <p className="text-xs font-body text-muted">Ready-to-use marketing assets</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 flex-wrap bg-surface border border-border rounded-2xl p-1.5 mb-6 overflow-x-auto">
        {TABS.map(({ key, label, icon }) => (
          <TabBtn key={key} active={active === key} onClick={() => setActive(key)} icon={icon} label={label} />
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in">{renderContent()}</div>
    </div>
  )
}
