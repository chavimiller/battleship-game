const { Gameboard } = require("../src/gameboard.js");

let myBoard;

beforeEach(() => {
  myBoard = new Gameboard("Chelsea");
});

test("assign player with gameboard", () => {
  expect(myBoard.player).toBe("Chelsea");
});

test("grid exists", () => {
  expect(myBoard.grid).toBeTruthy();
});
