import os
from fastapi import FastAPI
from database import engine, Base
from routes.auth import router as auth_router
from routes.ai_routes import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

# -------------------
# CREATE TABLES
# -------------------
Base.metadata.create_all(bind=engine)

# -------------------
# APP
# -------------------
app = FastAPI(
    title="AI Marketing Platform",
    version="1.0.0"
)

# -------------------
# CORS FIX
# -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------
# ROUTES
# -------------------
app.include_router(auth_router, prefix="/auth")
app.include_router(ai_router)

# -------------------
# ROOT
# -------------------
@app.get("/")
def root():
    return {"message": "AI Marketing Platform Running"}

@app.get("/test")
def test():
    return {"status": "working"}