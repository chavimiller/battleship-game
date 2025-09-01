const { Gameboard } = require("./gameboard");

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
module.exports = { Player };
