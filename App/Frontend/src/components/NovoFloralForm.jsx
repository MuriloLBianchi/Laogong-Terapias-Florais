import { useState } from "react";

const TIPOS_FLORAL = {
  1: { label: "Bach", cor: "#ff6b6b" },
  2: { label: "Saint Germain", cor: "#4ecdc4" },
  3: { label: "Deva", cor: "#95e1d3" },
  4: { label: "Californiano", cor: "#f38181" },
  5: { label: "Australiano", cor: "#ffc93c" },
};

export function NovoFloralForm({ onCriar, carregando }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("1");
  const [expandido, setExpandido] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    await onCriar({
      nome: nome.trim(),
      descricao: descricao.trim() || null,
      tipo: parseInt(tipo),
    });
    setNome("");
    setDescricao("");
    setTipo("1");
    setExpandido(false);
  }

  return (
    <form className="novo-floral-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="input-nome"
          placeholder="Nome do floral..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onFocus={() => setExpandido(true)}
          maxLength={255}
          disabled={carregando}
          required
        />
        <button type="submit" className="btn-adicionar" disabled={carregando || !nome.trim()}>
          {carregando ? (
            <span className="spinner" />
          ) : (
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div className={`detalhes-wrapper ${expandido ? "visivel" : ""}`}>
        <div className="tipo-select">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={carregando}
          >
            {Object.entries(TIPOS_FLORAL).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

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

export { TIPOS_FLORAL };
