import "./style.css";
import { Player } from "./player";
import { Gameboard } from "./gameboard";

const mainContainer = document.querySelector("#main-container");
const formContainer = document.createElement("div");
const boardArea = document.createElement("div");

const p1Input = document.createElement("input");
const p2Input = document.createElement("input");
const submit = document.createElement("button");

let player2;
let player1;
let currentPlayer;
let nextPlayer;
let currentPlayerBoard = document.createElement("div");

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

export function renderBoards(player1, player2) {
  const boardsContainer = document.createElement("div");
  boardsContainer.id = "board-container";

  const boardLabels = document.createElement("div");
  boardLabels.id = "board-labels-container";

  const yourBoard = document.createElement("div");
  yourBoard.classList.add("board-label");
  yourBoard.textContent = `Your board (${currentPlayer.name})`;

  const oppsBoard = document.createElement("div");
  oppsBoard.classList.add("board-label");
  oppsBoard.textContent = `Opponent's board (${nextPlayer.name})`;

  mainContainer.appendChild(boardLabels);

  mainContainer.appendChild(boardsContainer);

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
        square.classList.add(type === "self" ? "square" : "square-opp");

        square.dataset.row = rowIndex;
        square.dataset.col = colIndex;

        rowContainer.appendChild(square);
      }
    }
    column.appendChild(boardLabel);
    column.appendChild(aThruJ);
    column.appendChild(board);
    boardFrame.appendChild(oneThruTen);
    boardFrame.appendChild(column);
    boardsContainer.appendChild(boardFrame);
  }

  renderBoard(player1, "self");
  renderBoard(player2, "opp");
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

  renderBoards(currentPlayer, nextPlayer);
});

renderGame();

// To show opponent's board, only show coordinate values
// equal to "hit" or "miss", that way it will hide
// unrevealed boats or null values
