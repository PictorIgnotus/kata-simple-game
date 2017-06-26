'use strict';

var request = require('supertest');
var app = require('../app');

describe('Server', function() {
  var hero;
  var heroWithId;

  var checkHeroes = function(expectedHeroes, done) {
    request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        heroes: expectedHeroes
      }, done);
  };

  var postHeroes = function(hero, cb) {
    request(app)
      .post('/heroes')
      .send(hero)
      .set('Accept', 'application/json')
      .end(cb);
  }

  beforeEach(function() {
    hero = { type: 'warrior', hp: 30, weapon: 'sword' };
    heroWithId = { id: 1, type: 'warrior', hp: 30, weapon: 'sword' };
  });

  describe('GET /heroes', function() {

    it('should get an empty array if there is no hero saved in the service', function(done) {
      checkHeroes([], done);
    });

  });

  describe('POST /heroes', function() {

    beforeEach(function(done) {
      request(app).delete('/heroes').end(done);
    });


    it('should accept a new hero save request', function(done) {
      request(app)
        .post('/heroes')
        .send(hero)
        .set('Accept', 'application/json')
        .expect(201, heroWithId.id, done);
    });

  });

});