'use strict';

class Hand {
  constructor() {
    this.wound = 1;
    this.defence = 0;
  }
}

class Sword {
  constructor() {
    this.wound = 7;
    this.defence = 2;
  }
}

class Dagger {
  constructor() {
    this.wound = 5;
    this.defence = 4;
  }
}

class MagicWand {
  constructor() {
    this.wound = 8;
    this.defence = 1;
  }
}


module.exports = {
  Hand : Hand,
  Sword : Sword,
  Dagger : Dagger,
  MagicWand : MagicWand
} 