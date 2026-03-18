# 🧪 Guia de Testes Locais - Laogong Terapias Florais

Este documento descreve como testar o projeto **Laogong Terapias Florais** em seu ambiente local.

---

## 📋 Pré-requisitos

Verifique se você tem instalado:

- **Python 3.9+**
- **Node.js 16+** e **npm**
- **Git** (opcional, para clonar repositórios)

### Verificar instalações

```bash
# Verificar Python
python --version

# Verificar Node.js
node --version

# Verificar npm
npm --version
```

---

## 🔧 Setup Inicial

### 1. Estrutura do Projeto

```
Laogong Terapias Florais/
├── App/
│   ├── Backend/          # API Python (FastAPI)
│   └── Frontend/         # Interface React
├── TESTING.md            # Este arquivo
└── SETUP.md              # Instruções de instalação
```

---

## 🚀 Passo 1: Configurar o Backend

### 1.1 Navegar até a pasta do Backend

```bash
cd "App/Backend"
```

### 1.2 Criar ambiente virtual Python

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```bash
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

### 1.3 Instalar dependências

```bash
pip install -r requirements.txt
```

### 1.4 Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `Backend/`:

```env
# Database
DATABASE_URL=sqlite:///./laogong.db

# API
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=True
```

> **Nota**: O arquivo `.env.example` pode servir como referência.

### 1.5 Inicializar o banco de dados

```bash
# Python já cria o banco automaticamente ao iniciar a aplicação
# Se quiser resetar o banco, delete o arquivo laogong.db
```

### 1.6 Iniciar o servidor Backend

```bash
python main.py
```

**Saída esperada:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

✅ **Backend rodando em:** `http://localhost:8000`

> 📚 **Documentação interativa:** http://localhost:8000/docs (Swagger UI)

---

## 🎨 Passo 2: Configurar o Frontend

### 2.1 Abrir novo terminal e navegar até Frontend

```bash
cd "App/Frontend"
```

### 2.2 Instalar dependências Node.js

```bash
npm install
```

### 2.3 Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `Frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

> **Nota**: O arquivo `.env.example` pode servir como referência.

### 2.4 Iniciar servidor de desenvolvimento

```bash
npm run dev
```

**Saída esperada:**
```
  VITE v4.x.x  dev server running at:

  > Local:    http://localhost:5173/
```

✅ **Frontend rodando em:** `http://localhost:5173`

---

## ✅ Testando a Aplicação

### 3.1 Acessar a aplicação

Abra seu navegador e acesse: **http://localhost:5173**

### 3.2 Navegação Básica

A aplicação possui **3 páginas** acessíveis pela navegação inferior:

1. **🏠 Início (Dashboard)**
   - Bem-vindo temático
   - Cards informativos
   - Guia "Como Usar"

2. **🌸 Florais**
   - Listar florais cadastrados
   - Criar novo floral
   - Buscar por nome/descrição
   - Editar floral
   - Deletar floral

3. **✓ Tarefas**
   - Gerenciador de tarefas
   - Filtros (todas, pendentes, concluídas)
   - Criar, completar, deletar tarefas

---

## 🧬 Testando Funcionalidades - Passo a Passo

### 3.3 Teste 1: Criar um Floral

**Passos:**

1. Acesse a página **Florais** (clique no ícone 🌸)
2. No formulário superior, preencha:
   - **Nome**: Ex: "Floral de Bach - Clematis"
   - Clique em expandir para adicionar:
   - **Tipo**: Selecione "Bach"
   - **Descrição**: Ex: "Floral para dispersos, desatentos"
3. Clique no botão **+** (adicionar)

**Resultado esperado**: O floral aparece na lista abaixo

### 3.4 Teste 2: Buscar Floral

**Passos:**

1. Na página **Florais**, digite na barra de busca
2. Ex: "Bach" ou "clematis"
3. A lista se filtra em tempo real

**Resultado esperado**: Apenas florais que contêm o termo são exibidos

### 3.5 Teste 3: Editar Floral

**Passos:**

1. Na lista de florais, passe o mouse sobre um item
2. Clique no ícone **✏️ (lápis)** que aparece
3. Modifique os dados no formulário modal
4. Clique em **Salvar**

**Resultado esperado**: Floral atualizado na lista

### 3.6 Teste 4: Deletar Floral

**Passos:**

1. Na lista de florais, passe o mouse sobre um item
2. Clique no ícone **✕ (fechar)**
3. O floral some com animação

**Resultado esperado**: Floral removido da lista

### 3.7 Dashboard - Verificar Contador

**Passos:**

1. Acesse a página **Início** (Dashboard)
2. Observe o card "Florais Cadastrados"
3. Ele deve refletir o número total de florais

**Resultado esperado**: O número atualiza conforme você cria/deleta florais

---

## 🔌 Testando a API Diretamente

### 4.1 Usando Swagger UI

