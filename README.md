# Sistema de Controle de Jogos

Um sistema web completo para gerenciamento e análise de coleções de jogos, permitindo registro, categorização, acompanhamento de progresso e geração de relatórios estatísticos.

![Sistema de Controle de Jogos](https://via.placeholder.com/800x400?text=Sistema+de+Controle+de+Jogos)

## 📋 Funcionalidades

- **Gerenciamento Completo (CRUD)** de jogos com informações detalhadas:
  - Nome, ano, gênero, plataforma, nota
  - Horas jogadas, status de conclusão
  - Status de jogo em andamento

- **Importação em Massa** via planilha Excel
  - Template disponível para download
  - Upload e processamento automático

- **Relatórios Avançados** com visualizações interativas:
  - Estatísticas gerais (total de jogos, horas jogadas, taxa de conclusão)
  - Distribuição por plataforma com percentual de conclusão
  - Distribuição por gênero e horas investidas
  - Análise por nota com distribuição visual
  - Jogos agrupados por ano (com categoria especial para títulos anteriores a 1995)

- **Interface Moderna e Responsiva**:
  - Ordenação interativa em todas as tabelas (clique nas setas ▲/▼)
  - Filtros de busca por nome
  - Confirmação de ações importantes via modais
  - Notificações visuais de sucesso/erro

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com **Express**
- **Sequelize** como ORM
- **SQLite** como banco de dados
- **Multer** para upload de arquivos
- **XLSX** para processamento de planilhas

### Frontend
- **React** para interface de usuário
- **Axios** para comunicação com a API
- **React-Toastify** para notificações
- **CSS** moderno com animações e responsividade

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Configuração do Backend

1. Navegue até a pasta do backend:
```bash
cd c:\projetoJr\backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O servidor estará disponível em [http://localhost:5000](http://localhost:5000).

### Configuração do Frontend

1. Navegue até a pasta do frontend:
```bash
cd c:\projetoJr\frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📊 Usando o Sistema

### Adicionando Jogos
1. Acesse a página inicial
2. Clique no botão "Adicionar Jogo"
3. Preencha todos os campos do formulário
4. Clique em "Salvar"

### Importando Jogos via Excel
1. Acesse a página inicial
2. Clique em "Importar Jogos"
3. Faça o download do template (opcional)
4. Preencha a planilha seguindo o modelo
5. Faça upload do arquivo e confirme

### Visualizando Relatórios
1. Clique em "Relatórios" no menu superior
2. Navegue entre as diferentes seções de relatórios
3. Use as setas nas colunas para ordenar os dados
4. Analise as estatísticas e gráficos disponíveis

## 📝 Estrutura do Projeto

### Backend
- `server.js` - Ponto de entrada da aplicação
- `database.js` - Configuração do banco de dados
- `models/Game.js` - Modelo de dados para jogos
- `templates/` - Templates para exportação/importação

### Frontend
- `src/App.js` - Componente principal e rotas
- `src/components/` - Componentes reutilizáveis
- `src/pages/` - Páginas da aplicação
- `src/services/` - Serviços para comunicação com a API
- `src/styles/` - Arquivos CSS e estilos

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido como projeto educacional demonstrando integração entre React e Node.js com foco em gestão de dados e visualização estatística.
