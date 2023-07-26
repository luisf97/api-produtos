const Products = require('../routes/Products')
const Users = require('../routes/Users')
const Login = require('../routes/Login')

function initializeRoutes(app) {
    app.use('/produtos', Products)
    app.use('/usuarios', Users)
    app.use('/login', Login)
}

module.exports = initializeRoutes;