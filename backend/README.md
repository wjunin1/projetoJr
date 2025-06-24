# Backend do Sistema de Controle de Jogos

API RESTful para o Sistema de Controle de Jogos, desenvolvida com Node.js, Express e Sequelize.

## 🚀 Funcionalidades

- **API Completa para Gerenciamento de Jogos**
  - Endpoints CRUD (Create, Read, Update, Delete)
  - Suporte a consultas e filtros
  - Processamento de importação em massa

- **Processamento de Arquivos**
  - Upload de planilhas Excel
  - Geração dinâmica de templates para download
  - Validação de dados

- **Persistência de Dados**
  - Banco de dados SQLite para armazenamento
  - ORM Sequelize para abstração do banco
  - Modelos e migrações

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Multer** - Middleware para upload de arquivos
- **XLSX** - Biblioteca para processamento de planilhas Excel

## 📦 Estrutura de Pastas

```
backend/
├── models/        # Modelos do Sequelize
├── templates/     # Templates para exportação
├── database.js    # Configuração do banco de dados
└── server.js      # Ponto de entrada da aplicação
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Inicie o servidor:
```bash
node server.js
# ou com nodemon (se instalado)
nodemon server.js
```

3. O servidor estará disponível em [http://localhost:5000](http://localhost:5000)

## 📚 API Endpoints

### Jogos

- **GET /api/games** - Lista todos os jogos
- **GET /api/games/:id** - Obtém um jogo específico
- **POST /api/games** - Cria um novo jogo
- **PUT /api/games/:id** - Atualiza um jogo existente
- **DELETE /api/games/:id** - Remove um jogo

### Importação/Exportação

- **POST /api/games/upload** - Importa jogos a partir de um arquivo Excel
- **GET /api/games/template** - Faz download do template para importação

## 🔗 Modelo de Dados

O modelo principal do sistema é o `Game`, que possui os seguintes campos:

- **year** (INTEGER) - Ano de lançamento do jogo
- **name** (STRING) - Nome do jogo
- **genre** (STRING) - Gênero do jogo
- **platform** (STRING) - Plataforma de jogo
- **rating** (INTEGER) - Nota do jogo (1-10)
- **hours** (INTEGER) - Horas jogadas
- **finished** (BOOLEAN) - Se o jogo foi zerado/concluído
- **playing** (BOOLEAN) - Se está jogando atualmente

## 🧪 Desenvolvimento

O banco de dados SQLite é inicializado automaticamente na primeira execução. Para resetar o banco:

1. Pare o servidor
2. Exclua o arquivo `database.sqlite` (se existir)
3. Reinicie o servidor

---

Para informações mais detalhadas sobre o projeto completo, consulte o [README principal](../README.md) na raiz do projeto.
