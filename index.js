const express = require('express')
const app = express()
const Router = require('./src/config/app')
const morgan = require('morgan')
const connection = require('./src/database/connection')
const session = require('express-session')
const cors = require('cors')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 3000
    }
}));

Router(app)

connection
    .authenticate()
    .then(() => console.log('Conectado com o banco de dados'))
    .catch(err => console.log(err))

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))