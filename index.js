const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Rotas CRUD
app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body
  try {
    const produto = await prisma.produto.create({
      data: { nome, descricao, preco, estoque }
    })
    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar produto' })
  }
})

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar produtos' })
  }
})

app.get('/produtos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) }
    })
    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar produto' })
  }
})

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: req.body
    })
    res.json(produto)
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar produto' })
  }
})

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.produto.delete({
      where: { id: Number(id) }
    })
    res.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar produto' })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})