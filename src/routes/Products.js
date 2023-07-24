const router = require('express').Router()
const ProductsController = require('../controllers/ProductsController')

router
    .get('/', ProductsController().getAllProducts)

module.exports = router;