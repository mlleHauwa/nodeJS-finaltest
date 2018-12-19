const supertest = require('supertest');
const assert = require('assert');
const app = require('../app.js');

//contacts test
describe ('contactTest', function(){
  it('should add', function (done) {
        assert.equal(1+1 ,2);
        done();
    });
  it('it should add two strings correctly',function(done){
      assert.equal("mr"+"dayo", "mrdayo");
      done();
  });
  it('should create contact', function(done){
    let contact ={
      firstName: String,
      lastName: String,
      phoneNumber: String,
      email: String,
      address: String,
    }
    supertest(app)  
      .post('/contacts/')
      .send(contact)
      .set('Accept','application/json')
      .expect(201)
      .end(function(err,res){
          if (err) return done(err);
          console.log(res.body);
          assert.equal(res.body._id.length,24);
      }).finally(done());
  });
});

//users test
describe ('userTest', function(){
  it('should multiply', function (done) {
        assert.equal(2*2 ,4);
        done();
    });
  it('it should add two strings correctly',function(done){
      assert.equal("java"+"script", "javascript");
      done();
  });
  it('should create user', function(done){
    let user = {
      name: String,
      email: String,
      password: String,
      phoneNumber: String
    }
    supertest(app)  
      .post('users/')
      .send(user)
      .set('Accept','application/json')
      .expect(201)
      .end(function(err,res){
          if (err) return done(err);
          console.log(res.body);
          assert.equal(res.body._id.length,24);
      }).finally(done());
  });
});
