import { useState } from "react";
import { TIPOS_FLORAL } from "./NovoFloralForm";

export function FloralItem({ floral, onDelete, onAtualizar }) {
  const [deletando, setDeletando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(floral.nome);
  const [descricao, setDescricao] = useState(floral.descricao || "");
  const [tipo, setTipo] = useState(floral.tipo);
  const [salvando, setSalvando] = useState(false);

  const tipoInfo = TIPOS_FLORAL[floral.tipo] || { label: "Desconhecido", cor: "#999" };

  async function handleSalvar() {
    if (!nome.trim()) return;
    setSalvando(true);
    try {
      await onAtualizar(floral.id, {
        nome: nome.trim(),
        descricao: descricao.trim() || null,
        tipo: parseInt(tipo),
      });
      setEditando(false);
    } finally {
      setSalvando(false);
    }
  }

  async function handleDelete() {
    setDeletando(true);
    await onDelete(floral.id);
  }

  function handleCancel() {
    setNome(floral.nome);
    setDescricao(floral.descricao || "");
    setTipo(floral.tipo);
    setEditando(false);
  }

  const dataFormatada = new Date(floral.criado_em).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (editando) {
    return (
      <div className="floral-item editando">
        <div className="edit-form">
          <input
            type="text"
            className="edit-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do floral"
            maxLength={255}
          />
          <textarea
            className="edit-textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição (opcional)"
            maxLength={1000}
            rows={2}
          />
          <select
            className="edit-select"
            value={tipo}
            onChange={(e) => setTipo(parseInt(e.target.value))}
          >
            {Object.entries(TIPOS_FLORAL).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <div className="edit-buttons">
            <button
              className="btn-save"
              onClick={handleSalvar}
              disabled={salvando || !nome.trim()}
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button className="btn-cancel" onClick={handleCancel} disabled={salvando}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`floral-item ${deletando ? "saindo" : ""}`}>
      <div className="floral-badge" style={{ backgroundColor: tipoInfo.cor }}>
        {tipoInfo.label.charAt(0)}
      </div>

      <div className="floral-conteudo">
        <div className="floral-titulo">{floral.nome}</div>
        <div className="floral-tipo">{tipoInfo.label}</div>
        {floral.descricao && (
          <div className="floral-descricao">{floral.descricao}</div>
        )}
        <div className="floral-data">{dataFormatada}</div>
      </div>

      <div className="floral-acoes">
        <button
          className="btn-edit"
          onClick={() => setEditando(true)}
          disabled={deletando}
          aria-label="Editar floral"
          title="Editar"
        >
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13H3L10.5 5.5L8.5 3.5L1 11V13Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 3.5L11.5 0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={deletando}
          aria-label="Deletar floral"
          title="Deletar"
        >
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
