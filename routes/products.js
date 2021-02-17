`use strict`;
const router = require('express').Router(); //express has an interface called router
const { Product } = require("../config/db");



// requests (CRUD)
router.get("/getAll", (req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.error(err);
        }
        res.send(products);
    })
    // res.send(`Here's the info you asked for...${products}`);

});

router.get("/read/:id", (req, res, next) => {
    Product.findById(req.params.id, (err, products) => {
        if (err) {
            console.error(err);
        } else {
            res.send(products);
        }
    })
})

router.post("/create", (req, res) => {
    const name = req.body.name;
    products.push(name);
    res.send(`added ${name} to products list, here's the new list: ${products}`);
});

// url parameters
router.delete("/delete/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, products) => {
        if (err) {
            console.error(err);
        } else {
            res.send(products);

        }
    })
    // console.log(req.params.id); //parameters I send accross, id 
    // res.send(`done`);
});

// query parameter
router.patch("/update/:id", (req, res, next) => {
    const id = req.params.id;
    console.log(`id: ${id}`);
    // const name = req.query.name;
    // const age = req.query.age;
    //destructuring
    const { name } = req.query;
    products[id] = name;
    res.send(`got your info, new list: ${products}`);
    //localhost:5019/update/2?name=kiera&age=22
});

module.exports = router;
// because you need to export it