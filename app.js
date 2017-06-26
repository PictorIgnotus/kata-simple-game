'use strict';


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Heroes = require('./index');
var Battle = require('./battle');
var Weapons = require('./weapons');

var heroes = [
  /*{
    id : 1,
    type : 'warrior',
    hp : 30,
    weapon : 'sword'
  },
  {
    id : 2,
    type : 'priest',
    hp : 20,
    weapon : 'hand'
  }*/
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/heroes', function(req, res) {
  res.status(200).send({heroes: heroes });
});

app.post('/heroes', function(req, res) {
  saveHero(req.body, function(err, hero) {
    if(err) res.status(400).send({error: err});
    else res.status(201).send(hero.id);
  });
});

function saveHero(hero, cb){
  if(false) 
    return cb('Missing datas...');
  hero.id = heroes.length + 1;
  heroes.push(hero);
  return cb(null, hero);
}

app.get('/battle', function(req, res) {
  var id1 = req.param('hero1')-1;
  var id2 = req.param('hero2')-1;
  var hero1 = heroes[id1];
  var hero2 = heroes[id2];
  var winner = battle(hero1, hero2);
  res.status(200).send("winner_id: " + winner);
});

function battle(h1, h2){
  var hero1, hero2;
  hero1 = createHero(h1);
  hero2 = createHero(h2);
  hero1.addWeapon(whatWeapon(h1.weapon));
  hero2.addWeapon(whatWeapon(h2.weapon));
  var battle = new Battle(hero1, hero2);
  return battle.getWinner() === hero1 ? h1.id : h2.id;
}

function createHero(heroData){
  switch(heroData.type){
    case 'warrior': return new Heroes.Warrior(heroData.hp);
    case 'priest' : return  new Heroes.Priest(heroData.hp);
    default       : return null;
  }
}

function whatWeapon(weaponString){
  switch(weaponString){
    case 'sword'     : return new Weapons.Sword();
    case 'dagger'    : return new Weapons.Dagger();
    case 'magicwand' : return new Weapons.MagicWand();
    default          : return new Weapons.Hand();
  }
}

app.listen(process.env.PORT || 3000, function () {
  console.log('The app is listening on port ', this.address().port);
});

module.exports = app;