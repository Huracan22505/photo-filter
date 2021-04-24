const inputs = document.querySelectorAll(".filters input");
// const outputs = document.querySelectorAll("output");
const resetBtn = document.querySelector(".btn-reset");
const img = document.querySelector("img");

inputs.forEach((input) => input.addEventListener("input", hendleUpdate));
resetBtn.addEventListener("click", onResetBtnClick);

function hendleUpdate() {
  const suffix = this.dataset.sizing || "";
  img.style.setProperty(`--${this.name}`, this.value + suffix);

  const output = document.querySelector(`input[name="${this.name}"] ~ output`);
  output.textContent = this.value;
}

function onResetBtnClick() {
  inputs.forEach((input) => {
    input.value = input.defaultValue;
    const output = document.querySelector(
      `input[name="${input.name}"] ~ output`
    );
    output.textContent = input.value;
  });

  img.style = "";
}
