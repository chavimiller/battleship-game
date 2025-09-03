const { Player } = require("../src/player.js");

let shipChoices = [
  { dx: 4, dy: 6, length: 5, axis: "Y", name: "carrier" },
  { dx: 2, dy: 1, length: 4, axis: "X", name: "battleship" },
  { dx: 6, dy: 0, length: 3, axis: "Y", name: "cruiser" },
  { dx: 2, dy: 6, length: 3, axis: "X", name: "submarine" },
  { dx: 0, dy: 4, length: 2, axis: "X", name: "destroyer" },
];

test("create new player", () => {
  let player1 = new Player("Chavi");
  expect(player1.name).toBe("Chavi");
});

test("player has accessible gameboard", () => {
  let player1 = new Player("Chavi");
  expect(player1.gameboard.grid[0][0]).toBe(null);
  expect(player1.gameboard.grid[9][9]).toBe(null);
  expect(() => player1.gameboard.placeShips(10, 10, 3, "X", "Cruiser")).toThrow(
    "Out of bounds of the gameboard"
  );
});

test("default ship positions", () => {
  let player1 = new Player("Chavi");

  expect(() =>
    shipChoices.forEach((ship) => {
      player1.gameboard.placeShips(
        ship.dx,
        ship.dy,
        ship.length,
        ship.axis,
        ship.name
      );
    })
  ).not.toThrow();

  expect(player1.gameboard.grid[2][6]).toBe("submarine");
  expect(player1.gameboard.grid[8][0]).toBe("cruiser");
});
