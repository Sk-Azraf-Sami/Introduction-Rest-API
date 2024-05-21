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

