const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/Login.css">
    <div id="signin-container">
        <img src="/images/main icon.png" alt="weather-app image" id="signin-image">
        <h1 id="signin-heading">Welcome to Weather App</h1>
        <a href="https://dev-76bkodou00g0wbsb.us.auth0.com"><button type="button" id="signinbtn">Sign in to Weather App</button></a>
    </div>`;

export class LoginButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('login-button', LoginButton);