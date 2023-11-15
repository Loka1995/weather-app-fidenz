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
import { LoginButton } from './components/Login.js';

const auth0 = require('@auth0/auth0-spa-js');

window.addEventListener("load", () => {
    main();
});

const main = async function () {
    try {
        // login button to
        const loginButton = new LoginButton();
        document.body.insertAdjacentElement('beforebegin', loginButton);

        auth0.createAuth0Client({
            domain: "dev-76bkodou00g0wbsb.us.auth0.com",
            clientId: "ly1z2WsnsV6YJiKmvXztFgCo5Z2iqf1O",
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        }).then(async (auth0Client) => {

            // Assumes a button with id "login" in the DOM
            // loka1995 -> I changed the login button to my custom button from LoginButton component.
            loginButton.addEventListener("login-process", (e) => {
                e.preventDefault();
                auth0Client.loginWithRedirect();
            });

            if (location.search.includes("state=") &&
                (location.search.includes("code=") ||
                    location.search.includes("error="))) {
                await auth0Client.handleRedirectCallback();
                window.history.replaceState({}, document.title, "/");

                loginButton.style.display = "none";

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
                    if (Number(localStorage.getItem("stateID")) === largeCard.cardID) {
                        smallCard.hideSmallCardList();
                        largeCard.showLargeCard();
                    }
                })
            }

            // Assumes a button with id "logout" in the DOM
            const logoutButton = document.getElementById("logout");

            logoutButton.addEventListener("click", (e) => {
                e.preventDefault();
                auth0Client.logout();
            });

            const isAuthenticated = await auth0Client.isAuthenticated();
            const userProfile = await auth0Client.getUser();

            // Assumes an element with id "profile" in the DOM
            const profileElement = document.getElementById("profile");

            if (isAuthenticated) {
                profileElement.style.display = "block";
                profileElement.innerHTML = `
            <p>${userProfile.name}</p>
            <img src="${userProfile.picture}" />
          `;                
            } else {
                profileElement.style.display = "none";
            }
        });
    } catch (error) {
        window.alert('Weather data cannot be retrieved!');
        console.error(error);
        console.log(error)
        console.log('Data cannot be loaded...');
    }
}
