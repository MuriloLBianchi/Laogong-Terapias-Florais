from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

from database import get_db
import models

router = APIRouter(prefix="/tarefas", tags=["Tarefas"])


# ── Schemas Pydantic ────────────────────────────────────────────────────────

class TarefaBase(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=255, description="Título da tarefa")
    descricao: Optional[str] = Field(None, max_length=1000, description="Descrição opcional")


class TarefaCreate(TarefaBase):
    pass


class TarefaUpdate(BaseModel):
    concluida: bool = Field(..., description="Status de conclusão da tarefa")


class TarefaResponse(TarefaBase):
    id: int
    concluida: bool
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True


# ── Endpoints ───────────────────────────────────────────────────────────────

@router.get("/", response_model=List[TarefaResponse], summary="Listar todas as tarefas")
def listar_tarefas(db: Session = Depends(get_db)):
    """Retorna todas as tarefas ordenadas pela mais recente."""
    tarefas = db.query(models.Tarefa).order_by(models.Tarefa.criado_em.desc()).all()
    return tarefas


@router.post(
    "/",
    response_model=TarefaResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar uma nova tarefa",
)
def criar_tarefa(tarefa: TarefaCreate, db: Session = Depends(get_db)):
    """Cria uma nova tarefa no banco de dados."""
    nova_tarefa = models.Tarefa(
        titulo=tarefa.titulo,
        descricao=tarefa.descricao,
    )
    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)
    return nova_tarefa


@router.patch("/{tarefa_id}", response_model=TarefaResponse, summary="Atualizar status da tarefa")
def atualizar_tarefa(tarefa_id: int, dados: TarefaUpdate, db: Session = Depends(get_db)):
    """Marca ou desmarca uma tarefa como concluída."""
    tarefa = db.query(models.Tarefa).filter(models.Tarefa.id == tarefa_id).first()

    if not tarefa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tarefa com id {tarefa_id} não encontrada.",
        )

    tarefa.concluida = dados.concluida
    db.commit()
    db.refresh(tarefa)
    return tarefa


@router.delete("/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Deletar uma tarefa")
def deletar_tarefa(tarefa_id: int, db: Session = Depends(get_db)):
    """Remove uma tarefa do banco de dados."""
    tarefa = db.query(models.Tarefa).filter(models.Tarefa.id == tarefa_id).first()

    if not tarefa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tarefa com id {tarefa_id} não encontrada.",
        )

    db.delete(tarefa)
    db.commit()
    return None
