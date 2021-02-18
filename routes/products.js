`use strict`;
const router = require('express').Router(); //express has an interface called router
const { Product } = require("../config/db");

// requests (CRUD)
router.get("/getAll", (req, res) => {
    Product.find((err, products) => {
        if (err) {
            next(err);
        }
        res.send(products);
    })
});

router.get("/read/:id", (req, res, next) => {
    Product.findById(req.params.id, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send(result);
        }
    })
})

router.post("/create", (req, res, next) => {
    const item = new Product(req.body);
    console.log(item);
    // saving it to the database and print result if successful, otherwise print the error
    item.save().then((result) => {
        res.status(201).send(`${result.name} has been added successfully`)
    })
        //refactor to use a middleware function isntead!
        .catch((err) => next(err));
});

// url parameters
router.delete("/delete/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            next(err);
        } else {
            res.status(204).send(`successfully deleted`);
        }
    })
});

// query parameter
router.patch("/update/:id", (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) {
            next(err);
        }
        res.status(202).send(`successfully updated!`)
    })
});

//replace a document
router.put("/replace/:id", (req, res, next) => {
    const { name, price, onSale } = req.query;
    Product.findByIdAndUpdate(req.params.id, { name, price, onSale }, { new: true }, (err, result) => {
        if (err) {
            console.error(err);
        }
        res.status(202).send(`Successfully replaced!`);
    });
});


module.exports = router;
// because you need to export it