const colors = ['#388EE7', '#6249CC', '#40B681', '#DE944E', '#9C3A3A'];
const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/LargeWeatherCardTop.css">
    <section class="weather-item-large__top" >
        <div class="weather-item-large-top__top">
            <h2 class="weather-item-large__city"></h2>
            <span class="weather-item-large__date"></span>
        </div>
        <div class="weather-item-large-top__bottom">
            <div class="weather-item-large-top-bottom__weather-description">
                <img alt="image" class="weather-description__image-large">
                <span class="weather-description__large"></span>
            </div>
            <div class="weather-item-large-top-bottom__temperatures">
                <span class="weather-item-large__temperature"></span>
                <span class="weather-item-large__temperature-min"></span>
                <span class="weather-item-large__temperature-max"></span>
            </div>
        </div>
    </section>
    `;

export class LargeWeatherCardTop extends HTMLElement {
    static cardNumber = 0;
    constructor(weatherObj) {
        super();

        LargeWeatherCardTop.cardNumber++;
        this.colorId = LargeWeatherCardTop.cardNumber;

        this._cityName = weatherObj.cityName;
        this._country = weatherObj.country;
        this._temperature = weatherObj.temperature;
        this._minTemp = weatherObj.minTemp;
        this._maxTemp = weatherObj.maxTemp;
        this._time = weatherObj.time;
        this._date = weatherObj.date;
        this._description = weatherObj.description;
        this._iconURL = weatherObj.iconURL;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.weather-item-large__top').style.backgroundColor = colors[this.colorId % 5];

        this.shadowRoot.querySelector('.weather-item-large__city').textContent = `${this._cityName}, ${this._country}`;
        this.shadowRoot.querySelector('.weather-item-large__date').textContent = `${this._time}, ${this._date}`;
        this.shadowRoot.querySelector('.weather-item-large__temperature').innerHTML = `${this._temperature}&deg;c`;
        this.shadowRoot.querySelector('.weather-description__image-large').src = `${this._iconURL}`;
        this.shadowRoot.querySelector('.weather-description__large').textContent = `${this._description}`;
        this.shadowRoot.querySelector('.weather-item-large__temperature-min').innerHTML = `<b>Temp Min:</b> ${this._minTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item-large__temperature-max').innerHTML = `<b>Temp Max:</b> ${this._maxTemp}&deg;c`;
    }
}

customElements.define('largecard-top', LargeWeatherCardTop);