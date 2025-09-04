import "./style.css";
import { Player } from "./player";

const mainContainer = document.querySelector("#main-container");
const formContainer = document.createElement("div");

const p1Input = document.createElement("input");
const p2Input = document.createElement("input");
const submit = document.createElement("button");

let player2;
let player1;
let currentPlayer;
let nextPlayer;

let boardsContainer = document.createElement("div");
boardsContainer.id = "board-container";

let newContainer = document.createElement("div");
newContainer.id = "new-container";

let sunkenShipContainer = document.createElement("div");
sunkenShipContainer.id = "sunken-ships-container";

let shipChoices = [
  { dx: 4, dy: 6, length: 5, axis: "Y", name: "carrier" },
  { dx: 2, dy: 1, length: 4, axis: "X", name: "battleship" },
  { dx: 6, dy: 0, length: 3, axis: "Y", name: "cruiser" },
  { dx: 2, dy: 6, length: 3, axis: "X", name: "submarine" },
  { dx: 0, dy: 4, length: 2, axis: "X", name: "destroyer" },
];

export function renderGame() {
  formContainer.id = "form-container";
  mainContainer.appendChild(formContainer);

  p1Input.placeholder = "Player 1";
  p2Input.placeholder = "Player 2";

  submit.textContent = "Submit";
  submit.type = submit;

  formContainer.appendChild(p1Input);
  formContainer.appendChild(p2Input);
  formContainer.appendChild(submit);
}

function renderSunkShips(player) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("list-container");

  const playerLabel = document.createElement("div");
  playerLabel.textContent = `${player.name}'s sunken ships:`;
  listContainer.appendChild(playerLabel);

  for (let ship of player.gameboard.ships) {
    if (ship.isSunk()) {
      const shipSunk = document.createElement("div");
      shipSunk.classList.add("ship-text");
      shipSunk.textContent = ship.name;
      listContainer.appendChild(shipSunk);
    }
  }
  sunkenShipContainer.appendChild(listContainer);
}

export function renderBoards(player1, player2) {
  boardsContainer.innerHTML = "";
  newContainer.innerHTML = "";
  let boardLabels = document.createElement("div");
  boardLabels.id = "board-labels-container";

  const yourBoard = document.createElement("div");
  yourBoard.classList.add("board-label");
  yourBoard.textContent = `Your board (${currentPlayer.name})`;

  const oppsBoard = document.createElement("div");
  oppsBoard.classList.add("board-label");
  oppsBoard.textContent = `Opponent's board (${nextPlayer.name})`;

  mainContainer.appendChild(boardLabels);

  function renderBoard(p, type = "self") {
    const boardFrame = document.createElement("div");
    boardFrame.classList.add("board-frame");

    const oneThruTen = document.createElement("div");
    oneThruTen.classList.add("num-coords");
    oneThruTen.textContent = "1 2 3 4 5 6 7 8 9 10";

    const aThruJ = document.createElement("div");
    aThruJ.classList.add("letter-coords");
    aThruJ.textContent = "A B C D E F G H I J";

    const boardLabel = document.createElement("div");
    boardLabel.classList.add("board-label");
    boardLabel.textContent = `${p.name}'s board`;

    const board = document.createElement("div");
    board.classList.add(type === "self" ? "board" : "board-opp");

    const column = document.createElement("div");
    column.classList.add("board-column");

    for (let rowIndex = 0; rowIndex < p.gameboard.grid.length; rowIndex++) {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("row");

      board.appendChild(rowContainer);

      for (
        let colIndex = 0;
        colIndex < p.gameboard.grid[rowIndex].length;
        colIndex++
      ) {
        const square = document.createElement("div");
        const cell = p.gameboard.grid[rowIndex][colIndex];
        square.classList.add("square");

        if (cell === "miss") {
          square.classList.add("square-miss");
        } else if (cell === "hit") {
          square.classList.add("square-hit");
        } else if (cell !== null && type === "self") {
          square.classList.add("square-ship");
        }

        square.dataset.row = rowIndex;
        square.dataset.col = colIndex;

        rowContainer.appendChild(square);

        if (type === "opp") {
          square.addEventListener("click", () => {
            try {
              nextPlayer.gameboard.receiveAttack(rowIndex, colIndex);

              const newCell = nextPlayer.gameboard.grid[rowIndex][colIndex];

              if (newCell === "hit") square.classList.add("square-hit");
              if (newCell === "miss") square.classList.add("square-miss");

              boardsContainer.style.pointerEvents = "none";

              setTimeout(() => {
                if (nextPlayer.gameboard.allShipsSunk()) {
                  const winnerFrame = document.createElement("div");
                  winnerFrame.classList.add("winner-frame");

                  const winner = document.createElement("div");
                  winner.classList.add("winner-message");
                  winner.textContent = `${currentPlayer.name} sunk all of ${nextPlayer.name}'s ships - ${currentPlayer.name} wins!`;

                  const restart = document.createElement("button");
                  restart.textContent = "Restart";

                  restart.addEventListener("click", () => {
                    window.location.reload();
                  });
                  boardsContainer.innerHTML = "";
                  boardsContainer.appendChild(winnerFrame);
                  winnerFrame.appendChild(winner);
                  winnerFrame.appendChild(restart);
                } else {
                  newContainer.innerHTML = "";
                  sunkenShipContainer.innerHTML = "";
                  renderSunkShips(currentPlayer);
                  renderSunkShips(nextPlayer);
                  switchTurns();
                  renderBoards(currentPlayer, nextPlayer);
                  boardsContainer.style.pointerEvents = "auto";
                }
              }, 500);
            } catch (error) {
              alert(error.message);
            }
          });
        }
      }
    }
    column.appendChild(boardLabel);
    column.appendChild(aThruJ);
    column.appendChild(board);
    boardFrame.appendChild(oneThruTen);
    boardFrame.appendChild(column);
    boardsContainer.appendChild(newContainer);
    newContainer.appendChild(boardFrame);
    boardsContainer.appendChild(sunkenShipContainer);
  }

  renderBoard(currentPlayer, "self");
  renderBoard(nextPlayer, "opp");
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (p1Input.value === "" || p2Input.value === "") {
    throw new Error("Need to fill in both player's names");
  }

  player1 = new Player(p1Input.value.trim());
  player2 = new Player(p2Input.value.trim());

  currentPlayer = player1;
  nextPlayer = player2;

  formContainer.remove();
  shipChoices.forEach((ship) => {
    player1.gameboard.placeShips(
      ship.dx,
      ship.dy,
      ship.length,
      ship.axis,
      ship.name
    );
    player2.gameboard.placeShips(
      ship.dx,
      ship.dy,
      ship.length,
      ship.axis,
      ship.name
    );
  });
  mainContainer.appendChild(boardsContainer);
  renderBoards(currentPlayer, nextPlayer);
});

function switchTurns() {
  let change = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = change;
}

renderGame();

// To show opponent's board, only show coordinate values
// equal to "hit" or "miss", that way it will hide
// unrevealed boats or null values
