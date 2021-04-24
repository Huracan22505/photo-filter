const inputs = document.querySelectorAll(".filters input");
// const outputs = document.querySelectorAll("output");
const resetBtn = document.querySelector(".btn-reset");
const nextBtn = document.querySelector(".btn-next");
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

const date = new Date();
const base =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
let i = 0;
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

nextBtn.addEventListener("click", onNextBtnClick);

function viewBgImage(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    img.src = `${src}`;
  };
}

function onNextBtnClick() {
  const index = i % images.length;
  const hours = date.getHours();
  let timeOfDay;

  if (hours >= 6 && hours <= 11) timeOfDay = "morning/";
  if (hours >= 12 && hours <= 17) timeOfDay = "day/";
  if (hours >= 18 && hours <= 23) timeOfDay = "evening/";
  if (hours >= 0 && hours <= 5) timeOfDay = "night/";

  const imageSrc = base + timeOfDay + images[index];

  viewBgImage(imageSrc);
  i++;

  nextBtn.disabled = true;
  setTimeout(function () {
    nextBtn.disabled = false;
  }, 200);
}
