const Products = require('../routes/Products')
const Users = require('../routes/Users')
const Login = require('../routes/Login')
const Roles = require('../routes/Roles')

function initializeRoutes(app) {
    app.use('/produtos', Products)
    app.use('/usuarios', Users)
    app.use('/login', Login)
    app.use('/regras', Roles)

}

module.exports = initializeRoutes;