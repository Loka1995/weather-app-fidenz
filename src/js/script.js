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
import { DOMAIN, CLIENTID } from './constants/constants.js';

const auth0 = require('@auth0/auth0-spa-js');

window.addEventListener("load", () => {
    main();
});

const main = async function () {
    try {
        const loginButton = new LoginButton();
        const appMain = new AppMain();
        const appHeader = new AppHeader();
        const addCity = new AddCityForm();
        const cityList = new WeatherItemList();
        const appFooter = new AppFooter();
        const profileInfo = new ProfileInfo();
        const logoutBtn = new LogoutButton();

        if (localStorage.getItem("isAuthenticated") !== "true") {
            document.body.insertAdjacentElement('beforebegin', loginButton);
        }

        auth0.createAuth0Client({
            domain: `${DOMAIN}`,
            clientId: `${CLIENTID}`,
            cacheLocation: 'localstorage',
            useRefreshTokens: true,
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        }).then(async (auth0Client) => {

            
            // "loginButton" custom element to login users.
            loginButton.addEventListener("login-process", (e) => {
                e.preventDefault();
                auth0Client.loginWithRedirect();
            });

            if (location.search.includes("state=") &&
                (location.search.includes("code=") ||
                    location.search.includes("error="))) {
                await auth0Client.handleRedirectCallback();
                window.history.replaceState({}, document.title, "/");
            }

            const isAuthenticated = await auth0Client.isAuthenticated();
            const userProfile = await auth0Client.getUser();
            localStorage.setItem("isAuthenticated", isAuthenticated);

            // loka1995 -> "profileInfo" custom element to store profile pic and username.
            if (isAuthenticated) {
                loginButton.remove();
                profileInfo.style.display = "flex";
                profileInfo.setProfilePic(userProfile.picture);
                profileInfo.setUserName(userProfile.name);
            } else {
                profileInfo.style.display = "none";
            }

            if (isAuthenticated) {
                document.body.insertAdjacentElement('afterbegin', appMain);
                appMain.shadowRoot.childNodes[3].insertAdjacentElement('afterbegin', appHeader);
                document.body.insertAdjacentElement('beforeend', appFooter);
                appHeader.insertAdjacentElement('afterend', addCity);
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

            // loka1995 -> "logoutBtn" custom element to handle logout.
            logoutBtn.addEventListener("logout-process", (e) => {
                e.preventDefault();
                auth0Client.logout();
                console.log("user logged out...")
                logoutBtn.style.display = "none";
                localStorage.removeItem("stateID");
                localStorage.removeItem("isAuthenticated");
            });

        });
    } catch (error) {
        window.alert('Weather data cannot be retrieved!');
        console.error(error);
        console.log(error)
        console.log('Data cannot be loaded...');
    }
}
