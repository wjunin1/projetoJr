# Frontend do Sistema de Controle de Jogos

Interface de usuário moderna e interativa para o Sistema de Controle de Jogos, desenvolvida com React.

## 🚀 Funcionalidades

- **Gerenciamento de Jogos**
  - Listagem com ordenação por todas as colunas
  - Formulários para adicionar, editar e excluir jogos
  - Botão de detalhes para visualizar informações completas do jogo
  - Campo opcional de ano jogado (`playedYear`)
  - Filtros de busca por nome

- **Autenticação**
  - Tela de login obrigatória antes do uso do sistema
  - Credenciais padrão: `admin` / `admin123`

- **Relatórios Estatísticos**
  - Visão geral com cards interativos
  - Relatório de jogos por ano (com categoria para jogos anteriores a 1995)
  - Estatísticas por plataforma com percentual de conclusão
  - Análise de jogos por nota
  - Distribuição por gênero com horas jogadas

- **Importação de Dados**
  - Upload de planilhas Excel
  - Download de template

- **Interface Responsiva**
  - Design adaptado para dispositivos móveis e desktop
  - Animações e transições suaves
  - Notificações via toasts

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **Axios** - Cliente HTTP para comunicação com a API
- **React-Toastify** - Sistema de notificações
- **CSS Moderno** - Estilos, layouts flexbox e responsividade

## 📦 Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── services/       # Comunicação com o backend
├── styles/         # Arquivos CSS
├── App.js          # Componente principal e rotas
└── index.js        # Ponto de entrada
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

2. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

> **Importante**: O backend deve estar em execução para que o frontend funcione corretamente.

## 📝 Scripts Disponíveis

### `npm start`

Executa a aplicação em modo de desenvolvimento.

### `npm test`

Executa os testes em modo interativo.

### `npm run build`

Compila a aplicação para produção na pasta `build`.

### `npm run eject`

**Nota: operação irreversível!**
Ejeta as configurações do Create React App para customização.

## 🔗 Integração com o Backend

O frontend se comunica com o backend através de uma API REST. A configuração da URL da API está em `src/services/api.js`.

Por padrão, a aplicação espera que o backend esteja disponível em `http://localhost:5000`.

## 🔗 Links Úteis

- [Repositório no GitHub](https://github.com/seu-usuario/sistema-controle-jogos)
- [README Principal](../README.md)
- [Guia de Upload para GitHub](../GITHUB_SETUP.md)

---

Para informações mais detalhadas sobre o projeto completo, consulte o [README principal](../README.md) na raiz do projeto.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
