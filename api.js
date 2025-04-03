const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Criar produto
async function criarProduto(nome, descricao, preco, estoque) {
  return await prisma.produto.create({
    data: {
      nome,
      descricao,
      preco,
      estoque
    }
  })
}

// Listar todos produtos
async function listarProdutos() {
  return await prisma.produto.findMany()
}

// Buscar produto por ID
async function buscarProduto(id) {
  return await prisma.produto.findUnique({
    where: { id }
  })
}

// Atualizar produto
async function atualizarProduto(id, dados) {
  return await prisma.produto.update({
    where: { id },
    data: dados
  })
}

// Deletar produto
async function deletarProduto(id) {
  return await prisma.produto.delete({
    where: { id }
  })
}

// Teste das funções
async function main() {
  // Criar
  const novoProduto = await criarProduto(
    "Notebook",
    "Notebook i5 8GB RAM",
    3500.00,
    10
  )
  console.log('Produto criado:', novoProduto)

  // Listar
  const produtos = await listarProdutos()
  console.log('Todos produtos:', produtos)

  // Atualizar
  const atualizado = await atualizarProduto(novoProduto.id, {
    preco: 3200.00
  })
  console.log('Produto atualizado:', atualizado)

  // Deletar
  // await deletarProduto(novoProduto.id)
  // console.log('Produto deletado')
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())