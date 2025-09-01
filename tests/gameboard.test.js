const { Gameboard } = require("../src/gameboard.js");

let myBoard;

beforeEach(() => {
  myBoard = new Gameboard();
  // For now use coordinates 0-9, later change to accept coordinates 1-10
  myBoard.placeShips(0, 0, 5, "X", "Carrier");
  myBoard.placeShips(1, 0, 3, "Y", "Cruiser");
});

test("grid exists", () => {
  expect(myBoard.grid).toBeTruthy();
});

test("ships placed along X and Y axes", () => {
  expect(myBoard.grid[0][0]).toBe("Carrier");
  expect(myBoard.grid[0][1]).toBe("Carrier");
  expect(myBoard.grid[0][2]).toBe("Carrier");
  expect(myBoard.grid[0][3]).toBe("Carrier");
  expect(myBoard.grid[0][4]).toBe("Carrier");

  expect(myBoard.grid[1][0]).toBe("Cruiser");
  expect(myBoard.grid[2][0]).toBe("Cruiser");
  expect(myBoard.grid[3][0]).toBe("Cruiser");
});

test("ships do not overlap", () => {
  expect(() => myBoard.placeShips(0, 0, 3, "X", "Cruiser")).toThrow(
    "This spot is already taken"
  );
});
// test that ship stays within bounds of board
test("ship is not out of bounds", () => {
  expect(() => myBoard.placeShips(12, 12, 3, "X", "Cruiser")).toThrow(
    "Out of bounds of the gameboard"
  );
  expect(() => myBoard.placeShips(-1, -2, 3, "X", "Cruiser")).toThrow(
    "Out of bounds of the gameboard"
  );
  expect(() => myBoard.placeShips(0, 10, 3, "Y", "Cruiser")).toThrow(
    "Out of bounds of the gameboard"
  );
});
