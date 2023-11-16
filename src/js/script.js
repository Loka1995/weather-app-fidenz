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
import { LogoutButton } from './components/Logout.js';
import { ProfileInfo } from './components/ProfileInfo.js';

const auth0 = require('@auth0/auth0-spa-js');

window.addEventListener("load", () => {
    main();
});

const main = async function () {
    try {
        // login button to
        const loginButton = new LoginButton();
        document.body.insertAdjacentElement('beforebegin', loginButton);

        const profileInfo = new ProfileInfo();
        const logoutBtn = new LogoutButton();

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
                
                document.body.appendChild(profileInfo);
                document.body.appendChild(logoutBtn);
            }

            // Assumes a button with id "logout" in the DOM
            // loka1995 -> "logoutBtn" custom component used instead

            logoutBtn.addEventListener("logout-process", (e) => {
                e.preventDefault();
                auth0Client.logout();
                console.log("user logged out...")
                logoutBtn.style.display = "none";
            });

            const isAuthenticated = await auth0Client.isAuthenticated();
            const userProfile = await auth0Client.getUser();

            // Assumes an element with id "profile" in the DOM
            // loka1995 -> In this case "profileInfo" custom element was used.
            if (isAuthenticated) {
                console.log(profileInfo);
                profileInfo.style.display = "flex";
                profileInfo.setProfilePic(userProfile.picture);
                profileInfo.setUserName(userProfile.name);
            } else {
                profileInfo.style.display = "none";
            }
        });
    } catch (error) {
        window.alert('Weather data cannot be retrieved!');
        console.error(error);
        console.log(error)
        console.log('Data cannot be loaded...');
    }
}
