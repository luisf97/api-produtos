const Products = require('../routes/Products')
const Users = require('../routes/Users')

function initializeRoutes(app) {
    app.use('/produtos', Products)
    app.use('/usuarios', Users)

}

module.exports = initializeRoutes;