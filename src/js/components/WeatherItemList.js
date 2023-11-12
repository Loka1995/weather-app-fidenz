const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/WeatherItemList.css">
    <ul class="weather-container__items"></ul>
    `;

export class WeatherItemList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('city-list', WeatherItemList);