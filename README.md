# BrandForge — AI Marketing Agent

> Turn product images and brand details into complete, ready-to-use marketing content — powered by Claude AI.

![BrandForge](https://img.shields.io/badge/AI-Claude%20Sonnet-FF5F1F?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20FastAPI-7C3AED?style=for-the-badge)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Product Upload** | Drag-and-drop image upload with brand details form |
| 🧠 **AI Product Analysis** | Brand tone, audience insights, platform strategy, competitor gap analysis |
| ✍️ **Content Generator** | Instagram captions (3 styles), ad copy (3 platforms), 5 scroll-stopping hooks, 4 CTAs |
| #️⃣ **Hashtag Sets** | Branded, niche, and trending hashtag bundles |
| 🎬 **Reel Ideas** | 3 reel concepts with hooks and duration |
| 🃏 **Carousel Ideas** | Slide-by-slide carousel scripts with objectives |
| 🚀 **Campaign Strategies** | Full campaign concepts with content pillars |
| 💾 **Dashboard** | Save, view, export (JSON), and delete past outputs |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite + Tailwind CSS + Framer Motion |
| **Backend** | FastAPI (Python) + Uvicorn |
| **AI** | Anthropic Claude (claude-sonnet-4-6 / claude-opus-4-6) |
| **File Handling** | python-multipart, base64 image encoding |
| **State** | React useState + localStorage persistence |

---

## 🤖 AI Workflow

```
User Input
    │
    ▼
┌─────────────────────────────────────┐
│  STEP 1: Product Analysis (Vision)  │
│  • Image + brand details → Claude   │
│  • Returns: product_category,       │
│    brand_tone, audience_insights,   │
│    platform_recommendations,        │
│    marketing_angle, competitor_gap  │
└─────────────────────────────────────┘
    │  Analysis context
    ▼
┌─────────────────────────────────────┐
│  STEP 2: Content Generation         │
│  • Analysis + inputs → Claude       │
│  • Returns: captions, ad_copy,      │
│    hooks, ctas, hashtags, reels,    │
│    carousels, campaign_suggestions  │
└─────────────────────────────────────┘
    │
    ▼
Dashboard (localStorage persistence)
```

**Key AI design decisions:**
- **Two-step pipeline**: Analysis is separated from generation so the content is grounded in real insights, not just raw inputs.
- **Vision-enabled**: When an image is provided, Claude analyzes visual cues (packaging, colors, product type) to enhance all outputs.
- **Structured JSON outputs**: Both API calls force Claude to return strict JSON schemas — no ambiguity, reliable parsing.
- **Context chaining**: Step 2 receives Step 1's `brand_tone` and `marketing_angle` as context, ensuring content consistency.
- **Model**: `claude-sonnet-4-6` (fast + high quality). Swap to `claude-opus-4-6` in `backend/main.py` for even richer outputs.

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Anthropic API key ([get one here](https://console.anthropic.com))

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ai-marketing-agent
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
Swagger docs at: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
ai-marketing-agent/
├── backend/
│   ├── main.py              # FastAPI app with /api/analyze and /api/generate
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── App.jsx           # Main orchestration + state
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── UploadSection.jsx   # Drag-drop + form
    │   │   ├── AnalysisCard.jsx    # AI analysis display
    │   │   ├── ContentTabs.jsx     # 8-tab content viewer
    │   │   ├── Dashboard.jsx       # Saved outputs
    │   │   └── LoadingState.jsx    # 3-step pipeline indicator
    │   └── utils/
    │       └── api.js              # Axios API calls
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🔌 API Reference

### `POST /api/analyze`
Analyzes product image + details. Returns structured brand insights.

**Form fields:** `file` (optional), `brand_name`, `product_description`, `target_audience`

**Response:**
```json
{
  "product_category": "string",
  "brand_tone": "string",
  "key_differentiators": ["..."],
  "audience_insights": [{"insight": "...", "implication": "..."}],
  "platform_recommendations": [{"platform": "...", "reason": "...", "content_type": "...", "priority": "high/medium/low"}],
  "marketing_angle": "string",
  "color_psychology": "string",
  "competitor_gap": "string"
}
```

### `POST /api/generate`
Generates all marketing content using analysis context.

**Form fields:** `file` (optional), `brand_name`, `product_description`, `target_audience`, `analysis` (JSON string)

**Response:** Full content bundle (captions, ads, hooks, CTAs, hashtags, reels, carousels, campaigns)

---

## 🗺️ Future Improvements

- [ ] **Video support** — analyze product videos via frame extraction
- [ ] **Multi-language** — generate content in Hindi, Tamil, etc. for Indian markets
- [ ] **Tone customization** — let users fine-tune the brand voice before generating
- [ ] **One-click export** — export all content as a formatted PDF/DOCX brand kit
- [ ] **A/B variant scoring** — AI scores each caption/ad for estimated performance
- [ ] **Scheduler integration** — connect to Buffer/Hootsuite to schedule posts directly
- [ ] **Brand memory** — save brand profiles to reuse across sessions
- [ ] **Streaming responses** — stream Claude's output token-by-token for live UX

---

## 🛠️ Switching AI Models

In `backend/main.py`, change the `MODEL` variable:

```python
MODEL = "claude-sonnet-4-6"   # Fast, great quality (default)
MODEL = "claude-opus-4-6"     # Slower, highest quality
```

You can also swap to Gemini or OpenAI by replacing the `client.messages.create()` calls.

---

Built with ❤️ for the Vaij & Company assignment.
