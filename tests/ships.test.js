const { Ship } = require("../src/ships.js");

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test("create ship", () => {
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
});

test("calculate hits", () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("is not sunk", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeFalsy();
});

test("is sunk", () => {
  for (let i = 0; i < ship.length; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBeTruthy();
});
