import { AppMain } from './components/AppMain.js';
import { AppHeader } from './components/AppHeader.js';
import { AppFooter } from './components/AppFooter.js';
import { AddCityForm } from './components/AddCityForm.js';
import { WeatherItemList } from './components/WeatherItemList.js';
import { SmallWeatherCard } from './components/SmallWeatherCard.js';
import { LargeWeatherCard } from './components/LargeWeatherCard.js';
import {
    createCityObjects,
    fetchCityCodes,
    cacheData,
    retrieveDataFromCache
} from './helpers/dataHelper.js';

window.addEventListener("load", () => {
    main();
});

const main = async function () {
    try {
        const appMain = new AppMain();
        document.body.insertAdjacentElement('afterbegin', appMain);

        const appHeader = new AppHeader();
        appMain.shadowRoot.childNodes[3].insertAdjacentElement('afterbegin', appHeader);
        
        const appFooter = new AppFooter();
        document.body.insertAdjacentElement('beforeend', appFooter);

        let addCity = new AddCityForm();
        appHeader.insertAdjacentElement('afterend', addCity);

        let cityList = new WeatherItemList();
        addCity.insertAdjacentElement('afterend', cityList);
    
        const cityCodes = await fetchCityCodes();
        await cacheData(cityCodes);
        const cachedCityWeatherData = await retrieveDataFromCache("cityData");
        const cityObjects = createCityObjects(cachedCityWeatherData);

        cityObjects.forEach(cityObject => {
            let smallCard = new SmallWeatherCard(cityObject);
            let largeCard = new LargeWeatherCard(cityObject);
            smallCard.addEventListener('show-large-card', () => {
                smallCard.hideSmallCardList();
                largeCard.showLargeCard();
            });
            largeCard.addEventListener('show-small-cards', () => {
                largeCard.backBtnHandler();
                smallCard.showSmallCardList();
            })
            cityList.shadowRoot.childNodes[3].appendChild(smallCard);
            appMain.shadowRoot.childNodes[3].insertAdjacentElement('beforeend', largeCard);
        })
    } catch (error) {
        window.alert('Weather data cannot be retrieved!');
        console.error(error);
        console.log(error)
        console.log('Data cannot be loaded...');
    }
}
