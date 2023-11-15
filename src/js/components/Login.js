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
        //auth0 docs
        // auth0.createAuth0Client({
        //     domain: "dev-76bkodou00g0wbsb.us.auth0.com",
        //     clientId: "ly1z2WsnsV6YJiKmvXztFgCo5Z2iqf1O",
        //     authorizationParams: {
        //         redirect_uri: window.location.origin
        //     }
        // }).then(async (auth0Client) => {
        //     // Assumes a button with id "login" in the DOM
        //     const loginButton = this.shadowRoot.querySelector("#signinbtn");

        //     loginButton.addEventListener("click", (e) => {
        //         e.preventDefault();
        //         auth0Client.loginWithRedirect();
        //     });

        //     if (location.search.includes("state=") &&
        //         (location.search.includes("code=") ||
        //             location.search.includes("error="))) {
        //         await auth0Client.handleRedirectCallback();
        //         window.history.replaceState({}, document.title, "/");
        //     }

        //     // Assumes a button with id "logout" in the DOM
        //     const logoutButton = document.getElementById("logout");

        //     logoutButton.addEventListener("click", (e) => {
        //         e.preventDefault();
        //         auth0Client.logout();
        //     });

        //     const isAuthenticated = await auth0Client.isAuthenticated();
        //     const userProfile = await auth0Client.getUser();

        //     // Assumes an element with id "profile" in the DOM
        //     const profileElement = document.getElementById("profile");

        //     if (isAuthenticated) {
        //         profileElement.style.display = "block";
        //         profileElement.innerHTML = `
        //     <p>${userProfile.name}</p>
        //     <img src="${userProfile.picture}" />
        //   `;
        //     } else {
        //         profileElement.style.display = "none";
        //     }
        // });
        //auth0 docs conclude.

        this.shadowRoot.querySelector("#signinbtn").addEventListener('click', () => {
            const event = new CustomEvent('login-process');
            this.dispatchEvent(event);
        });
    }
}

customElements.define('login-button', LoginButton);