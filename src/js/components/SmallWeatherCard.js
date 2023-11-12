import { SmallWeatherCardTop } from "./SmallWeatherCardTop.js";
import { SmallWeatherCardBottom } from "./SmallWeatherCardBottom.js";

const template = document.createElement('template');
template.innerHTML =
    `
<link rel="stylesheet" href="/css/SmallWeatherCard.css">
<li class="weather-item">
    <button class="weather-item__close" type="button">&times;</button>
</li>
`;

export class SmallWeatherCard extends HTMLElement {
    constructor(weatherObj) {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const cardTop = new SmallWeatherCardTop(weatherObj);
        const cardBottom = new SmallWeatherCardBottom(weatherObj);

        this.shadowRoot.childNodes[3].insertAdjacentElement('beforeend', cardTop);
        this.shadowRoot.childNodes[3].insertAdjacentElement('beforeend', cardBottom);
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            const event = new CustomEvent('show-large-card');
            this.dispatchEvent(event);
        });
    }    
    
    hideSmallCardList = () => {
        this.parentElement.style.display = 'none';
    }

    showSmallCardList = () => {
        this.parentElement.style.display = 'flex';
    }

}

customElements.define('small-card', SmallWeatherCard);
