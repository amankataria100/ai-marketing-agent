import React, { useState, useCallback } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Navbar from './components/Navbar'
import UploadSection from './components/UploadSection'
import AnalysisCard from './components/AnalysisCard'
import ContentTabs from './components/ContentTabs'
import Dashboard from './components/Dashboard'
import LoadingState from './components/LoadingState'
import { analyzeProduct, generateContent } from './utils/api'
import { Save, RefreshCw, Download } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('create')
  const [loading, setLoading] = useState(false)
  const [loadStep, setLoadStep] = useState(0)
  const [analysis, setAnalysis] = useState(null)
  const [content, setContent] = useState(null)
  const [lastInput, setLastInput] = useState(null)
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bf_saved') || '[]') }
    catch { return [] }
  })

  const persistSaved = (arr) => {
    setSaved(arr)
    localStorage.setItem('bf_saved', JSON.stringify(arr))
  }

  const handleSubmit = useCallback(async ({ file, brandName, productDescription, targetAudience }) => {
    setLoading(true)
    setLoadStep(0)
    setAnalysis(null)
    setContent(null)
    setLastInput({ file, brandName, productDescription, targetAudience })

    try {
      // Step 1: Analyze
      toast.loading('Analyzing product...', { id: 'gen' })
      const analysisResult = await analyzeProduct({ file, brandName, productDescription, targetAudience })
      setAnalysis(analysisResult)
      setLoadStep(1)

      // Step 2: Generate
      toast.loading('Generating content...', { id: 'gen' })
      const contentResult = await generateContent({ file, brandName, productDescription, targetAudience, analysis: analysisResult })
      setContent(contentResult)
      setLoadStep(2)

      toast.success('Content ready!', { id: 'gen' })
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || 'Something went wrong'
      toast.error(msg, { id: 'gen' })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSave = () => {
    if (!analysis || !content || !lastInput) return
    const entry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      brandName: lastInput.brandName,
      productDescription: lastInput.productDescription,
      targetAudience: lastInput.targetAudience,
      analysis,
      content,
    }
    const updated = [entry, ...saved]
    persistSaved(updated)
    toast.success('Saved to dashboard!')
  }

  const handleDelete = (id) => {
    persistSaved(saved.filter((s) => s.id !== id))
  }

  const handleView = (item) => {
    setAnalysis(item.analysis)
    setContent(item.content)
    setLastInput({ brandName: item.brandName, productDescription: item.productDescription, targetAudience: item.targetAudience })
    setActiveTab('create')
  }

  const handleReset = () => {
    setAnalysis(null)
    setContent(null)
    setLastInput(null)
    setLoading(false)
  }

  const showResults = analysis && content && !loading

  return (
    <div className="min-h-screen bg-bg">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#0E0E1C', color: '#EEEEFF', border: '1px solid #1C1C2E', fontFamily: 'Outfit, sans-serif', fontSize: '13px' },
          success: { iconTheme: { primary: '#FF5F1F', secondary: '#0E0E1C' } },
        }}
      />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet/5 blur-[100px]" />
      </div>

      {activeTab === 'dashboard' ? (
        <Dashboard saved={saved} onDelete={handleDelete} onView={handleView} />
      ) : (
        <>
          {/* Show upload form unless we're loading or have results */}
          {!loading && !showResults && (
            <UploadSection onSubmit={handleSubmit} loading={loading} />
          )}

          {/* Loading state */}
          {loading && <LoadingState step={loadStep} />}

          {/* Results */}
          {showResults && (
            <div className="animate-fade-in">
              {/* Action bar */}
              <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-2xl">
                  <div>
                    <p className="font-display font-semibold text-text text-sm">{lastInput?.brandName}</p>
                    <p className="font-body text-xs text-muted">{lastInput?.targetAudience}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSave} className="btn-ghost flex items-center gap-1.5 text-xs py-2">
                      <Save size={13} />
                      Save
                    </button>
                    <button onClick={handleReset} className="btn-ghost flex items-center gap-1.5 text-xs py-2">
                      <RefreshCw size={13} />
                      New
                    </button>
                  </div>
                </div>
              </div>

              <AnalysisCard analysis={analysis} />
              <ContentTabs content={content} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
