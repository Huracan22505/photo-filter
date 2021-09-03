import { appRender } from './app';
import './style.scss';

appRender();

function playAudio(src: string) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const piano = document.querySelector('.piano') as HTMLElement;
const [...pianoKeys]: any = document.querySelectorAll('.piano-key');
const lettersBtn = document.querySelector('.btn-letters') as HTMLElement;
const notesBtn = document.querySelector('.btn-notes') as HTMLElement;
const fullscreenBtn = document.querySelector('.fullscreen') as HTMLElement;

fullscreenBtn.addEventListener('click', () => {
  const app = document.documentElement;

  app.requestFullscreen();
  document.exitFullscreen();
});

lettersBtn.addEventListener('click', () => {
  pianoKeys.map((el: HTMLElement) => el.classList.add('piano-key-letter'));

  lettersBtn.classList.add('btn-active');
  notesBtn.classList.remove('btn-active');
});

notesBtn.addEventListener('click', () => {
  [...pianoKeys].map(el => el.classList.remove('piano-key-letter'));
  notesBtn.classList.add('btn-active');
  lettersBtn.classList.remove('btn-active');
});

piano.addEventListener('mousedown', e => {
  const target = <HTMLElement>e.target;

  if (target.classList.contains('piano-key')) {
    target.classList.add('piano-key-active');
  }

  if (target.dataset.note) {
    const { note } = target.dataset;
    const src = `./assets/audio/${note}.mp3`;
    playAudio(src);
  }

  function onMouseOver(event: any) {
    const pianoTarget = <HTMLElement>event.target;

    if (pianoTarget.classList.contains('piano-key')) {
      pianoKeys.forEach((el: HTMLElement) => {
        if (el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        }
      });

      pianoTarget.classList.add('piano-key-active');

      const { note } = pianoTarget.dataset;
      const src = `./assets/audio/${note}.mp3`;
      playAudio(src);
    }
  }

  piano.addEventListener('mouseover', onMouseOver);

  window.addEventListener('mouseup', () => {
    piano.removeEventListener('mouseover', onMouseOver);

    pianoKeys.forEach((el: HTMLElement) => {
      if (el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
      }
    });
  });
});

window.addEventListener('keydown', event => {
  if (event.repeat) return;

  const { code } = event;

  if (code === 'KeyD') {
    const src = `./assets/audio/c.mp3`;
    playAudio(src);

    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'D')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyF') {
    const src = `./assets/audio/d.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'F')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyG') {
    const src = `./assets/audio/e.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'G')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyH') {
    const src = `./assets/audio/f.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'H')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyJ') {
    const src = `./assets/audio/g.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'J')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyK') {
    const src = `./assets/audio/a.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'K')
      .classList.add('piano-key-active');
  }

  if (code === 'KeyL') {
    const src = `./assets/audio/b.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'L')
      .classList.add('piano-key-active');
  }

  // sharps

  if (code === 'KeyR') {
    const src = `./assets/audio/c♯.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'R')
      .classList.add(`piano-key-active`);
  }
  if (code === 'KeyT') {
    const src = `./assets/audio/d♯.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'T')
      .classList.add('piano-key-active');
  }
  if (code === 'KeyU') {
    const src = `./assets/audio/f♯.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'U')
      .classList.add('piano-key-active');
  }
  if (code === 'KeyI') {
    const src = `./assets/audio/g♯.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'I')
      .classList.add('piano-key-active');
  }
  if (code === 'KeyO') {
    const src = `./assets/audio/a♯.mp3`;
    playAudio(src);
    pianoKeys
      .find((el: HTMLElement) => el.dataset.letter === 'O')
      .classList.add('piano-key-active');
  }

  window.addEventListener(
    'keyup',
    () => {
      pianoKeys.map((el: HTMLElement) =>
        el.classList.remove('piano-key-active'),
      );
    },
    { once: true },
  );
});
