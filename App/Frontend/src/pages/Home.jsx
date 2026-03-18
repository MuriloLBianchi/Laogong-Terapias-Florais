import { useState, useEffect, useCallback } from "react";
import { tarefasApi } from "../service/api";
import { TarefaItem } from "../components/TarefaItem";
import { NovaTarefaForm } from "../components/NovaTarefaForm";

export function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [criando, setCriando] = useState(false);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("todas"); // 'todas' | 'pendentes' | 'concluidas'

  const carregarTarefas = useCallback(async () => {
    try {
      setErro(null);
      const dados = await tarefasApi.listar();
      setTarefas(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  async function handleCriar(dados) {
    setCriando(true);
    try {
      const nova = await tarefasApi.criar(dados);
      setTarefas((prev) => [nova, ...prev]);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCriando(false);
    }
  }

  async function handleToggle(id, concluida) {
    try {
      const atualizada = await tarefasApi.atualizar(id, concluida);
      setTarefas((prev) => prev.map((t) => (t.id === id ? atualizada : t)));
    } catch (err) {
      setErro(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await tarefasApi.deletar(id);
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setErro(err.message);
    }
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.filter((t) => !t.concluida).length;
  const progresso = tarefas.length > 0 ? (totalConcluidas / tarefas.length) * 100 : 0;

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="header-top">
          <div className="header-tag">lista de tarefas</div>
          <h1 className="app-title">
            Minhas<br />Tarefas
          </h1>
        </div>

        {tarefas.length > 0 && (
          <div className="stats-bar">
            <div className="stats">
              <span className="stat">
                <strong>{totalPendentes}</strong> pendentes
              </span>
              <span className="stat-divider" />
              <span className="stat concluida-stat">
                <strong>{totalConcluidas}</strong> concluídas
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progresso}%` }} />
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        <NovaTarefaForm onCriar={handleCriar} carregando={criando} />

        {erro && (
          <div className="erro-banner">
            <span>⚠ {erro}</span>
            <button onClick={() => setErro(null)}>×</button>
          </div>
        )}

        {tarefas.length > 0 && (
          <div className="filtros">
            {["todas", "pendentes", "concluidas"].map((f) => (
              <button
                key={f}
                className={`filtro-btn ${filtro === f ? "ativo" : ""}`}
                onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div className="lista-tarefas">
          {carregando ? (
            <div className="estado-vazio">
              <div className="loading-dots">
                <span /><span /><span />
              </div>
              <p>Carregando tarefas...</p>
            </div>
          ) : tarefasFiltradas.length === 0 ? (
            <div className="estado-vazio">
              <div className="vazio-icon">
                {filtro === "concluidas" ? "✓" : filtro === "pendentes" ? "○" : "✦"}
              </div>
              <p>
                {filtro === "todas"
                  ? "Nenhuma tarefa ainda. Adicione a primeira acima!"
                  : filtro === "pendentes"
                  ? "Nenhuma tarefa pendente."
                  : "Nenhuma tarefa concluída ainda."}
              </p>
            </div>
          ) : (
            tarefasFiltradas.map((tarefa) => (
              <TarefaItem
                key={tarefa.id}
                tarefa={tarefa}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
