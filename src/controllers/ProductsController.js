const { Products } = require('../models')

function ProductsController() {
    return {

        async getAllProducts(req, res) {
            const products = await Products.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})

            return res.json(products)
        }
    }
}

module.exports = ProductsController;