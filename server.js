const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require(`http-errors`);

// instantiate my app 
const app = express();
//middleware
app.use(cors());
app.use(bodyParser.json());

//custom middleware - what we want to happen inbetween requests
const logger = (req, res, next) => {
    console.log(new Date());
    next(); //move to the next function
}
//this will print the date before each request
app.use(logger);

//import all of the routes in product.js
const productRoute = require('./routes/products');

// .use method: lets us look for st at a specific path and have functions associated to it
app.use("/product", productRoute);

//error handling
app.use((req, res, next) => {
    next(createError(404, `Resource not found`));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message || "something went wrong");
});

// communicate with the app on a specific port
const server = app.listen(5019, () => {
    console.log(`server has successfully started on port number: ${server.address().port}`);
})