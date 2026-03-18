import { useState, useEffect, useCallback } from "react";
import { floraisApi } from "../service/api";
import { FloralItem } from "../components/FloralItem";
import { NovoFloralForm } from "../components/NovoFloralForm";

export function Florais() {
  const [florais, setFlorais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [criando, setCriando] = useState(false);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  const carregarFlorais = useCallback(async () => {
    try {
      setErro(null);
      const dados = await floraisApi.listar();
      setFlorais(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarFlorais();
  }, [carregarFlorais]);

  async function handleCriar(dados) {
    setCriando(true);
    try {
      const novo = await floraisApi.inserir(dados);
      setFlorais((prev) => [novo, ...prev]);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCriando(false);
    }
  }

  async function handleDelete(id) {
    try {
      await floraisApi.deletar(id);
      setFlorais((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleAtualizar(id, dados) {
    try {
      const atualizado = await floraisApi.atualizar(id, dados);
      setFlorais((prev) => prev.map((f) => (f.id === id ? atualizado : f)));
    } catch (err) {
      setErro(err.message);
    }
  }

  const floraiFiltrados = florais.filter((f) => {
    const termo = busca.toLowerCase();
    return (
      f.nome.toLowerCase().includes(termo) ||
      (f.descricao && f.descricao.toLowerCase().includes(termo))
    );
  });

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="header-top">
          <div className="header-tag">conheça</div>
          <h1 className="app-title">
            Nossos<br />Florais
          </h1>
        </div>

        {florais.length > 0 && (
          <div className="stats-bar">
            <div className="stat">
              <strong>{florais.length}</strong> florais
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        <NovoFloralForm onCriar={handleCriar} carregando={criando} />

        {erro && (
          <div className="erro-banner">
            <span>⚠ {erro}</span>
            <button onClick={() => setErro(null)}>×</button>
          </div>
        )}

        {florais.length > 0 && (
          <div className="buscador">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="input-busca"
              placeholder="Buscar florais..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        )}

        <div className="lista-florais">
          {carregando ? (
            <div className="estado-vazio">
              <div className="loading-dots">
                <span /><span /><span />
              </div>
              <p>Carregando florais...</p>
            </div>
          ) : floraiFiltrados.length === 0 ? (
            <div className="estado-vazio">
              <div className="vazio-icon">🌸</div>
              <p>
                {busca
                  ? `Nenhum floral encontrado para "${busca}"`
                  : "Nenhum floral cadastrado ainda. Crie o primeiro acima!"}
              </p>
            </div>
          ) : (
            floraiFiltrados.map((floral) => (
              <FloralItem
                key={floral.id}
                floral={floral}
                onDelete={handleDelete}
                onAtualizar={handleAtualizar}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
