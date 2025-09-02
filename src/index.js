import "./style.css";

import { Player } from "./player";

import { Gameboard } from "./gameboard";

const { formContainer, p1Input, p2Input, submit } = renderGame();
let player2;
let player1;
let currentPlayer;
let nextPlayer;
let currentPlayerBoard = document.createElement("div");
let boardArea = document.createElement("div");

export function renderGame() {
  const mainContainer = document.querySelector("#main-container");

  const formContainer = document.createElement("div");
  formContainer.id = "form-container";
  mainContainer.appendChild(formContainer);

  const p1Input = document.createElement("input");
  p1Input.placeholder = "Player 1";

  const p2Input = document.createElement("input");
  p2Input.placeholder = "Player 2";

  const submit = document.createElement("button");
  submit.textContent = "Submit";
  submit.type = submit;

  formContainer.appendChild(p1Input);
  formContainer.appendChild(p2Input);
  formContainer.appendChild(submit);

  return { mainContainer, formContainer, p1Input, p2Input, submit };
}

export function renderBoards(player1, player2) {
  const boardsContainer = document.createElement("div");
  boardsContainer.id = "board-container";
  mainContainer.appendChild(boardsContainer);

  let rowContainer;
  let square;

  function renderBoard(p) {
    for (let row of p.gameboard.grid) {
      rowContainer = document.createElement("div");
      for (let spot of row) {
        square = document.createElement("div");
      }
    }
  }

  renderBoard(player1);
  renderBoard(player2);
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

// To show opponent's board, only show coordinate values
// equal to "hit" or "miss", that way it will hide
// unrevealed boats or null values
