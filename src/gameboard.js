const { Ship } = require("./ships");

class Gameboard {
  constructor(player) {
    this.player = player;
    this.grid = this.createGrid();
    this.ships = this.placeShips();
  }

  createGrid() {
    const rows = 10;
    const columns = 10;
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let x = 0; x < columns; x++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
    /*

    [
     A      B     C     D     E     F     G     H     I     J
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],  
    [null, null, null, null, null, null, null, null, null, null],
    ...,  
    ]

    */
  }

  placeShips(x, y, length, axis, name) {
    const ship = new Ship(length, name);

    if (axis === "X") {
      horizontal();
    } else if (axis === "Y") {
      vertical();
    } else {
      throw new Error("Invalid axis value");
    }
    let count = 0;
    function vertical() {
      while (count < ship.length) {
        this.grid[x][y] = ship.name;
        count++;
        y++;
      }
    }
    function horizontal() {
      while (count < ship.length) {
        this.grid[x][y] = ship.name;
        count++;
        x++;
      }
    }
  }

  receiveAttack() {}
}

module.exports = { Gameboard };
