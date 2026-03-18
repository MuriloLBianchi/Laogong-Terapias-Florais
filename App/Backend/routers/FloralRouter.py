from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from database.database import get_db
from models.FloralModel import Floral

router = APIRouter(prefix="/florais", tags=["Florais"])


# ── Schemas Pydantic ────────────────────────────────────────────────────────
class FloralBase(BaseModel):
    nome: str = Field(..., min_length=1, max_length=255, description="Nome da flor")
    descricao: Optional[str] = Field(None, max_length=1000, description="Descrição opcional")
    tipo: int = Field(..., description="Tipo do floral (Bach, Saint Germain, etc.)")

class FloralCreate(FloralBase):
    pass

class FloralUpdate(BaseModel):
    nome: Optional[str] = Field(None, min_length=1, max_length=255, description="Nome da flor")
    descricao: Optional[str] = Field(None, max_length=1000, description="Descrição opcional")
    tipo: Optional[int] = Field(None, description="Tipo do floral (Bach, Saint Germain, etc.)")

class FloralResponse(FloralBase):
    id: int
    nome: str
    descricao: Optional[str]
    tipo: int
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True


# ── Endpoints ───────────────────────────────────────────────────────────────
@router.get("/", response_model=List[FloralResponse], summary="Listar todas as flores")
def listar_flores(db: Session = Depends(get_db)):
    """Retorna todas as flores ordenadas pela mais recente."""
    flores = db.query(Floral).order_by(Floral.criado_em.desc()).all()
    return flores


@router.post("/", response_model=FloralResponse, status_code=status.HTTP_201_CREATED, summary="Inserir uma nova flor")
def inserir_flor(flor: FloralCreate, db: Session = Depends(get_db)):
    nova_flor = Floral(
        nome=flor.nome,
        descricao=flor.descricao,
        tipo=flor.tipo
    )

    db.add(nova_flor)
    db.commit()
    db.refresh(nova_flor)
    return nova_flor


@router.patch("/{floral_id}", response_model=FloralResponse, summary="Atualizar uma flor")
def atualizar_flor(floral_id: int, dados: FloralUpdate, db: Session = Depends(get_db)):
    """Atualiza os dados de uma flor existente."""
    flor = db.query(Floral).filter(Floral.id == floral_id).first()

    if not flor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flor com id {floral_id} não encontrada.",
        )

    flor.nome = dados.nome or flor.nome
    flor.descricao = dados.descricao or flor.descricao
    flor.tipo = dados.tipo or flor.tipo

    db.commit()
    db.refresh(flor)
    return flor


@router.delete("/{floral_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Deletar uma flor")
def deletar_flor(floral_id: int, db: Session = Depends(get_db)):
    """Remove uma flor do banco de dados."""
    flor = db.query(Floral).filter(Floral.id == floral_id).first()

    if not flor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flor com id {floral_id} não encontrada.",
        )

    db.delete(flor)
    db.commit()
    return None
