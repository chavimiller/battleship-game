const { Player } = require("../src/player.js");

let player1;

beforeEach(() => {
  player1 = new Player("Chavi");
});

test("create new player", () => {
  expect(player1.name).toBe("Chavi");
});

test("player has accessible gameboard", () => {
  expect(player1.gameboard.grid[0][0]).toBe(null);
  expect(player1.gameboard.grid[9][9]).toBe(null);
  expect(() => player1.gameboard.placeShips(10, 10, 3, "X", "Cruiser")).toThrow(
    "Out of bounds of the gameboard"
  );
});
