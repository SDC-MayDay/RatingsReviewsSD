const chai = require('chai');
// import 'chai/register-should';
const chaiHttp = require('chai-http');
const server = require('../Server/index.js');

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Testing route get reviews', () => {
  it('It should get reviews by a specific ID', (done) => {
    const productId = 1;
    chai.request(server)
      .get(`/reviews/${productId}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });

  it('It should not get reviews when not id is provided', (done) => {
    chai.request(server)
      .get('/reviews/')
      .end((err, response) => {
        response.should.have.status(404);
      });
    done();
  });
});

describe('Testing the get metdata route', () => {
  it('It should get the metadata by a specific product ID', (done) => {
    const productID = 5;
    chai.request(server)
      .get(`/metaData/${productID}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('Characteristics');
        done();
      });
  });
});
