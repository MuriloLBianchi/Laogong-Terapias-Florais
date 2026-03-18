export function Navigation({ paginaAtual, onMudarPagina }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-item ${paginaAtual === "dashboard" ? "ativo" : ""}`}
        onClick={() => onMudarPagina("dashboard")}
        title="Início"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 3H21V21H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 7H11V12H3V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Início</span>
      </button>

      <button
        className={`nav-item ${paginaAtual === "florais" ? "ativo" : ""}`}
        onClick={() => onMudarPagina("florais")}
        title="Florais"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 2 8 8 8 12C8 15.3137 9.79086 18 12 18C14.2091 18 16 15.3137 16 12C16 8 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="21" r="1.5" fill="currentColor" />
        </svg>
        <span>Florais</span>
      </button>

      <button
        className={`nav-item ${paginaAtual === "tarefas" ? "ativo" : ""}`}
        onClick={() => onMudarPagina("tarefas")}
        title="Tarefas"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Tarefas</span>
      </button>
    </nav>
  );
}
