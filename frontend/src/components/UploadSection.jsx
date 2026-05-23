import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image, Sparkles, ChevronRight, Loader2 } from 'lucide-react'

export default function UploadSection({ onSubmit, loading }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
    brandName: '',
    productDescription: '',
    targetAudience: '',
  })

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.brandName || !form.productDescription || !form.targetAudience) return
    onSubmit({ file, ...form })
  }

  const isValid = form.brandName && form.productDescription && form.targetAudience

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-5">
          <Sparkles size={13} className="text-accent" />
          <span className="text-xs font-body font-medium text-accent tracking-wide">Powered by Claude AI</span>
        </div>
        <h1 className="font-display font-bold text-5xl text-text mb-4 leading-tight">
          Turn Products Into<br />
          <span className="gradient-text">Marketing Magic</span>
        </h1>
        <p className="font-body text-muted text-lg max-w-xl mx-auto">
          Upload your product, add brand details, and get AI-crafted captions, ad copy, campaign strategies, and more — in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — Image Upload */}
        <div className="lg:col-span-2">
          <label className="label">Product Image</label>
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden border border-border group">
              <img src={preview} alt="Product" className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => { setFile(null); setPreview(null) }}
                  className="p-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 hover:bg-red-500/30 transition"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-bg/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                  <Image size={13} className="text-accent" />
                  <span className="text-xs font-body text-text truncate">{file?.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-accent bg-accent/5 scale-[1.01]'
                  : 'border-border hover:border-accent/50 hover:bg-surface/50 bg-surface/30'
              }`}
            >
              <input {...getInputProps()} />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isDragActive ? 'bg-accent' : 'bg-border'}`}>
                <Upload size={22} className={isDragActive ? 'text-white' : 'text-muted'} />
              </div>
              <p className="font-body font-medium text-text text-sm">
                {isDragActive ? 'Drop it here!' : 'Drag & drop image'}
              </p>
              <p className="font-body text-xs text-muted mt-1">or click to browse</p>
              <p className="font-body text-xs text-muted/50 mt-3">JPG, PNG, WEBP</p>
            </div>
          )}
          <p className="text-xs text-muted mt-2 font-body">
            Optional — AI will analyze visual cues for better insights
          </p>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div>
            <label className="label">Brand Name *</label>
            <input
              type="text"
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              placeholder="e.g. Zara, Nykaa, boAt"
              className="input"
            />
          </div>

          <div>
            <label className="label">Product Description *</label>
            <textarea
              name="productDescription"
              value={form.productDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product — what it is, what it does, key features, unique selling points..."
              className="textarea"
            />
          </div>

          <div>
            <label className="label">Target Audience *</label>
            <input
              type="text"
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="e.g. Gen Z women aged 18–25 interested in sustainable fashion"
              className="input"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="btn-primary flex items-center justify-center gap-2 mt-auto"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Marketing Content</span>
                <ChevronRight size={16} />
              </>
            )}
          </button>

          {/* Steps indicator */}
          <div className="flex items-center gap-3 pt-2">
            {['Analyze Product', 'Generate Content', 'Export & Use'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-display font-bold ${i === 0 ? 'bg-accent text-white' : 'bg-border text-muted'}`}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-body text-muted">{step}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-border" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
