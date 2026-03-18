import { useState, useEffect } from "react";
import { floraisApi } from "../service/api";

export function Dashboard() {
  const [totalFlorais, setTotalFlorais] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setErro(null);
      const florais = await floraisApi.listar();
      setTotalFlorais(Array.isArray(florais) ? florais.length : 0);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="page-container">
      <header className="app-header">
        <div className="header-top">
          <div className="header-tag">bem-vindo</div>
          <h1 className="app-title">
            Laogong<br />Terapias Florais
          </h1>
        </div>
      </header>

      <main className="app-main">
        {erro && (
          <div className="erro-banner">
            <span>⚠ {erro}</span>
            <button onClick={() => setErro(null)}>×</button>
          </div>
        )}

        {carregando ? (
          <div className="estado-vazio">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p>Carregando...</p>
          </div>
        ) : (
          <>
            <div className="dashboard-cards">
              <div className="card">
                <div className="card-icon">🌸</div>
                <div className="card-content">
                  <div className="card-number">{totalFlorais}</div>
                  <div className="card-label">Florais Cadastrados</div>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">💚</div>
                <div className="card-content">
                  <div className="card-number">Bem-estar</div>
                  <div className="card-label">Seu objetivo</div>
                </div>
              </div>

              <div className="card">
                <div className="card-icon">✨</div>
                <div className="card-content">
                  <div className="card-number">Natureza</div>
                  <div className="card-label">Nossa essência</div>
                </div>
              </div>
            </div>

            <div className="como-usar">
              <h2 className="secao-titulo">Como Usar</h2>
              <div className="passos">
                <div className="passo">
                  <div className="passo-numero">1</div>
                  <div className="passo-conteudo">
                    <div className="passo-titulo">Explore</div>
                    <div className="passo-desc">Navegue pelos florais disponíveis</div>
                  </div>
                </div>

                <div className="passo">
                  <div className="passo-numero">2</div>
                  <div className="passo-conteudo">
                    <div className="passo-titulo">Descubra</div>
                    <div className="passo-desc">Conheça os benefícios de cada floral</div>
                  </div>
                </div>

                <div className="passo">
                  <div className="passo-numero">3</div>
                  <div className="passo-conteudo">
                    <div className="passo-titulo">Transforme</div>
                    <div className="passo-desc">Integre em sua rotina de bem-estar</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
