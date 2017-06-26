var expect = require('chai').expect;
var Heroes = require('../index');
var Weapons = require('../weapons');
var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('Warrior', function(){

  describe('Warriors', function() {
    var jon;
    var theon;

    beforeEach(function() {
      jon = new Heroes.Warrior(30);
      theon = new Heroes.Warrior(20); 
    });

    it('initialize a warrior', function() {
      expect(jon.getHP()).to.eql(30);
    });

    it('initialize a warrior wiht bigger health value then the maximum', function() {
      jon = new Heroes.Warrior(36);
      expect(jon.getHP()).to.eql(30);
    });

    it('check when a warrior is alive', function() {
      var jonIsAlive = jon.isAlive();
      expect(jonIsAlive).to.eql(true);
    });

    it('a warrior attack another warrior', function() {
      theon = new Heroes.Warrior(20);
      jon.attack(theon);
      expect(theon.getHP()).to.eql(19);
    });

  });

  describe('Weapons', function() {
    var jon;
    var theon;

    beforeEach(function() {
      jon = new Heroes.Warrior(30);
      theon = new Heroes.Warrior(20); 
    });

    it('a warrior attack another warrior with a sword', function() {
      jon.addWeapon(new Weapons.Sword());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(13);
    });

    it('a warrior attack another warrior with a dagger', function() {
      jon.addWeapon(new Weapons.Dagger());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(15);
    });

    it('a warrior attack another warrior with a magic wand', function() {
      jon.addWeapon(new Weapons.MagicWand());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(12);
    });

    it('a warrior attack another warrior who has a dagger with a sword', function(){
      jon.addWeapon(new Weapons.Sword());
      theon.addWeapon(new Weapons.Dagger());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(17);
    });

    it('a warrior attack another warrior who has a sword with a magic wand', function(){
      jon.addWeapon(new Weapons.MagicWand());
      theon.addWeapon(new Weapons.Sword());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(14);
    });

    it('a warrior attack another warrior who has a dagger without weapon', function(){
      theon.addWeapon(new Weapons.Dagger());
      jon.attack(theon);
      expect(theon.getHP()).to.eql(20);
    });

  });
})