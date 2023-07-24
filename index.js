const express = require('express')
const app = express()
const Router = require('./src/config/app')
const morgan = require('morgan')
const connection = require('./src/database/connection')

app.use(express.json())
app.use(morgan('dev'))

Router(app)

connection
    .authenticate()
    .then(() => console.log('Conectado com o banco de dados'))
    .catch(err => console.log(err))

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))