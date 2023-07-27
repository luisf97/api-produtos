const Products = require('../routes/Products')
const Users = require('../routes/Users')
const Login = require('../routes/Login')
const Roles = require('../routes/Roles')
const Permissions = require('../routes/Permissions')


function initializeRoutes(app) {
    app.use('/produtos', Products)
    app.use('/usuarios', Users)
    app.use('/login', Login)
    app.use('/regras', Roles)
    app.use('/permissoes', Permissions)

}

module.exports = initializeRoutes;