import React from 'react'
import { Loader2, Check, Brain, Sparkles, FileText } from 'lucide-react'

const STEPS = [
  { icon: Brain, label: 'Analyzing product & brand identity' },
  { icon: Sparkles, label: 'Crafting captions, ad copy & hooks' },
  { icon: FileText, label: 'Building campaign & reel strategies' },
]

export default function LoadingState({ step = 0 }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      <div className="card max-w-md mx-auto text-center py-10">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-border" />
          <div className="absolute inset-0 rounded-full border-4 border-t-accent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={20} className="text-accent" />
          </div>
        </div>

        <h3 className="font-display font-bold text-lg text-text mb-1">AI is working</h3>
        <p className="font-body text-sm text-muted mb-8">This takes about 10–20 seconds</p>

        <div className="space-y-3 text-left">
          {STEPS.map(({ icon: Icon, label }, i) => {
            const done = i < step
            const active = i === step
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                done ? 'border-green-400/20 bg-green-400/5' :
                active ? 'border-accent/30 bg-accent/5' :
                'border-border bg-surface/30'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? 'bg-green-400/20' : active ? 'bg-accent/20' : 'bg-border'
                }`}>
                  {done ? (
                    <Check size={13} className="text-green-400" />
                  ) : active ? (
                    <Loader2 size={13} className="text-accent animate-spin" />
                  ) : (
                    <Icon size={13} className="text-muted" />
                  )}
                </div>
                <span className={`font-body text-sm ${done ? 'text-green-400' : active ? 'text-text' : 'text-muted'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