1. Acesse: **http://localhost:8000/docs**
2. Expanda os endpoints `/florais/`
3. Clique em **Try it out** para testar

### 4.2 Endpoints Disponíveis

**Florais:**

```
GET    /florais/              # Listar todos
POST   /florais/              # Criar novo
PATCH  /florais/{id}         # Atualizar
DELETE /florais/{id}         # Deletar
```

**Tarefas:**

```
GET    /tarefas/              # Listar todos
POST   /tarefas/              # Criar nova
PATCH  /tarefas/{id}         # Atualizar
DELETE /tarefas/{id}         # Deletar
```

### 4.3 Exemplo com cURL (Windows PowerShell)

**Listar florais:**
```powershell
$uri = "http://localhost:8000/florais/"
Invoke-RestMethod -Uri $uri -Method GET
```

**Criar floral:**
```powershell
$uri = "http://localhost:8000/florais/"
$body = @{
    nome = "Teste Floral"
    descricao = "Descrição de teste"
    tipo = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method POST -Body $body -ContentType "application/json"
```

---

## 🛠️ Solução de Problemas

### Erro: "Failed to fetch" ou "Network Error"

**Causa**: Frontend não consegue conectar ao Backend

**Solução:**
1. Verifique se Backend está rodando: http://localhost:8000
2. Verifique `.env` do Frontend: `VITE_API_URL=http://localhost:8000`
3. Reinicie o servidor Frontend

### Erro: "Port 8000 already in use"

**Solução:**
```powershell
# Encontre o processo usando porta 8000
netstat -ano | findstr :8000

# Mate o processo (substitua PID)
taskkill /PID <PID> /F
```

### Erro: "ModuleNotFoundError: No module named 'fastapi'"

**Solução:**
```bash
# Certifique-se de estar no ambiente virtual
pip install -r requirements.txt
```

### Dados não persistem após fechar a aplicação

**Esperado**: SQLite armazena dados em `laogong.db`

**Solução**: Se o arquivo foi deletado:
1. Reinicie o Backend para recriar o banco
2. Os dados antigos foram perdidos, isso é normal

### Frontend mostra "Carregando..." infinitamente

**Causa**: API não respondendo

**Solução:**
1. Verifique erros no console do navegador (F12)
2. Verifique erros no terminal do Backend
3. Reinicie ambos os servidores

---

## 📊 Checklist de Testes Completos

- [ ] Backend inicia sem erros
- [ ] Frontend carrega sem erros
- [ ] Acessar Dashboard mostra cards
- [ ] Criar floral aparece na lista
- [ ] Buscar floral filtra resultados
- [ ] Editar floral salva mudanças
- [ ] Deletar floral remove da lista
- [ ] Contador de florais atualiza
- [ ] API Swagger funciona
- [ ] Fechar e reabrir - dados persistem

---

## 📝 Tipos de Floral Disponíveis

Ao criar um floral, escolha um dos 5 tipos:

| ID | Tipo | Cor |
|---|---|---|
| 1 | Bach | 🔴 Vermelho |
| 2 | Saint Germain | 🔵 Azul |
| 3 | Deva | 🟢 Verde |
| 4 | Californiano | 🔶 Laranja |
| 5 | Australiano | 🟡 Amarelo |

---

## 💾 Banco de Dados

**Localização:** `App/Backend/laogong.db` (SQLite)

**Para resetar o banco:**
```bash
# Delete o arquivo
rm laogong.db  # macOS/Linux
del laogong.db  # Windows PowerShell

# Reinicie o Backend para recriar
python main.py
```

---

## 🔄 Workflow Recomendado

### Na primeira vez:

```bash
# Terminal 1 - Backend
cd App/Backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend
cd App/Frontend
npm install
npm run dev
```

### Nas próximas vezes:

```bash
# Terminal 1 - Backend
cd App/Backend
.\venv\Scripts\Activate.ps1
python main.py

# Terminal 2 - Frontend
cd App/Frontend
npm run dev
```

---

## 📚 Documentação Adicional

- **Setup**: Ver `SETUP.md`
- **Features**: Ver `FEATURES.md`
- **Index**: Ver `INDEX.md`

---

## ❓ Dúvidas Frequentes

**P: Posso mudar a porta 8000?**  
R: Sim, edite `main.py` e atualize `VITE_API_URL` no `.env` do Frontend.

**P: Como rodar em produção?**  
R: Consulte `SETUP.md` para instruções de deploy.

**P: Posso usar PostgreSQL em vez de SQLite?**  
R: Sim, altere `DATABASE_URL` em `.env` para uma URL PostgreSQL.

**P: Os dados são salvos automaticamente?**  
R: Sim, após cada operação (criar, editar, deletar) os dados são persistidos no banco.

---

**Última atualização:** 17 de Março de 2026  
**Status:** ✅ Testado e funcional
