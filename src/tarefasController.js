const express = require("express");
const { PrismaClient } = require("@prisma/client");
const yup = require("yup");
const prisma = new PrismaClient();
const router = express.Router();
const Auth = require("./middleware");

// Validação com Yup
const tarefasSchema = yup.object().shape({
  nome: yup.string().required("O campo 'nome' é obrigatório."),
  descricao: yup.string().optional(),
});

// [CREATE] Criar uma nova tarefa
router.post("/", Auth, async  (req, res) => {
  try {
    await tarefasSchema.validate(req.body);
    const { nome, descricao } = req.body;  
      const novaTarefa = await prisma.tarefas.create({
        data: {
          nome,
          descricao,
          usuarioId: req.session.usuario.id,
        },
      });
      res.status(201).json(novaTarefa);   
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// [READ] Listar todas as tarefas
router.get("/", Auth,  async (req, res) => {
    try {
      const tarefas = await prisma.tarefas.findMany({
        where: {
          usuarioId: req.session.usuario.id, // filtra as tarefas pelo ID do usuário logado
        },
      });
      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar tarefas." });
    }  
});

// [READ] Obter uma tarefa específica por ID
router.get("/:id",  Auth,  async (req, res) => { 
    try {
      const tarefa = await prisma.tarefas.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          usuario: true, // Inclui o relacionamento com o usuário
        },
      });
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao obter a tarefa." });
    }
});

// [UPDATE] Atualizar uma tarefa por ID
router.put("/:id",  Auth,  async (req, res) => { 
    try {
      await tarefasSchema.validate(req.body);
      const { nome, descricao, usuarioId } = req.body;
      const tarefaAtualizada = await prisma.tarefas.update({
        where: { id: parseInt(req.params.id) },
        include: {
          usuario: true, // Inclui o relacionamento com o usuário
        },
        data: {
          nome,
          descricao,
          usuarioId,
        },
      });
      res.status(200).json(tarefaAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }  
});

// [DELETE] Excluir uma tarefa por ID
router.delete("/:id",  Auth,  async (req, res) => { 
    try {
      await prisma.tarefas.delete({
        where: {
          id: parseInt(req.params.id),
          include: {
            usuario: true, // Inclui o relacionamento com o usuário
          },
        },
      });
      res.status(200).json({ mensagem: "Tarefa excluída com sucesso." });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir a tarefa." });
    }  
});

module.exports = router;
