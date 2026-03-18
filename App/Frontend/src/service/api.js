const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Wrapper genérico para chamadas à API.
 * Lança um erro com a mensagem do backend em caso de falha.
 */
async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMsg = `Erro ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  // 204 No Content não tem corpo
  if (response.status === 204) return null;

  return response.json();
}

// ── florais ──────────────────────────────────────────────────────────────────
export const floraisApi = {
  /** GET /florais/ — Lista todas as florais */
  listar: () => request("/florais/"),

  /** POST /florais/ — Insere uma nova flor */
  inserir: (dados) => request("/florais/", {method: "POST",body: JSON.stringify(dados), }),

  /** PATCH /florais/:id — Atualiza uma flor */
  atualizar: (id, dados) => request(`/florais/${id}`, {method: "PATCH", body: JSON.stringify(dados), }),

  /** DELETE /florais/:id — Remove uma flor */
  deletar: (id) => request(`/florais/${id}`, {method: "DELETE", }),
};


// ── Tarefas ──────────────────────────────────────────────────────────────────
export const tarefasApi = {
  /** GET /tarefas/ — Lista todas as tarefas */
  listar: () => request("/tarefas/"),

  /** POST /tarefas/ — Cria uma nova tarefa */
  criar: (dados) =>
    request("/tarefas/", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  /** PATCH /tarefas/:id — Alterna o status de conclusão */
  atualizar: (id, concluida) =>
    request(`/tarefas/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ concluida }),
    }),

  /** DELETE /tarefas/:id — Remove uma tarefa */
  deletar: (id) =>
    request(`/tarefas/${id}`, {
      method: "DELETE",
    }),
};