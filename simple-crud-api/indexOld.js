// this file is created after using route and controller

//console.log("sami")
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// import model 
const Product = require('./models/product.model.js')

// middleware 
app.use(express.json()); 

//  support form 
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/products', productRoutes)
app.get('/', (req,res) => {
    // this is come from node api 
    // this should come through browser 
    // get output on localhost:3000
    res.send("Hello come from Node API");
});

// use this model 
// product save to database 
app.post('/api/products', async (req,res) => {
    //console.log(req.body);
    //res.send(req.body); 
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// view all products 
app.get('/api/products', async (req,res) => { 
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// view single product 
app.get('/api/product/:id', async (req,res) => { 
    try {
        // get id from the url 
        const {id} = req.params;

        const product = await Product.findById(id);
        res.status(200).json(product)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update product 
app.put('/api/product/:id', async (req,res) => { 
    try {
        // get id from the url 
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found!"})
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete product 
app.delete('/api/product/:id', async (req,res) => { 
    try {
        // get id from the url 
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found!"})
        }
        res.status(200).json({message: "Product is deleted!"})
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://azraf:backendTest@backend.orkrsvm.mongodb.net/?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log("Connected to database!")
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000");
    });
})
.catch(() => {
    console.log("Connection failed!")
})