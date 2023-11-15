const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/Logout.css">
    <button type="button" id="logoutbtn">
        Log out
    </button>`;

export class LogoutButton extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#logoutbtn').addEventListener("click", () => {
            const event = new CustomEvent("logout-process");
            this.dispatchEvent(event);
        });
    }
}

customElements.define('logout-button', LogoutButton);
