const { Ship } = require("./ships");

class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = []; // To store x amount of ships placed in default positions, with coordinates to be reassigned later
  }

  createGrid() {
    const rows = 10;
    const columns = 10;
    const grid = [];
    for (let x = 0; x < rows; x++) {
      const row = [];
      for (let y = 0; y < columns; y++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  checkValidity(x, y) {
    if (x >= 10 || x < 0 || y >= 10 || y < 0)
      throw new Error("Out of bounds of the gameboard");
    if (this.grid[x][y] !== null) throw new Error("This spot is already taken");
  }

  placeShips(x, y, length, axis, name) {
    const ship = new Ship(length, name);
    this.ships.push(ship);
    const coords = [];

    for (let c = 0; c < ship.length; c++) {
      this.checkValidity(x, y);
      coords.push([x, y]);
      if (axis === "X") {
        y++;
      } else if (axis === "Y") {
        x++;
      } else throw new Error("Invalid axis value");
    }

    coords.forEach(([a, b]) => (this.grid[a][b] = ship.name));
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
  // Check receiveAttack coordinates to be valid & make custom throw error?
  receiveAttack(x, y) {
    if (this.grid[x][y] === "miss") {
      throw new Error("You have already attempted these coordinates");
    }
    if (this.grid[x][y] === null) {
      this.grid[x][y] = "miss";
    } else {
      const ship = this.ships.find((s) => s.name === this.grid[x][y]);
      ship.hit();
      this.grid[x][y] = "hit";
    }
  }
}

module.exports = { Gameboard };
