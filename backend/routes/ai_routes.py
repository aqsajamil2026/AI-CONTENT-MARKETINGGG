from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from auth import get_current_user
from groq import Groq
import os

router = APIRouter(prefix="/ai")

# 🔥 FIX: direct env use (NO load_dotenv needed on HF)
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("WARNING: GROQ_API_KEY is missing!")

client = Groq(api_key=api_key)


class PromptRequest(BaseModel):
    prompt: str


def ask_ai(user_prompt: str):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"AI Error: {str(e)}"


@router.post("/generate-caption")
async def generate_caption(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Generate an engaging social media caption for: {data.prompt}"
    return {"caption": ask_ai(prompt)}


@router.post("/generate-blog")
async def generate_blog(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Write a detailed blog post about: {data.prompt}"
    return {"blog": ask_ai(prompt)}


@router.post("/generate-hashtags")
async def generate_hashtags(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Generate 20 trending hashtags for: {data.prompt}"
    return {"hashtags": ask_ai(prompt)}


@router.post("/generate-seo")
async def generate_seo(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Generate 15 SEO keywords for: {data.prompt}"
    return {"keywords": ask_ai(prompt)}


@router.post("/generate-email")
async def generate_email(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Write a professional marketing email for: {data.prompt}"
    return {"email": ask_ai(prompt)}


@router.post("/generate-ad-copy")
async def generate_ad_copy(data: PromptRequest, user=Depends(get_current_user)):
    prompt = f"Generate high-converting ad copy for: {data.prompt}"
    return {"ad_copy": ask_ai(prompt)}