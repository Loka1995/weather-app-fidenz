import { LargeWeatherCardTop } from './LargeWeatherCardTop.js';
import { LargeWeatherCardBottom } from './LargeWeatherCardBottom.js';

const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/LargeWeatherCard.css">
    <div class="weather-item__large-card">
        <button class="weather-item-large-card__back" type="button"><span>&larr;</span></button>
    </div>
`;

export class LargeWeatherCard extends HTMLElement {
    constructor(weatherObj) {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const cardTop = new LargeWeatherCardTop(weatherObj);
        const cardBottom = new LargeWeatherCardBottom(weatherObj);

        this.shadowRoot.childNodes[3].insertAdjacentElement('beforeend', cardTop);
        this.shadowRoot.childNodes[3].insertAdjacentElement('beforeend', cardBottom);
        this.style.display = 'none';
    }

    connectedCallback() {
        const backBtn = this.shadowRoot.querySelector('.weather-item-large-card__back');
        backBtn.addEventListener('click', () => {
            const event = new CustomEvent('show-small-cards');
            this.dispatchEvent(event);
        });
    }
    
    showLargeCard = () => {
        this.style.display = 'block';
    }

    backBtnHandler = () => {
        this.style.display = 'none';
    }
}

customElements.define('large-card', LargeWeatherCard);