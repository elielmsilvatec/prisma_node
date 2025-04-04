README - API de Produtos com Prisma e Node.js
📝 Descrição
Este projeto é uma API CRUD (Create, Read, Update, Delete) para gerenciamento de produtos, desenvolvida com Node.js, Prisma ORM e SQLite como banco de dados.

✨ Funcionalidades
✅ Criar novos produtos

✅ Listar todos os produtos

✅ Buscar produto por ID

✅ Atualizar informações do produto

✅ Remover produtos

🛠️ Tecnologias
Node.js - Ambiente de execução JavaScript

Prisma - ORM moderno para bancos de dados

SQLite - Banco de dados relacional embutido

Express - Framework web para Node.js

🚀 Como executar o projeto
Pré-requisitos
Node.js (v14 ou superior)

npm ou yarn

## Instalação
Clone o repositório:
git clone https://github.com/elielmsilvatec/prisma_Node

## Navegue até a pasta do projeto.
Instale as dependências
npm install

## Verifica o arquivo .env
DATABASE_URL="file:./dev.db" 
ou se for mysql
DATABASE_URL="mysql://user:password@localhost:3306/nome_banco"

## Verifica o arquivo schema.prisma pra ver se o SQLite está configurado
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
caso seja mysql
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}


## Configure o banco de dados (SQLite):
npx prisma migrate dev --name init

## Verifica a conexão com o banco de dados 
npx prisma migrate dev

## Caso mude de Banco apaga a pasta migrations (isso apagara todas as migrates)
Remove-Item -Recurse -Force prisma\migrations 

## Depois resetar migrate 
npx prisma migrate reset

## Executando a aplicação
node index.js

## node index.js
A API estará disponível em: http://localhost:3000



npx prisma migrate dev --name init
Executando a aplicação




📚 Rotas da API
Produtos
POST /produtos - Cria um novo produto
GET /produtos - Lista todos os produtos
GET /produtos/:id - Busca um produto específico
PUT /produtos/:id - Atualiza um produto
DELETE /produtos/:id - Remove um produto

