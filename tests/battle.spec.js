var expect = require('chai').expect;
var Heroes = require('../index');
var Battle = require('../battle');

describe('Battle', function(){
  var jon;
  var theon;
  var thoros;
  var battle;

  beforeEach(function() {
    jon = new Heroes.Warrior(30);
    theon = new Heroes.Warrior(20); 
    thoros = new Heroes.Priest(5);
    battle = new Battle(jon, theon);
  });

  it('initialize a battle', function() {
    expect(true).to.eql(true);
  });

  it('initialize a battle and get the winner', function() {
    expect(battle.getWinner()).to.eql(jon);
  });

  it('battle with a warrior and a priest, priest should win', function() {
    jon = new Heroes.Warrior(10);
    battle = new Battle(jon, thoros);
    expect(battle.getWinner()).to.eql(thoros);
  });

})