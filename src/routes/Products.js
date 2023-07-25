const router = require('express').Router()
const ProductsController = require('../controllers/ProductsController')

router
    .get('/', ProductsController().getAllProducts)
    .get('/:productId', ProductsController().getProductById)
    .post('/', ProductsController().createNewProduct)
    .delete('/:productId', ProductsController().deleteProductById)
    .put('/:productId', ProductsController().updateProductById)

module.exports = router;