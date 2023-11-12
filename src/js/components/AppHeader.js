const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/AppHeader.css">
    <header class="weather-container__header">
        	<img src="/images/main icon.png" alt="main icon" />
        	<h1>Weather App</h1>
    </header>
    `;

export class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-header', AppHeader);