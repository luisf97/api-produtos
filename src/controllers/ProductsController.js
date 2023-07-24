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
                action_links:[{
                    view: `/produtos/${product.id}`,
                    edit: `/produtos/${product.id}`,
                    delete: `/produtos/${product.id}`
                }],
                data: product
            })

            return res.status(201).json({ status: 201, message: 'Produto cadastrado com sucesso!' })
        },

        async deleteProductById(req, res) {
            const { productId: id } = req.params;

            try {
                
                const product = await Products.findByPk(id)
                
                if(product) {
                    await Products.destroy({ where: { id }}) 
                    
                    return res.status(200).json({ 
                        status: 200,
                        message: "Produto deletado com sucesso!",
                        data: product
                    })
                } 

                return res.status(404).json({ 
                    status: 404,
                    message: "Produto não encontrado na base de dados!"
                })
                

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }

        }
    }
}

module.exports = ProductsController;