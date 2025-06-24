# Enviando o Projeto para o GitHub

Este documento contém instruções passo a passo para enviar o projeto para um repositório no GitHub.

## Pré-requisitos

1. Ter uma conta no GitHub (crie uma em https://github.com/signup se não tiver)
2. Ter o Git instalado em seu computador (verifique com `git --version`)

## Passos para enviar o projeto para o GitHub

### 1. Crie um novo repositório no GitHub

1. Acesse https://github.com/new
2. Dê um nome ao repositório (ex: "sistema-controle-jogos")
3. Adicione uma descrição opcional (ex: "Sistema web para controle de coleção de jogos")
4. Escolha se o repositório será público ou privado
5. **NÃO** inicialize o repositório com README, .gitignore ou licença
6. Clique em "Criar repositório"

### 2. Conecte seu repositório local ao GitHub

Após criar o repositório, você verá uma página com instruções. Como você já tem um repositório Git inicializado localmente, use os comandos na seção "...or push an existing repository from the command line":

```bash
# Na pasta raiz do projeto (c:\projetoJr), execute:
git remote add origin https://github.com/SEU-USUARIO/sistema-controle-jogos.git
git branch -M main
git push -u origin main
```

> **Nota:** Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

### 3. Autenticação

Quando você executar o comando `git push`, será solicitado seu nome de usuário e senha do GitHub. 

**Importante:** O GitHub não aceita mais senhas para autenticação via linha de comando. Você precisará usar um token de acesso pessoal:

1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token"
3. Dê um nome ao token (ex: "Token para projeto de jogos")
4. Selecione os escopos "repo" e "workflow"
5. Clique em "Generate token"
6. **Copie o token gerado** (ele será mostrado apenas uma vez)
7. Use esse token como senha quando solicitado

### 4. Verificação

Após o push, acesse seu repositório no GitHub para verificar se todos os arquivos foram enviados corretamente.

## Comandos Úteis para Uso Contínuo

Depois que o repositório estiver configurado, use estes comandos para o fluxo de trabalho regular:

```bash
# Para verificar alterações
git status

# Para adicionar novas alterações
git add .

# Para fazer um novo commit
git commit -m "Descreva suas alterações aqui"

# Para enviar as alterações para o GitHub
git push

# Para obter as alterações mais recentes do GitHub
git pull
```

## Recursos Adicionais

- [Documentação do Git](https://git-scm.com/doc)
- [Guia do GitHub](https://docs.github.com/pt)
- [GitHub Desktop](https://desktop.github.com/) - Interface gráfica para Git
