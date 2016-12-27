var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');

var should = chai.should();
var expect = chai.expect;


chai.use(chaiHttp);

describe ('Server', function () {
  it('should connect to localhost', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});