const { Products } = require('../models')

function ProductsController() {
    return {

        async getAllProducts(req, res) {
            const products = await Products.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!products) return res.status(404).json({
                status: 404,
                message: 'Nenhum produto encontrado!'
            })

            return res.status(200).json({
                status: 200,
                produtos: products
            })
        },

        async getProductById(req, res) {
            const { productId: id } = req.params;

            const product = await Products.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!product) return res.status(404).json({ status: 404, message: 'Produto não encontrado na base de dados'})
        
            return res.status(200).json({
                status: 200,
                produto: product,
                path: req.originalUrl
            })
            
        },

        async createNewProduct(req, res) {
            const { name, description, price } = req.body;

            const [ product, created ] = await Products.findOrCreate({
                where: { name },
                defaults: { name, description, price },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            })

            if(!created) return res.status(400).json({ 
                status: 400, 
                message: "O produto já existe na base de dados!", 
                path:`/produtos/${product.id}` ,
                produto: product
            })

            return res.status(201).json({ status: 201, message: 'Produto cadastrado com sucesso!' })
        }
    }
}

module.exports = ProductsController;