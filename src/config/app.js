const Produtos = require('../routes/Products')

function initializeRoutes(app) {
    app.use('/produtos', Produtos)
}

module.exports = initializeRoutes;