const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/AddCityForm.css">
    <form action="" class="weather-container__addCity">
        <input type="text" placeholder="Enter a city" />
        <button type="submit">Add City</button>
    </form>
    `;

export class AddCityForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('add-city', AddCityForm);