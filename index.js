const express = require('express')
const app = express()
const produtosRouter = require('./src/produtosController')  
const userRouter = require('./src/userController')
const tarefasController = require('./src/tarefasController')
const session = require('express-session')

// configurando sessão
app.use(session({
    secret: 'fdsjkl22%%6667889)))@####',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 } // 7 days
}))


app.use(express.json())
app.use('/produtos', produtosRouter) // Aqui está prefixando todas as rotas com /produtos
app.use('/users', userRouter)
app.use('/tarefas', tarefasController)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})