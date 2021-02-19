'use strict';
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp); // asssociate the module with chai
const app = require(`../server`);

// describe(`A simple test`, () => {

//     //does 1+1=2?
//     it(`should return 2 when 1+1`, () => {
//         const expression = 1 + 1;
//         expect(expression).to.equal(2);
//     });

//     it(`another one`, () => {
//         const val = null;
//         expect(val).to.be.null;
//     });

// })

describe(`Product Routes`, () => {

    it(`Test /hello route`, (done) => {
        // check if the call is successful
        // app = http://localhost:5019
        chai.request(app)
            .get("/hello")
            .end((err, response) => {
                if (err) {
                    console.log(`Something went wrong!`);
                    done(err);
                }
                expect(response).to.have.status(200);
                expect(response).to.not.be.null;
                expect(response).to.have.property(`text`, `hello`);
                done();
            });
    });

    it(`Test /getAll route`, (done) => {
        // request is to localhost:5019
        chai.request(app)
            .get("/product/getAll")
            .end((err, response) => {
                if (err) done(err);
                expect(response).to.have.status(200);
                expect(response.body).to.not.be.null;
                response.body.map((item) => expect(item).to.contain.keys("_id"));
                response.body.map((item) => expect(item).to.be.a(`object`));
                response.body.map((item) => expect(item._id).to.be.a(`string`));
                done();
            });
    });

    it(`Test /create route`, (done) => {
        //request is to http:localhost:5019/product/creaye
        chai.request(app)
            .post("/product/create")
            .send({ "name": "Chocolate biscuits" })
            .end((err, res) => {
                if (err) done(err)
                expect(err).to.be.null;
                expect(res).to.not.be.undefined;
                expect(res).to.have.status(201);
                expect(res).to.have.property('text', `Chocolate biscuits has been added successfully`);
                done();
            });
    });

    after(() => {
        app.close();
    });
});