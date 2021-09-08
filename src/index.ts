import { appRender } from './app';
import './style.css';

appRender();

const filters = document.querySelectorAll<HTMLInputElement>('.filters input');
const outputs = document.querySelectorAll('output');
const resetBtn = document.querySelector('.btn-reset') as HTMLInputElement;
const nextBtn = document.querySelector('.btn-next') as HTMLElement;
const img = document.querySelector('img') as any;
const fullscreenBtn = document.querySelector('.fullscreen') as HTMLElement;
const loadLabel = document.querySelector(
  'label[for="btnInput"]',
) as HTMLElement;
const loadInput = document.querySelector(
  'input[type="file"]',
) as HTMLInputElement;
const saveBtn = document.querySelector('.btn-save') as HTMLElement;

// fullscreen button logic

fullscreenBtn.addEventListener('click', () => {
  const app = document.documentElement;

  app.requestFullscreen();
  document.exitFullscreen();
});

// filters change logic
function onFilterChange(this: HTMLInputElement) {
  const suffix = this.dataset.sizing || '';
  img.style.setProperty(`--${this.name}`, this.value + suffix);

  const output = document.querySelector(
    `input[name="${this.name}"] ~ output`,
  ) as HTMLOutputElement;
  output.value = this.value;
}

filters.forEach(input => input.addEventListener('input', onFilterChange));

// reset button logic
const onResetBtnClick = () => {
  filters.forEach(filter => {
    // eslint-disable-next-line no-param-reassign
    filter.value = filter.defaultValue;

    const output = document.querySelector(
      `input[name="${filter.name}"] ~ output`,
    ) as HTMLOutputElement;

    output.value = filter.value;
  });

  img.setAttribute('style', '');

  nextBtn.classList.remove('btn-active');
  loadLabel.classList.remove('btn-active');
  saveBtn.classList.remove('btn-active');
  resetBtn.classList.add('btn-active');
};

resetBtn.addEventListener('click', onResetBtnClick);

// next button logic

const BASE_URL =
  'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
let counter = 0;
const images = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
];

function createImage(src: string | ArrayBuffer | null) {
  const image: any = new Image();
  image.src = src;
  image.onload = () => {
    img.src = `${src}`;
  };
}

function onNextBtnClick() {
  const index = counter % images.length;

  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours >= 6 && hours <= 11) timeOfDay = 'morning/';
  if (hours >= 12 && hours <= 17) timeOfDay = 'day/';
  if (hours >= 18 && hours <= 23) timeOfDay = 'evening/';
  if (hours >= 0 && hours <= 5) timeOfDay = 'night/';

  const imageSrc = `${BASE_URL}${timeOfDay}${images[index]}`;

  createImage(imageSrc);
  counter += 1;

  resetBtn.classList.remove('btn-active');
  loadLabel.classList.remove('btn-active');
  saveBtn.classList.remove('btn-active');
  nextBtn.classList.add('btn-active');
}

nextBtn.addEventListener('click', onNextBtnClick);

// load button logic

loadInput.addEventListener('change', (event): void => {
  if (!loadInput.files) return;
  let { value } = <HTMLInputElement>event.currentTarget;

  const file = loadInput.files[loadInput.files.length - 1];

  const reader = new FileReader();

  reader.onload = () => {
    img.src = reader.result;
  };

  reader.readAsDataURL(file);

  value = '';

  nextBtn.classList.remove('btn-active');
  resetBtn.classList.remove('btn-active');
  saveBtn.classList.remove('btn-active');
  loadLabel.classList.add('btn-active');
});

// canvas logic

const canvas = document.querySelector('canvas') as HTMLCanvasElement;

function drawImage() {
  const image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = img.src;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.filter = `blur(${Number(outputs[0].value) * 1.6}px) invert(${
      outputs[1].value
    }%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${
      outputs[4].value
    }deg)`;
    ctx.drawImage(image, 0, 0);

    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  nextBtn.classList.remove('btn-active');
  resetBtn.classList.remove('btn-active');
  loadLabel.classList.remove('btn-active');
  saveBtn.classList.add('btn-active');
}

// save button logic

saveBtn.addEventListener('click', drawImage);
