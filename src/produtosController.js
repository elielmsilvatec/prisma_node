const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()  

// Rotas CRUD - REMOVA '/produtos' pois já está sendo prefixado no index.js
router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.json(produtos)
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar produtos' })
  }
})

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router