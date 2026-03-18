import { useState } from "react";

export function TarefaItem({ tarefa, onToggle, onDelete }) {
  const [deletando, setDeletando] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    setToggling(true);
    await onToggle(tarefa.id, !tarefa.concluida);
    setToggling(false);
  }

  async function handleDelete() {
    setDeletando(true);
    await onDelete(tarefa.id);
    // se o componente for desmontado, não precisamos resetar
  }

  const dataFormatada = new Date(tarefa.criado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`tarefa-item ${tarefa.concluida ? "concluida" : ""} ${deletando ? "saindo" : ""}`}>
      <button
        className={`toggle-btn ${tarefa.concluida ? "checked" : ""}`}
        onClick={handleToggle}
        disabled={toggling}
        aria-label={tarefa.concluida ? "Desmarcar tarefa" : "Marcar como concluída"}
      >
        {tarefa.concluida && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="tarefa-conteudo">
        <span className="tarefa-titulo">{tarefa.titulo}</span>
        {tarefa.descricao && (
          <span className="tarefa-descricao">{tarefa.descricao}</span>
        )}
        <span className="tarefa-data">{dataFormatada}</span>
      </div>

      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={deletando}
        aria-label="Deletar tarefa"
      >
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
