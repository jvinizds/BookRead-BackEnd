const express = require('express')
require('dotenv').config()
const InicializaMongoServer = require('./config/db')
InicializaMongoServer()
const rotasLivros = require('./routes/Livros')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT || 4000

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    next()
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Ok'
    })
})
app.use("/livros", rotasLivros)

app.use(function(req, res){
    res.status(404).json({
        mensagem: `Rota ${req.originalUrl} não existe!`
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Rodando na porta ${PORT}`)
}
)