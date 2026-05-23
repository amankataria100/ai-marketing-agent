from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from groq import Groq
import json
import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Marketing Agent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"


def clean_json(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        parts = text.split("```")
        text = parts[1]
        if text.startswith("json"):
            text = text[4:]
    return text.strip()


@app.get("/")
def root():
    return {"status": "AI Marketing Agent API is running", "version": "1.0.0"}


@app.post("/api/analyze")
async def analyze_product(
    file: Optional[UploadFile] = File(None),
    brand_name: str = Form(...),
    product_description: str = Form(...),
    target_audience: str = Form(...),
):
    prompt = f"""You are a senior marketing strategist with 15 years of brand analysis experience.
Analyze this product and return ONLY a valid JSON object — no markdown, no explanation, no extra text.

Inputs:
- Brand: {brand_name}
- Product Description: {product_description}
- Target Audience: {target_audience}

Return exactly this JSON structure:
{{
  "product_category": "specific product category",
  "brand_tone": "2-3 adjectives describing ideal brand voice",
  "key_differentiators": ["differentiator 1", "differentiator 2", "differentiator 3"],
  "audience_insights": [
    {{"insight": "observation about audience", "implication": "what this means for marketing"}},
    {{"insight": "observation about audience", "implication": "what this means for marketing"}},
    {{"insight": "observation about audience", "implication": "what this means for marketing"}}
  ],
  "platform_recommendations": [
    {{"platform": "platform name", "reason": "why this platform fits", "content_type": "best content format here", "priority": "high"}},
    {{"platform": "platform name", "reason": "why this platform fits", "content_type": "best content format here", "priority": "medium"}},
    {{"platform": "platform name", "reason": "why this platform fits", "content_type": "best content format here", "priority": "low"}}
  ],
  "marketing_angle": "One powerful positioning sentence that captures the brand unique value",
  "color_psychology": "Brief note on colors and aesthetics that would resonate with this audience",
  "competitor_gap": "One key opportunity this brand can exploit vs typical competitors"
}}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}]
        )
        text = clean_json(response.choices[0].message.content)
        result = json.loads(text)
        return JSONResponse(content=result)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"AI returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate")
async def generate_content(
    file: Optional[UploadFile] = File(None),
    brand_name: str = Form(...),
    product_description: str = Form(...),
    target_audience: str = Form(...),
    analysis: str = Form(...),
):
    try:
        analysis_data = json.loads(analysis)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid analysis JSON")

    prompt = f"""You are an award-winning creative marketing copywriter. Your copy is punchy, emotional, and drives action.
Generate comprehensive marketing content. Return ONLY a valid JSON object — no markdown, no preamble.

Context:
- Brand: {brand_name}
- Product: {product_description}
- Audience: {target_audience}
- Brand Tone: {analysis_data.get("brand_tone", "professional")}
- Marketing Angle: {analysis_data.get("marketing_angle", "")}
- Key Differentiators: {", ".join(analysis_data.get("key_differentiators", []))}

Return exactly this JSON:
{{
  "instagram_captions": [
    {{"caption": "full caption with emojis", "style": "storytelling", "estimated_engagement": "high"}},
    {{"caption": "full caption with emojis", "style": "punchy", "estimated_engagement": "high"}},
    {{"caption": "full caption with emojis", "style": "question-hook", "estimated_engagement": "medium"}}
  ],
  "ad_copy": [
    {{"headline": "short punchy headline", "body": "2-3 sentence ad body", "platform": "Instagram", "objective": "awareness"}},
    {{"headline": "short punchy headline", "body": "2-3 sentence ad body", "platform": "Google", "objective": "conversion"}},
    {{"headline": "short punchy headline", "body": "2-3 sentence ad body", "platform": "Facebook", "objective": "engagement"}}
  ],
  "hooks": [
    {{"text": "hook text", "type": "pain-point"}},
    {{"text": "hook text", "type": "curiosity"}},
    {{"text": "hook text", "type": "bold-claim"}},
    {{"text": "hook text", "type": "question"}},
    {{"text": "hook text", "type": "story"}}
  ],
  "cta_suggestions": [
    {{"text": "CTA text", "urgency": "high", "context": "when to use this"}},
    {{"text": "CTA text", "urgency": "high", "context": "when to use this"}},
    {{"text": "CTA text", "urgency": "medium", "context": "when to use this"}},
    {{"text": "CTA text", "urgency": "low", "context": "when to use this"}}
  ],
  "hashtags": {{
    "branded": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "niche": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
    "trending": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4"]
  }},
  "reel_ideas": [
    {{"title": "reel title", "concept": "full concept description", "hook": "opening 3 seconds script", "duration": "30s", "vibe": "entertaining"}},
    {{"title": "reel title", "concept": "full concept description", "hook": "opening 3 seconds script", "duration": "15s", "vibe": "educational"}},
    {{"title": "reel title", "concept": "full concept description", "hook": "opening 3 seconds script", "duration": "60s", "vibe": "inspiring"}}
  ],
  "carousel_ideas": [
    {{"title": "carousel title", "slides": ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5 CTA"], "objective": "educate", "cover_hook": "cover slide text"}},
    {{"title": "carousel title", "slides": ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5 CTA"], "objective": "convert", "cover_hook": "cover slide text"}}
  ],
  "campaign_suggestions": [
    {{"name": "campaign name", "concept": "2-3 sentence concept", "platforms": ["Instagram", "YouTube"], "duration": "4 weeks", "key_message": "core message", "content_pillars": ["pillar1", "pillar2", "pillar3"]}},
    {{"name": "campaign name", "concept": "2-3 sentence concept", "platforms": ["Instagram", "Facebook"], "duration": "2 weeks", "key_message": "core message", "content_pillars": ["pillar1", "pillar2", "pillar3"]}}
  ]
}}"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            max_tokens=3500,
            messages=[{"role": "user", "content": prompt}]
        )
        text = clean_json(response.choices[0].message.content)
        result = json.loads(text)
        return JSONResponse(content=result)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"AI returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))