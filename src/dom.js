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

  return { formContainer, p1Input, p2Input, submit };
}
