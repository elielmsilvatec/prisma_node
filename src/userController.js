const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require("bcryptjs");
const yup = require("yup");


// Ler User
router.get("/", async (req, res) => {


  try {

    const users = await prisma.usuario.findMany();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ erro: "Erro ao obter as tarefas." });
  }
});




// Criando User
router.post("/create", async (req, res) => {
  const { email, nome, password } = req.body;

  try {
    // Validação dos dados usando Yup
    await usuarioSchema.validate(req.body, { abortEarly: false }); // abortEarly: false para retornar todos os erros

    // Verifica se usuário já existe
    const userExisting = await prisma.usuario.findFirst({
        where: {
          email: email
        }
      });

    if (userExisting) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria hash da senha
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Cria usuário
    const user = await prisma.usuario.create({
      data: {
        email,
        nome,
        password: hash,
      },
    });

    // Retorna resposta sem mostrar dados sensíveis
    return res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
      },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Se for um erro de validação do Yup
      const errors = error.errors; // Array de mensagens de erro
      return res.status(400).json({ errors }); // Retorna um array de erros
    } else {
      // Se for outro tipo de erro (ex: erro no banco de dados)
      console.error("Erro ao criar user:", error); // Log para depuração
      res.status(500).json({ error: "Erro ao criar user" });
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação dos dados usando Yup
    await usuarioSchema.validate(req.body, { abortEarly: false }); // abortEarly: false para retornar todos os erros

    // Verifica se usuário já existe
    const userExisting = await prisma.usuario.findFirst({
        where: {
          email: email
        }
      });

    if (userExisting) {
      var correct = bcrypt.compareSync(password, userExisting.password);
      if (correct) {
        req.session.usuario = {
          id: userExisting.id,
          email: userExisting.email,
        };
        return res.status(200).json({ message: "Usuário logado com sucesso" });
      } else {
        return res.status(400).json({ error: "Dados incorretos...!" });
      }
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Se for um erro de validação do Yup
      const errors = error.errors; // Array de mensagens de erro
      return res.status(400).json({ errors }); // Retorna um array de erros
    } else {
      // Se for outro tipo de erro (ex: erro no banco de dados)
      console.error("Erro ao criar usuário:", error); // Log para depuração
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
});

// Esquema de validação correto
const usuarioSchema = yup.object().shape({
  nome: yup.string().nullable(), // permite nulo
  email: yup
    .string() // <-- Adicione isso primeiro
    .required("O email é obrigatório")
    .email("Digite um e-mail válido!"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

module.exports = router;
