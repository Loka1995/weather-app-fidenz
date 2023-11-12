const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/AppMain.css">
    <main class="weather-container"></main>
    `;

export class AppMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-main', AppMain);
