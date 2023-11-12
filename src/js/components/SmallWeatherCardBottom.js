const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/SmallWeatherCardBottom.css">
    <section class="weather-item__bottom">
        <div class="weather-item-bottom__left">
            <span class="weather-item__pressure"></span>
            <span class="weather-item__humidity"></span>
            <span class="weather-item__visibility"></span>
        </div>
        <div class="weather-item-bottom__middle">
            <img src="/images/direction.png" alt="image" />
            <span class="weather-item__wind-details"></span>
        </div>
        <div class="weather-item-bottom__right">
            <span class="weather-item__sunrise"></span>
            <span class="weather-item__sunset"></span>
        </div>
    </section>
    `;

export class SmallWeatherCardBottom extends HTMLElement {
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

        this.shadowRoot.querySelector('.weather-item__pressure').innerHTML = `<b>Pressure: </b>${this._pressure}hPa`;
        this.shadowRoot.querySelector('.weather-item__humidity').innerHTML = `<b>Humidity: </b>${this._humidity}%`;
        this.shadowRoot.querySelector('.weather-item__visibility').innerHTML = `<b>Visibility: </b>${this._visibility}km`;
        this.shadowRoot.querySelector('.weather-item__wind-details').textContent = `${this._windSpeed}m/s ${this._windDirection} degrees`;
        this.shadowRoot.querySelector('.weather-item__sunrise').innerHTML = `<b>Sunrise: </b>${this._sunrise}`;
        this.shadowRoot.querySelector('.weather-item__sunset').innerHTML = `<b>Sunset: </b>${this._sunset}`;
    }
}

customElements.define('smallcard-bottom', SmallWeatherCardBottom);