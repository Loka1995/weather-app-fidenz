(()=>{"use strict";const e=document.createElement("template");e.innerHTML='\n    <link rel="stylesheet" href="/css/AppMain.css">\n    <main class="weather-container"></main>\n    ';class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(e.content.cloneNode(!0))}}customElements.define("app-main",t);const s=document.createElement("template");s.innerHTML='\n    <link rel="stylesheet" href="/css/AppHeader.css">\n    <header class="weather-container__header">\n        \t<img src="/images/main icon.png" alt="main icon" />\n        \t<h1>Weather App</h1>\n    </header>\n    ';class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(s.content.cloneNode(!0))}}customElements.define("app-header",n);const i=document.createElement("template");i.innerHTML='\n    <link rel="stylesheet" href="/css/AppFooter.css">\n    <footer class="weather-footer">\n      \t<h5>2023 Fidenz Technologies</h5>\n    </footer>\n    ';class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(i.content.cloneNode(!0))}}customElements.define("app-footer",a);const o=document.createElement("template");o.innerHTML='\n    <link rel="stylesheet" href="/css/AddCityForm.css">\n    <form action="" class="weather-container__addCity">\n        <input type="text" placeholder="Enter a city" />\n        <button type="submit">Add City</button>\n    </form>\n    ';class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(o.content.cloneNode(!0))}}customElements.define("add-city",r);const c=document.createElement("template");c.innerHTML='\n    <link rel="stylesheet" href="/css/WeatherItemList.css">\n    <ul class="weather-container__items"></ul>\n    ';class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(c.content.cloneNode(!0))}}customElements.define("city-list",l);const h=["#388EE7","#6249CC","#40B681","#DE944E","#9C3A3A"],d=document.createElement("template");d.innerHTML='\n    <link rel="stylesheet" href="/css/SmallWeatherCardTop.css">\n    <section class="weather-item__top">\n    <div class="weather-item-top__left">\n        <div class="weather-item__city-date">\n            <h3 class="weather-item__city"></h3>\n            <span class="weather-item__date"></span>\n        </div>\n        <div class="weather-item__description">\n            <img alt="image" class="weather-description__image"/>\n            <span class="weather-description"></span>\n        </div>\n    </div>\n    <div class="weather-item-top__right">\n        <span class="weather-item__temperature"></span>\n        <div class="weather-item__minmaxtemp">\n            <span class="weather-item__tempMin"></span>\n            <span class="weather-item__tempMax"></span>\n        </div>\n    </div>\n    </section>\n    ';class m extends HTMLElement{static cardNumber=0;constructor(e){super(),m.cardNumber++,this.colorId=m.cardNumber,this._cityName=e.cityName,this._country=e.country,this._temperature=e.temperature,this._minTemp=e.minTemp,this._maxTemp=e.maxTemp,this._time=e.time,this._date=e.date,this._description=e.description,this._iconURL=e.iconURL,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.content.cloneNode(!0)),this.shadowRoot.querySelector(".weather-item__top").style.backgroundColor=h[this.colorId%5],this.shadowRoot.querySelector(".weather-item__city").textContent=`${this._cityName}, ${this._country}`,this.shadowRoot.querySelector(".weather-item__date").textContent=`${this._time}, ${this._date}`,this.shadowRoot.querySelector(".weather-item__temperature").innerHTML=`${this._temperature}&deg;c`,this.shadowRoot.querySelector(".weather-description__image").src=`${this._iconURL}`,this.shadowRoot.querySelector(".weather-description").textContent=`${this._description}`,this.shadowRoot.querySelector(".weather-item__tempMin").innerHTML=`<b>Temp Min:</b> ${this._minTemp}&deg;c`,this.shadowRoot.querySelector(".weather-item__tempMax").innerHTML=`<b>Temp Max:</b> ${this._maxTemp}&deg;c`}}customElements.define("smallcard-top",m);const p=document.createElement("template");p.innerHTML='\n    <link rel="stylesheet" href="/css/SmallWeatherCardBottom.css">\n    <section class="weather-item__bottom">\n        <div class="weather-item-bottom__left">\n            <span class="weather-item__pressure"></span>\n            <span class="weather-item__humidity"></span>\n            <span class="weather-item__visibility"></span>\n        </div>\n        <div class="weather-item-bottom__middle">\n            <img src="/images/direction.png" alt="image" />\n            <span class="weather-item__wind-details"></span>\n        </div>\n        <div class="weather-item-bottom__right">\n            <span class="weather-item__sunrise"></span>\n            <span class="weather-item__sunset"></span>\n        </div>\n    </section>\n    ';class _ extends HTMLElement{constructor(e){super(),this._pressure=e.pressure,this._humidity=e.humidity,this._visibility=e.visibility,this._windSpeed=e.windSpeed,this._windDirection=e.windDirection,this._sunrise=e.sunrise,this._sunset=e.sunset,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(p.content.cloneNode(!0)),this.shadowRoot.querySelector(".weather-item__pressure").innerHTML=`<b>Pressure: </b>${this._pressure}hPa`,this.shadowRoot.querySelector(".weather-item__humidity").innerHTML=`<b>Humidity: </b>${this._humidity}%`,this.shadowRoot.querySelector(".weather-item__visibility").innerHTML=`<b>Visibility: </b>${this._visibility}km`,this.shadowRoot.querySelector(".weather-item__wind-details").textContent=`${this._windSpeed}m/s ${this._windDirection} degrees`,this.shadowRoot.querySelector(".weather-item__sunrise").innerHTML=`<b>Sunrise: </b>${this._sunrise}`,this.shadowRoot.querySelector(".weather-item__sunset").innerHTML=`<b>Sunset: </b>${this._sunset}`}}customElements.define("smallcard-bottom",_);const u=document.createElement("template");u.innerHTML='\n<link rel="stylesheet" href="/css/SmallWeatherCard.css">\n<li class="weather-item">\n    <button class="weather-item__close" type="button">&times;</button>\n</li>\n';class w extends HTMLElement{constructor(e){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(u.content.cloneNode(!0));const t=new m(e),s=new _(e);this.shadowRoot.childNodes[3].insertAdjacentElement("beforeend",t),this.shadowRoot.childNodes[3].insertAdjacentElement("beforeend",s)}connectedCallback(){this.addEventListener("click",(()=>{const e=new CustomEvent("show-large-card");this.dispatchEvent(e)}))}hideSmallCardList=()=>{this.parentElement.style.display="none"};showSmallCardList=()=>{this.parentElement.style.display="flex"}}customElements.define("small-card",w);const y=["#388EE7","#6249CC","#40B681","#DE944E","#9C3A3A"],g=document.createElement("template");g.innerHTML='\n    <link rel="stylesheet" href="/css/LargeWeatherCardTop.css">\n    <section class="weather-item-large__top" >\n        <div class="weather-item-large-top__top">\n            <h2 class="weather-item-large__city"></h2>\n            <span class="weather-item-large__date"></span>\n        </div>\n        <div class="weather-item-large-top__bottom">\n            <div class="weather-item-large-top-bottom__weather-description">\n                <img alt="image" class="weather-description__image-large">\n                <span class="weather-description__large"></span>\n            </div>\n            <div class="weather-item-large-top-bottom__temperatures">\n                <span class="weather-item-large__temperature"></span>\n                <span class="weather-item-large__temperature-min"></span>\n                <span class="weather-item-large__temperature-max"></span>\n            </div>\n        </div>\n    </section>\n    ';class b extends HTMLElement{static cardNumber=0;constructor(e){super(),b.cardNumber++,this.colorId=b.cardNumber,this._cityName=e.cityName,this._country=e.country,this._temperature=e.temperature,this._minTemp=e.minTemp,this._maxTemp=e.maxTemp,this._time=e.time,this._date=e.date,this._description=e.description,this._iconURL=e.iconURL,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(g.content.cloneNode(!0)),this.shadowRoot.querySelector(".weather-item-large__top").style.backgroundColor=y[this.colorId%5],this.shadowRoot.querySelector(".weather-item-large__city").textContent=`${this._cityName}, ${this._country}`,this.shadowRoot.querySelector(".weather-item-large__date").textContent=`${this._time}, ${this._date}`,this.shadowRoot.querySelector(".weather-item-large__temperature").innerHTML=`${this._temperature}&deg;c`,this.shadowRoot.querySelector(".weather-description__image-large").src=`${this._iconURL}`,this.shadowRoot.querySelector(".weather-description__large").textContent=`${this._description}`,this.shadowRoot.querySelector(".weather-item-large__temperature-min").innerHTML=`<b>Temp Min:</b> ${this._minTemp}&deg;c`,this.shadowRoot.querySelector(".weather-item-large__temperature-max").innerHTML=`<b>Temp Max:</b> ${this._maxTemp}&deg;c`}}customElements.define("largecard-top",b);const S=document.createElement("template");S.innerHTML='\n    <link rel="stylesheet" href="/css/LargeWeatherCardBottom.css">\n    <section class="weather-item-large__bottom">\n        <div class="weather-item-large-bottom__left">\n            <span class="weather-item-large__pressure"></span>\n            <span class="weather-item-large__humidity"></span>\n            <span class="weather-item-large__visibility"></span>\n        </div>\n        <div class="weather-item-large-bottom__middle">\n            <img src="/images/direction.png" alt="image" />\n            <span class="weather-item-large__wind-details"></span>\n        </div>\n        <div class="weather-item-large-bottom__right">\n            <span class="weather-item-large__sunrise"></span>\n            <span class="weather-item-large__sunset"></span>\n        </div>\n    </section>\n    ';class T extends HTMLElement{constructor(e){super(),this._pressure=e.pressure,this._humidity=e.humidity,this._visibility=e.visibility,this._windSpeed=e.windSpeed,this._windDirection=e.windDirection,this._sunrise=e.sunrise,this._sunset=e.sunset,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(S.content.cloneNode(!0)),this.shadowRoot.querySelector(".weather-item-large__pressure").innerHTML=`<b>Pressure: </b>${this._pressure}hPa`,this.shadowRoot.querySelector(".weather-item-large__humidity").innerHTML=`<b>Humidity: </b>${this._humidity}%`,this.shadowRoot.querySelector(".weather-item-large__visibility").innerHTML=`<b>Visibility: </b>${this._visibility}km`,this.shadowRoot.querySelector(".weather-item-large__wind-details").textContent=`${this._windSpeed}m/s ${this._windDirection} degrees`,this.shadowRoot.querySelector(".weather-item-large__sunrise").innerHTML=`<b>Sunrise: </b>${this._sunrise}`,this.shadowRoot.querySelector(".weather-item-large__sunset").innerHTML=`<b>Sunset: </b>${this._sunset}`}}customElements.define("largecard-bottom",T);const f=document.createElement("template");f.innerHTML='\n    <link rel="stylesheet" href="/css/LargeWeatherCard.css">\n    <div class="weather-item__large-card">\n        <button class="weather-item-large-card__back" type="button"><span>&larr;</span></button>\n    </div>\n';class E extends HTMLElement{static refreshID=0;constructor(e){super(),E.refreshID++,this.cardID=E.refreshID,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(f.content.cloneNode(!0));const t=new b(e),s=new T(e);this.shadowRoot.childNodes[3].insertAdjacentElement("beforeend",t),this.shadowRoot.childNodes[3].insertAdjacentElement("beforeend",s),this.style.display="none"}connectedCallback(){this.shadowRoot.querySelector(".weather-item-large-card__back").addEventListener("click",(()=>{const e=new CustomEvent("show-small-cards");this.dispatchEvent(e)}))}showLargeCard=()=>{this.style.display="block",localStorage.setItem("stateID",this.cardID),console.log(this.cardID)};backBtnHandler=()=>{this.style.display="none",localStorage.removeItem("stateID")}}customElements.define("large-card",E);const L=function(e,t){const s=new Date(1e3*e+1e3*t).toUTCString().split(" "),n=s[2]+" "+s[1],i=s[4].split(":"),a=i[0];return{date:n,time:`${a%12==0?12:a%12}:${i[1]}${a>12?"pm":"am"}`}};window.addEventListener("load",(()=>{v()}));const v=async function(){try{const e=new t;document.body.insertAdjacentElement("afterbegin",e);const s=new n;e.shadowRoot.childNodes[3].insertAdjacentElement("afterbegin",s);const i=new a;document.body.insertAdjacentElement("beforeend",i);let o=new r;s.insertAdjacentElement("afterend",o);let c=new l;o.insertAdjacentElement("afterend",c);const h=await async function(){const e=[];console.log("Trying to fetch city codes...");try{const t=await fetch("/data/cities.json");return(await t.json()).List.forEach((t=>e.push(t.CityCode))),console.log("Fetching city codes successful..."),e}catch(e){console.log(e),console.error(e)}}();await async function(e){const t=Date.now();let s=null!=localStorage.getItem("oldTime")&&t>=Number(localStorage.getItem("oldTime"))+3e5,n=null===localStorage.getItem("oldTime")&&null===localStorage.getItem("cityData");if(n||s){n||(localStorage.removeItem("oldTime"),localStorage.removeItem("cityData")),localStorage.setItem("oldTime",t);try{const t=await async function(e){const t=`http://api.openweathermap.org/data/2.5/group?id=${e.join()}&units=metric&appid=72d608564b7620acf0b6c74125e6f59c`;try{const e=await fetch(t),s=await e.json();if(401==e.status||404==e.status||429==e.status||500==e.status||502==e.status||503==e.status||504==e.status)throw new Error(`${e.status}: ${e.statusText}`);return s.list}catch(e){console.error(e),console.log(e)}}(e);if(!t)throw localStorage.removeItem("oldTime"),localStorage.removeItem("cityData"),new Error("Data caching unsuccessful");localStorage.setItem("cityData",JSON.stringify(t)),console.log("caching data successful...")}catch(e){console.error(e),console.log(e)}}}(h);(function(e){try{const s=[],n=e;for(let e=0;e<n.length;e++){let i=n[e].sys.timezone,a=n[e].weather[n[e].weather.length-1].icon;const o={cityName:n[e].name,country:n[e].sys.country,temperature:Math.round(n[e].main.temp),minTemp:Math.round(n[e].main.temp_min),maxTemp:Math.round(n[e].main.temp_max),pressure:n[e].main.pressure,humidity:n[e].main.humidity,visibility:(n[e].visibility/1e3).toFixed(2),windSpeed:n[e].wind.speed.toFixed(1),windDirection:n[e].wind.deg,time:L(n[e].dt,i).time,date:L(n[e].dt,i).date,sunrise:L(n[e].sys.sunrise,i).time,sunset:L(n[e].sys.sunset,i).time,description:(t=n[e].weather[n[e].weather.length-1].description,t.trim().split(" ").map((e=>e.charAt(0).toUpperCase().concat(e.substring(1,e.length)))).join(" ")),iconURL:`https://openweathermap.org/img/wn/${a}@2x.png`};s.push(o)}return s}catch(e){console.error(e),console.log(e)}var t})(await function(e){const t=localStorage.getItem("cityData");return JSON.parse(t)}()).forEach((t=>{let s=new w(t),n=new E(t);s.addEventListener("show-large-card",(()=>{s.hideSmallCardList(),n.showLargeCard()})),n.addEventListener("show-small-cards",(()=>{n.backBtnHandler(),s.showSmallCardList()})),c.shadowRoot.childNodes[3].appendChild(s),e.shadowRoot.childNodes[3].insertAdjacentElement("beforeend",n),Number(localStorage.getItem("stateID"))===n.cardID&&(s.hideSmallCardList(),n.showLargeCard())}))}catch(e){window.alert("Weather data cannot be retrieved!"),console.error(e),console.log(e),console.log("Data cannot be loaded...")}}})();