import React from 'react'
import { Zap, LayoutDashboard, Sparkles } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-xl text-text tracking-tight">
            Brand<span className="text-accent">Forge</span>
          </span>
        </div>

        {/* Nav tabs */}
        <nav className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'text-muted hover:text-text'
            }`}
          >
            <Sparkles size={14} />
            Create
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'text-muted hover:text-text'
            }`}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </button>
        </nav>

        {/* Status badge */}
        <div className="flex items-center gap-2 text-xs font-body text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          AI Ready
        </div>
      </div>
    </header>
  )
}
