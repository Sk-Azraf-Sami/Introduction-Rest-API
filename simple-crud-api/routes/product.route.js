const express = require("express")
const Product = require('../models/product.model.js')
const router = express.Router()

const {getProducts, 
       getSingleProduct,          
       createProduct,
       updateProduct,
       deleteProduct} = require('../controllers/product.controller.js')



// "/" ==> means "api/products"

// routes
// app.use('/api/products', productRoutes) in "index.js"
router.get('/',getProducts); // get all products 
router.post('/',createProduct) // post new product

router.get('/:id',getSingleProduct) // get single product by id 
router.post('/:id', updateProduct) // update product information 
router.delete('/:id', deleteProduct) // delete product 



module.exports = router

