const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/AppFooter.css">
    <footer class="weather-footer">
      	<h5>2023 Fidenz Technologies</h5>
    </footer>
    `;

export class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('app-footer', AppFooter);