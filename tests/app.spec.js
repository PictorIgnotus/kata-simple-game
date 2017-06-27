'use strict';

var request = require('supertest');
var app = require('../app');

describe('Server', function() {
  var hero;
  var heroWithId;
  var hero1;
  var hero2;

  var checkHeroes = function(expectedHeroes, done) {
    request(app)
      .get('/heroes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        heroes: expectedHeroes
      }, done);
  };

  var postHero = function(hero, cb) {
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
        .expect(201, heroWithId, done);
    });

     it('should save the hero to the service', function(done) {
      postHero(hero, function() {
        checkHeroes([heroWithId], done);
      });
    });

    it('should increment the hero ids after save', function(done) {
      postHero(hero, function() {
        postHero({ type: 'warrior', hp: 20, weapon: 'dagger' }, function() {
          checkHeroes([heroWithId, { id: 2, type: 'warrior', hp: 20, weapon: 'dagger' }], done);
        })
      });
    });

    it('should throw a validation error with error code 400 if type or hp is missing', function(done) {
      delete hero.type;

      request(app)
        .post('/heroes')
        .send(hero)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, { error: 'Missing datas...' }, done);
    });

  });

  var checkWinner = function(expectedId, done) {
    request(app)
      .get('/battle?hero1=1&hero2=2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        winner_id: expectedId
      }, done);
  };

  describe('GET /battle', function() {

    beforeEach(function() {
      hero1 = { type: 'warrior', hp: 30, weapon: 'sword' };
      hero2 = { type: 'warrior', hp: 20, weapon: 'dagger' };
    });

    it('should return the winner hero id after a battle', function(done) {
      postHero(hero1, function() {
        postHero(hero2, function() {
          checkWinner(1, done);
        })
      });
    });

     it('should throw an error with error code 400 if a hero missing', function(done) {
       request(app)
        .get('/battle?hero1=1&hero2=3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, { error: 'Missing hero...' }, done);
    });

  });

});