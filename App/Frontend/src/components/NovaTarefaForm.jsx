import { useState } from "react";

export function NovaTarefaForm({ onCriar, carregando }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [expandido, setExpandido] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    await onCriar({ titulo: titulo.trim(), descricao: descricao.trim() || null });
    setTitulo("");
    setDescricao("");
    setExpandido(false);
  }

  return (
    <form className="nova-tarefa-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="input-titulo"
          placeholder="Nova tarefa..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onFocus={() => setExpandido(true)}
          maxLength={255}
          disabled={carregando}
          required
        />
        <button type="submit" className="btn-adicionar" disabled={carregando || !titulo.trim()}>
          {carregando ? (
            <span className="spinner" />
          ) : (
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div className={`descricao-wrapper ${expandido ? "visivel" : ""}`}>
        <input
          type="text"
          className="input-descricao"
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          maxLength={1000}
          disabled={carregando}
          tabIndex={expandido ? 0 : -1}
        />
      </div>
    </form>
  );
}
