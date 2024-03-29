const appMarkup = `
    <header class="header">
      <h1 class="header-title">Photo-filter</h1>
    </header>
    <main class="main">
      <div class="filters">
        <label>
          Blur:
          <input
            name="blur"
            data-sizing="px"
            type="range"
            min="0"
            max="10"
            value="0"
          />
          <output name="result">0</output>
        </label>
        <label>
          Invert:
          <input
            name="invert"
            data-sizing="%"
            type="range"
            min="0"
            max="100"
            value="0"
          />
          <output name="result">0</output>
        </label>
        <label>
          Sepia:
          <input
            name="sepia"
            data-sizing="%"
            type="range"
            min="0"
            max="100"
            value="0"
          />
          <output name="result">0</output>
        </label>
        <label>
          Saturate:
          <input
            name="saturate"
            data-sizing="%"
            type="range"
            min="0"
            max="200"
            value="100"
          />
          <output name="result">100</output>
        </label>
        <label>
          Hue rotate:
          <input
            name="hue"
            data-sizing="deg"
            type="range"
            min="0"
            max="360"
            value="0"
          />
          <output name="result">0</output>
        </label>
      </div>
      <div class="editor">
        <div class="btn-container">
          <button class="btn btn-reset">Reset</button>
          <button class="btn btn-next btn-active">Next picture</button>
          <label class="btn btn-load" for="btnInput">
            Load picture
            <input
              class="btn-load--input"
              id="btnInput"
              name="upload"
              type="file"
              placeholder="Load picture"
            />
          </label>
          <button class="btn btn-save">Save picture</button>
        </div>
        <img src="assets/img/img.jpg" alt="image" />
      </div>
    </main>
    <button class="fullscreen openfullscreen"></button>
    <canvas></canvas>
`;

export const appRender = (): void => {
  const appElement = document.getElementById('app') as HTMLDivElement;
  appElement.insertAdjacentHTML('afterbegin', appMarkup);
};
