const template = document.createElement("template");
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/ProfileInfo.css">
    <div id="profile-info">
        <div id="profile-pic">
            <img src="" alt="pic" id="profile-pic__img">
        </div>
        <div id="user-name">
            <p id="user-name__name">
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

    setProfilePic(src) {
        this.shadowRoot.querySelector('#profile-pic__img').setAttribute('src', `${src}`);
    }

    setUserName(userName) {
        this.shadowRoot.querySelector('#user-name__name').textContent = `${userName}`;
    }
}

customElements.define('profile-info', ProfileInfo);