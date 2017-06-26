'use strict';
var Weapons = require('./weapons');

var maximumHealth = 30;

class Warrior {
  constructor(healthPoints){
    this.healthPoints = healthPoints > maximumHealth ? maximumHealth : (healthPoints < 0 ? maximumHealth : healthPoints);
    this.weapon = new Weapons.Hand();
  }

  getHP() {
    return this.healthPoints;
  } 

  attack(anotherWarrior) {
    anotherWarrior.decreaseHealth(this.weapon);
  }

  decreaseHealth(weapon) {
    this.healthPoints -= (weapon.wound > this.weapon.defence ? weapon.wound - this.weapon.defence : 0);
  }

  isAlive() {
    return this.healthPoints > 0;
  }

  addWeapon(weapon) {
    this.weapon = weapon;
  }
}

class Priest {
  constructor(healthPoints) {
    this.healthPoints = healthPoints > maximumHealth ? maximumHealth : (healthPoints < 0 ? maximumHealth : healthPoints);
    this.standarHealthPoints = this.healthPoints;
    this.weapon = new Weapons.Hand();
  }
  getHP() {
    return this.healthPoints;
  } 

  attack(anotherWarrior) {
    this.healthPoints += (this.standarHealthPoints > this.healthPoints ? 1 : 0);
    anotherWarrior.decreaseHealth(this.weapon);
  }

  decreaseHealth(weapon) {
    this.healthPoints -= (weapon.wound > this.weapon.defence ? weapon.wound - this.weapon.defence : 0);
  }

  isAlive() {
    return this.healthPoints > 0;
  }

  addWeapon(weapon) {
    this.weapon = weapon;
  }
}



module.exports = {
  Warrior : Warrior,
  Priest : Priest
}