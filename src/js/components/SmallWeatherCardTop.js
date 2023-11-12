const colors = ['#388EE7', '#6249CC', '#40B681', '#DE944E', '#9C3A3A'];
const template = document.createElement('template');
template.innerHTML =
    `
    <link rel="stylesheet" href="/css/SmallWeatherCardTop.css">
    <section class="weather-item__top">
    <div class="weather-item-top__left">
        <div class="weather-item__city-date">
            <h3 class="weather-item__city"></h3>
            <span class="weather-item__date"></span>
        </div>
        <div class="weather-item__description">
            <img alt="image" class="weather-description__image"/>
            <span class="weather-description"></span>
        </div>
    </div>
    <div class="weather-item-top__right">
        <span class="weather-item__temperature"></span>
        <div class="weather-item__minmaxtemp">
            <span class="weather-item__tempMin"></span>
            <span class="weather-item__tempMax"></span>
        </div>
    </div>
    </section>
    `;

export class SmallWeatherCardTop extends HTMLElement {
    static cardNumber = 0;
    constructor(weatherObj) {
        super();

        SmallWeatherCardTop.cardNumber++;
        this.colorId = SmallWeatherCardTop.cardNumber;

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
        this.shadowRoot.querySelector('.weather-item__top').style.backgroundColor = colors[this.colorId % 5];
        // this.shadowRoot.querySelector('.weather-item').setAttribute('id', this.colorId);

        this.shadowRoot.querySelector('.weather-item__city').textContent = `${this._cityName}, ${this._country}`;
        this.shadowRoot.querySelector('.weather-item__date').textContent = `${this._time}, ${this._date}`;
        this.shadowRoot.querySelector('.weather-item__temperature').innerHTML = `${this._temperature}&deg;c`;
        this.shadowRoot.querySelector('.weather-description__image').src = `${this._iconURL}`;
        this.shadowRoot.querySelector('.weather-description').textContent = `${this._description}`;
        this.shadowRoot.querySelector('.weather-item__tempMin').innerHTML = `<b>Temp Min:</b> ${this._minTemp}&deg;c`;
        this.shadowRoot.querySelector('.weather-item__tempMax').innerHTML = `<b>Temp Max:</b> ${this._maxTemp}&deg;c`;
    }
}

customElements.define('smallcard-top', SmallWeatherCardTop);