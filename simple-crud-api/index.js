//console.log("sami")
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const productRoutes = require('./routes/product.route.js')

// import model 
const Product = require('./models/product.model.js')

// middleware 
app.use(express.json()); 

//  support form 
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/products', productRoutes)


// for https:localhost:3000/
app.get('/', (req,res) => {
    // this is come from node api 
    // this should come through browser 
    // get output on localhost:3000
    res.send("Hello come from Node API");
});


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