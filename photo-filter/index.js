const filters = document.querySelectorAll(".filters input");
const outputs = document.querySelectorAll("output");
const resetBtn = document.querySelector(".btn-reset");
const nextBtn = document.querySelector(".btn-next");
const img = document.querySelector("img");
const fullscreenBtn = document.querySelector(".fullscreen");

// fullscreen button logic

fullscreenBtn.addEventListener("click", () => {
  const app = document.documentElement;

  app.requestFullscreen();
  document.exitFullscreen();
});

// filters change logic

filters.forEach((input) => input.addEventListener("input", onFilterChange));

function onFilterChange() {
  const suffix = this.dataset.sizing || "";
  img.style.setProperty(`--${this.name}`, this.value + suffix);

  const output = document.querySelector(`input[name="${this.name}"] ~ output`);
  output.value = this.value;
}

// reset button logic

resetBtn.addEventListener("click", onResetBtnClick);

function onResetBtnClick() {
  filters.forEach((filter) => {
    filter.value = filter.defaultValue;
    const output = document.querySelector(
      `input[name="${filter.name}"] ~ output`
    );
    output.value = filter.value;
  });

  img.style = "";

  nextBtn.classList.remove("btn-active");
  loadLabel.classList.remove("btn-active");
  saveBtn.classList.remove("btn-active");
  resetBtn.classList.add("btn-active");
}

// next button logic

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

  resetBtn.classList.remove("btn-active");
  loadLabel.classList.remove("btn-active");
  saveBtn.classList.remove("btn-active");
  nextBtn.classList.add("btn-active");
}

function createImage(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    img.src = `${src}`;
  };
}

// load button logic

const loadLabel = document.querySelector('label[for="btnInput"]');
const loadInput = document.querySelector('input[type="file"]');

loadInput.addEventListener("change", function (e) {
  const file = loadInput.files[loadInput.files.length - 1];
  console.log(loadInput.files);
  const reader = new FileReader();

  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);

  e.currentTarget.value = "";

  nextBtn.classList.remove("btn-active");
  resetBtn.classList.remove("btn-active");
  saveBtn.classList.remove("btn-active");
  loadLabel.classList.add("btn-active");
});

// canvas logic

const canvas = document.querySelector("canvas");

function drawImage() {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = img.src;

  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    ctx.filter = `blur(${outputs[0].value * 1.8}px) invert(${
      outputs[1].value
    }%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${
      outputs[4].value
    }deg)`;
    console.log("image.onload -> ctx.filter", ctx.filter);
    ctx.drawImage(image, 0, 0);

    var link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  };

  nextBtn.classList.remove("btn-active");
  resetBtn.classList.remove("btn-active");
  loadLabel.classList.remove("btn-active");
  saveBtn.classList.add("btn-active");
}

// save button logic

const saveBtn = document.querySelector(".btn-save");

saveBtn.addEventListener("click", drawImage);
