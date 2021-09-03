const appMarkup = `
        <header class="header">
      <h1 class="header-title">Virtual Piano</h1>
    </header>
    <main class="main">
      <div class="btn-container">
        <button class="btn btn-notes btn-active">Notes</button>
        <button class="btn btn-letters">Letters</button>
      </div>
      <div class="piano">
        <div class="piano-key" data-letter="D" data-note="c"></div>
        <div class="piano-key" data-letter="F" data-note="d"></div>
        <div class="piano-key" data-letter="G" data-note="e"></div>
        <div class="piano-key" data-letter="H" data-note="f"></div>
        <div class="piano-key" data-letter="J" data-note="g"></div>
        <div class="piano-key" data-letter="K" data-note="a"></div>
        <div class="piano-key" data-letter="L" data-note="b"></div>
        <div class="keys-sharp">
          <div class="piano-key sharp" data-letter="R" data-note="c♯"></div>
          <div class="piano-key sharp" data-letter="T" data-note="d♯"></div>
          <div class="piano-key sharp none"></div>
          <div class="piano-key sharp" data-letter="U" data-note="f♯"></div>
          <div class="piano-key sharp" data-letter="I" data-note="g♯"></div>
          <div class="piano-key sharp" data-letter="O" data-note="a♯"></div>
        </div>
      </div>
      <button class="fullscreen openfullscreen"></button>
    </main>
`;

export const appRender = (): void => {
  const appElement = document.getElementById('app') as HTMLDivElement;
  appElement.insertAdjacentHTML('afterbegin', appMarkup);
};
