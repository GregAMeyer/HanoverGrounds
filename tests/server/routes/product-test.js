var mongoose = require('mongoose');


var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
// require('../../../server/db/models');
var Product = mongoose.model('Product');

var request = require('supertest');
var app = require('../../../server/app');

describe('Products Route', function() {


    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var productInfo = [{
        name: 'Coffee',
        roast: 'shoopdawoop',

    }];

    beforeEach('Create a product', function(done) {
        Product.create(productInfo, done);
    });


    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    describe('Product List Route', function() {
        it('should render all products', function(done) {
            return request(app)
                .get('/api/products')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {

                    //console.log(res.body);
                    expect(res.body[0].name).to.eql('Coffee')
                    done();
                })
        })

    });
    describe('Product Detail Route', function() {
        it('should render one product', function(done) {
            return request(app)
                .get('/api/products/55b7ead2f28e8f2b8709035b')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                	console.log('RES', res.body);
                    expect(res.body[0].name).to.eql('Coffee')
                    done();
                })
        })
    });




    // describe('Unauthenticated request', function () {

    // 	var guestAgent;

    // 	beforeEach('Create guest agent', function () {
    // 		guestAgent = supertest.agent(app);
    // 	});

    // 	it('should get a 401 response', function (done) {
    // 		guestAgent.get('/api/members/secret-stash')
    // 			.expect(401)
    // 			.end(done);
    // 	});

});