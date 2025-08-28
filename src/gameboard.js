class Gameboard {
  constructor(player) {
    this.player = player;
    this.grid = this.createGrid();
  }

  createGrid() {
    const rows = 10;
    const columns = 10;
    const grid = [];
    for (i = 0; i < rows; i++) {
      const row = [];
      for (x = 0; x < columns; x++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  receiveAttack() {}
}

module.exports = { Gameboard };
