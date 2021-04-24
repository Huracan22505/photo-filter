const filters = document.querySelectorAll(".filters input");
const resetBtn = document.querySelector(".btn-reset");
const nextBtn = document.querySelector(".btn-next");
const img = document.querySelector("img");

filters.forEach((input) => input.addEventListener("input", onFilterChange));
resetBtn.addEventListener("click", onResetBtnClick);

function onFilterChange() {
  const suffix = this.dataset.sizing || "";
  img.style.setProperty(`--${this.name}`, this.value + suffix);

  const output = document.querySelector(`input[name="${this.name}"] ~ output`);
  output.textContent = this.value;
}

function onResetBtnClick() {
  filters.forEach((filter) => {
    filter.value = filter.defaultValue;
    const output = document.querySelector(
      `input[name="${filter.name}"] ~ output`
    );
    output.textContent = filter.value;
  });

  img.style = "";
}

const BASE_URL =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
let counter = 0;
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

function onNextBtnClick() {
  const index = counter % images.length;

  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours >= 6 && hours <= 11) timeOfDay = "morning/";
  if (hours >= 12 && hours <= 17) timeOfDay = "day/";
  if (hours >= 18 && hours <= 23) timeOfDay = "evening/";
  if (hours >= 0 && hours <= 5) timeOfDay = "night/";

  const imageSrc = `${BASE_URL}${timeOfDay}${images[index]}`;

  createImage(imageSrc);
  counter++;
}

function createImage(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    img.src = `${src}`;
  };
}
