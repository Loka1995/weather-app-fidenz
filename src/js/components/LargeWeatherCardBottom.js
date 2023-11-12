const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/LargeWeatherCardBottom.css">
    <section class="weather-item-large__bottom">
        <div class="weather-item-large-bottom__left">
            <span class="weather-item-large__pressure"></span>
            <span class="weather-item-large__humidity"></span>
            <span class="weather-item-large__visibility"></span>
        </div>
        <div class="weather-item-large-bottom__middle">
            <img src="/images/direction.png" alt="image" />
            <span class="weather-item-large__wind-details"></span>
        </div>
        <div class="weather-item-large-bottom__right">
            <span class="weather-item-large__sunrise"></span>
            <span class="weather-item-large__sunset"></span>
        </div>
    </section>
    `;

export class LargeWeatherCardBottom extends HTMLElement {
    constructor(weatherObj) {
        super();

        this._pressure = weatherObj.pressure;
        this._humidity = weatherObj.humidity;
        this._visibility = weatherObj.visibility;
        this._windSpeed = weatherObj.windSpeed;
        this._windDirection = weatherObj.windDirection;
        this._sunrise = weatherObj.sunrise;
        this._sunset = weatherObj.sunset;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.weather-item-large__pressure').innerHTML = `<b>Pressure: </b>${this._pressure}hPa`;
        this.shadowRoot.querySelector('.weather-item-large__humidity').innerHTML = `<b>Humidity: </b>${this._humidity}%`;
        this.shadowRoot.querySelector('.weather-item-large__visibility').innerHTML = `<b>Visibility: </b>${this._visibility}km`;
        this.shadowRoot.querySelector('.weather-item-large__wind-details').textContent = `${this._windSpeed}m/s ${this._windDirection} degrees`;
        this.shadowRoot.querySelector('.weather-item-large__sunrise').innerHTML = `<b>Sunrise: </b>${this._sunrise}`;
        this.shadowRoot.querySelector('.weather-item-large__sunset').innerHTML = `<b>Sunset: </b>${this._sunset}`;
    }
}

customElements.define('largecard-bottom', LargeWeatherCardBottom);