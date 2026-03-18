import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database.database import Base, engine
from models.FloralModel import Base
from routers.FloralRouter import router as FloralRouter

load_dotenv()

# ── Criação das tabelas ──────────────────────────────────────────────────────
Base.metadata.create_all(bind=engine)

# ── Instância FastAPI ────────────────────────────────────────────────────────
app = FastAPI(
    title="Laogong Terapias - Florais API",
    description="Backend da aplicação Laogong Terapias - Florais API com FastAPI + PostgreSQL",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──────────────────────────────────────────────────────────────────
app.include_router(FloralRouter)

# ── Health check ─────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "mensagem": "API de Florais rodando com sucesso!"}


# ── Ponto de entrada (dev local) ─────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
