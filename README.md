# Introduction-Rest-API

#### Basic: 
REST -> Representational State Transfer 

Guided Architectural Constraints: 
- Client-Server Architecture
- Statelessness
- Cacheability
-  Layered System
- Code on Demand
- Uniform Interface

#### Using Curl 

Example: 

```
curl https://icanhazdadjoke.com
```
Output: 
What do you get if you cross a turkey with a ghost? A poultry-geist!


#### Spotify API 
###### Important Links:
- https://developer.spotify.com/documentation/web-api/reference/search
- https://developer.spotify.com/documentation/web-api
- https://developer.spotify.com/dashboard

###### Get Token: 
https://developer.spotify.com/documentation/web-api/tutorials/getting-started#request-an-access-token

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
```
Here, your-client-id = Account SID </br>  
your-client-secret = Account Auth Token 

### Twilio API 

###### Verify the phone number: 
https://console.twilio.com/us1/develop/phone-numbers/manage/verified
###### Curl: 
https://www.twilio.com/docs/whatsapp/quickstart/curl#twilio-docs-content-area


###### Get Account Sid: 
https://console.twilio.com/



###### To send message: 

Always use Twilio verified phone number: https://console.twilio.com/us1/develop/phone-numbers/manage/verified

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Messages.json" \
--data-urlencode "From=+ *********" \
--data-urlencode "Body=I am Sami" \
--data-urlencode "To=+ ********" \
-u ACCOUNT_SID:ACCOUNT_AUTH_TOKEN
```


#### API Exploring Tools 
- Thunder Client: Vs code extension 
- Postman: https://www.postman.com/twilio/workspace/twilio-api/collection/
- Restfox: To install `sudo snap install restfox`


Writing Code: 
All Docs: https://www.twilio.com/docs
https://www.twilio.com/docs/messaging/api/message-resource#list-all-message-resources
https://www.twilio.com/docs/usage/secure-credentials

Web Hooks: Reverse of API. You call API but for web hooks, API call you

-----------------------------------

# Introduction Node API 
**1. Initialize the project**
```bash
npm init -y 
```

**2. Creating `index.js` file**
**3. Now run this**
```bash
node index.js
```
After changing the scripts in `package.json`: 
```json 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node index.js"
  },
```
Now run this command: 
```bash
npm run serve
```

**4. Install `express` : https://www.npmjs.com/package/express**
```bash
npm i express
```
**5. Install insomnia** 
```bash 
sudo snap install insomnia
```
**6. After every changing, we need to restart the server again. To solve this issue `nodemon` is used** 
```bash
npm i nodemon -D 
```
changing in the `package.json`
```json 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node index.js", 
    "dev": "nodemon index.js"
  },
```
Now run this command: 
```bash
npm run dev
```

**7. Connect `mongodb` with `nodejs` backend** 
	
- connecting with mongodb 
- `npm install mongodb`
- import `mongoose` in `index.js` ==> `npm i mongoose -D`
	  
Here, `index.js`  => 
```js
//console.log("sami")
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
});

app.get('/', (req,res) => {
    // this is come from node api 
    // this should come through browser 
    // get output on localhost:3000
    res.send("Hello come from Node API");
});

mongoose.connect("mongodb+srv://azraf:backendTest@backend.orkrsvm.mongodb.net/?retryWrites=true&w=majority&appName=backend")
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log("Connection failed!")
})
```

But best way is to place  `app.listen` after connecting to the database 
```js
//console.log("sami")
const express = require('express')
const mongoose = require('mongoose')
const app = express()

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
```

**8. Creating Model** 

Here `product.model.js` 

```js
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    
    /**** attributes start *****/
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        }
    },
    /***** attributes end ******/

    /****** timestamps start *****/
    {
        timestamps: true
    }
    /****** timestamps end *****/
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
```

**9. Now using this `product.model.js` in `index.js`**
```js
app.post('/api/products', (req,res) => {
    console.log(req.body);
    res.send(req.body); 
})
```

But if we use this link `http://localhost:3000/api/products/` in `insomnia` ,  we get this `No body returned for response` as output. Even after using `json` in body, we get the same output and in `terminal` of vs code, `undefined` is printed! 
Because, we are not allowed to pass `json` through our `nodejs` by default. We have to use middleware, we need to configure it. 
Here is the solution, 
```js
app.use(express.json());
```
Now updating api to save data in database 
```js
// import model 
const Product = require('./models/product.model.js')
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
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/9e8ee2e1-5732-4439-b3e8-0e02cf4f438e)

Data are saved in database. 
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/000b1bf9-14ff-40dd-b51e-1f29bd53bf53)

**Showing all data**
```js
app.get('/api/products', async (req,res) => { 
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/6e420715-4f52-464a-8cf6-e54e955f1f94)

**Showing single product data**
```js
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
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/cf63bb92-7b6e-4622-9be2-e9f3d197e174)

**Update product**
```js
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
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/e6da5723-8f8e-4f53-b7b9-9a453e5b0edd)

**Delete product**

```js
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
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/96388095-ff2c-410f-aa09-bd769b87d002)

**10. Using URL encoded instead of JSON**

![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/81cbe217-57a3-426a-9f45-2517eb90c9a6)

To Solve this issue: 
```js
app.use(express.urlencoded({extended: false}))
```
![image](https://github.com/Sk-Azraf-Sami/Introduction-Rest-API/assets/106574604/5fc1dd42-4b60-41aa-910e-bb83dadcba5d)

**11. Using routes for structural advantages**
- create a `routes` folder
- create route files in this folder




