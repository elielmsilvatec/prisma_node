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

Instalação
Clone o repositório:

bash
Copy
git clone https://github.com/elielmsilvatec/prisma_Node
cd api-produtos-prisma
Instale as dependências:

bash
Copy
npm install
Configure o banco de dados (SQLite):

bash
Copy
npx prisma migrate dev --name init
Executando a aplicação
bash
Copy
node server.js
A API estará disponível em: http://localhost:3000

📚 Rotas da API
Produtos
POST /produtos - Cria um novo produto

GET /produtos - Lista todos os produtos

GET /produtos/:id - Busca um produto específico

PUT /produtos/:id - Atualiza um produto

DELETE /produtos/:id - Remove um produto

Exemplo de requisição (POST /produtos)
json
Copy
{
  "nome": "Notebook",
  "descricao": "Notebook i5 8GB RAM",
  "preco": 3500.00,
  "estoque": 10
}
🗃️ Modelo do Banco de Dados
prisma
Copy
model Produto {
  id          Int      @id @default(autoincrement())
  nome        String
  descricao   String?
  preco       Float
  estoque     Int      @default(0)
  criadoEm    DateTime @default(now())
  atualizadoEm DateTime @updatedAt
  @@map("produto")
}
🛠️ Comandos úteis
Comando	Descrição
npx prisma studio	Abre interface visual do banco de dados
npx prisma migrate dev	Executa novas migrações
npx prisma generate	Gera o cliente Prisma