import os
from fastapi import FastAPI
from database import engine, Base
from routes.auth import router as auth_router
from routes.ai_routes import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Marketing Platform",
    version="1.0.0"
)

# 🔥 TEMP SAFE CORS (fix all errors)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(ai_router)

@app.get("/")
def root():
    return {"message": "AI Marketing Platform Running"}

@app.get("/test")
def test():
    return {"status": "working"}