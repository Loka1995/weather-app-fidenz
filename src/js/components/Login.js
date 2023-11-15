const template = document.createElement('template');
// const auth0 = require('@auth0/auth0-spa-js');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/Login.css">
    <div id="signin-container">
        <img src="/images/main icon.png" alt="weather-app image" id="signin-image">
        <h1 id="signin-heading">Welcome to Weather App</h1>
        <button type="button" id="signinbtn">Sign in to Weather App</button>
    </div>`;

export class LoginButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#signinbtn").addEventListener('click', () => {
            const event = new CustomEvent('login-process');
            this.dispatchEvent(event);
        });
    }
}

customElements.define('login-button', LoginButton);