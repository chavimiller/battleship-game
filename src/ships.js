class Ship {
  constructor(length, name, hits = 0) {
    this.length = length;
    this.hits = hits;
    this.name = name;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

module.exports = { Ship };
