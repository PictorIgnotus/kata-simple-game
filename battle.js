'use strict';

var Battle = function(fstHero, sndHero) {
  this.fstHero = fstHero;
  this.sndHero = sndHero;
};

Battle.prototype = {
  getWinner: function() {
    while(this._eitherOfThemIsAlive()){
      this.fstHero.attack(this.sndHero);
      if(this.sndHero.isAlive())
        this.sndHero.attack(this.fstHero);
    }
    return this.fstHero.isAlive() ? this.fstHero : this.sndHero;
  },

  _eitherOfThemIsAlive: function() {
    return this.fstHero.isAlive()
           && this.sndHero.isAlive();
  }
}

module.exports = Battle;