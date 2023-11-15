const template = document.createElement("template");
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/ProfileInfo.css">
    <div id="profile-info">
        <div id="profile-pic">
            <img src="" alt="pic">
        </div>
        <div id="user-name">
            <p>
                User name
            </p>
        </div>
    </div>
    `;

export class ProfileInfo extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('profile-info', ProfileInfo);