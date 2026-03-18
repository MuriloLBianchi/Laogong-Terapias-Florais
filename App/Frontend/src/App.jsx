import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Florais } from "./pages/Florais";
import { Home } from "./pages/Home";
import { Navigation } from "./components/Navigation";
import "./index.css";

export default function App() {
  const [pagina, setPagina] = useState("dashboard");

  return (
    <div className="app-wrapper">
      {pagina === "dashboard" && <Dashboard />}
      {pagina === "florais" && <Florais />}
      {pagina === "tarefas" && <Home />}
      
      <Navigation paginaAtual={pagina} onMudarPagina={setPagina} />
    </div>
  );
}
