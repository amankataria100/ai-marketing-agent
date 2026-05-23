import React, { useState } from 'react'
import { LayoutDashboard, Trash2, Eye, Download, Calendar, Tag, FileText, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function exportAsJSON(item) {
  const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${item.brandName}_marketing_${Date.now()}.json`
  a.click()
}

export default function Dashboard({ saved, onDelete, onView }) {
  const [preview, setPreview] = useState(null)

  if (!saved || saved.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
            <LayoutDashboard size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-text">Dashboard</h2>
            <p className="text-xs font-body text-muted">Your saved marketing outputs</p>
          </div>
        </div>
        <div className="card text-center py-16">
          <FileText size={40} className="text-border mx-auto mb-4" />
          <p className="font-display font-semibold text-text mb-2">No saved outputs yet</p>
          <p className="font-body text-sm text-muted">Generate content and save outputs to see them here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
            <LayoutDashboard size={18} className="text-accent" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-text">Dashboard</h2>
            <p className="text-xs font-body text-muted">{saved.length} saved campaign{saved.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="font-display font-bold text-2xl text-accent">{saved.length}</p>
            <p className="text-xs font-body text-muted">Campaigns</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-2xl text-amber">{saved.reduce((a, s) => a + (s.content?.instagram_captions?.length || 0), 0)}</p>
            <p className="text-xs font-body text-muted">Captions</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-2xl text-violet-400">{saved.reduce((a, s) => a + (s.content?.campaign_suggestions?.length || 0), 0)}</p>
            <p className="text-xs font-body text-muted">Campaigns</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {saved.map((item) => (
          <div key={item.id} className="card hover:border-accent/30 transition-all duration-200 group">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-lg text-text">{item.brandName}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock size={11} className="text-muted" />
                  <span className="text-xs font-body text-muted">{formatDate(item.timestamp)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { onView(item); toast.success('Loaded!') }}
                  className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                  title="View"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => { exportAsJSON(item); toast.success('Exported!') }}
                  className="p-1.5 rounded-lg text-muted hover:text-amber hover:bg-amber/10 transition-all"
                  title="Export JSON"
                >
                  <Download size={14} />
                </button>
                <button
                  onClick={() => { onDelete(item.id); toast.success('Deleted') }}
                  className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Product description */}
            <p className="font-body text-xs text-muted line-clamp-2 mb-3">{item.productDescription}</p>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="chip bg-accent/10 text-accent border border-accent/20 text-[10px]">
                {item.content?.instagram_captions?.length || 0} captions
              </span>
              <span className="chip bg-violet/10 text-violet-300 border border-violet/20 text-[10px]">
                {item.content?.ad_copy?.length || 0} ads
              </span>
              <span className="chip bg-amber/10 text-amber border border-amber/20 text-[10px]">
                {item.content?.reel_ideas?.length || 0} reels
              </span>
              <span className="chip bg-green-400/10 text-green-400 border border-green-400/20 text-[10px]">
                {item.content?.campaign_suggestions?.length || 0} campaigns
              </span>
            </div>

            {/* Audience */}
            <div className="flex items-center gap-1.5">
              <Tag size={11} className="text-muted" />
              <p className="font-body text-xs text-muted truncate">{item.targetAudience}</p>
            </div>

            {/* Analysis angle */}
            {item.analysis?.marketing_angle && (
              <div className="mt-3 p-2.5 bg-bg rounded-lg border border-border/50">
                <p className="font-body text-xs text-text/60 italic">"{item.analysis.marketing_angle}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
