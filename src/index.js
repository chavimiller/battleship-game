import "./style.css";

import { gameSetUp } from "./dom";
import { Player } from "./player";

const { formContainer, p1Input, p2Input, submit } = gameSetUp();
let player2;
let player1;

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (p1Input.value === "" || p2Input.value === "") {
    throw new Error("Need to fill in both player's names");
  }
  player1 = new Player(p1Input.value.trim());
  player2 = new Player(p2Input.value.trim());
  formContainer.remove();
});
