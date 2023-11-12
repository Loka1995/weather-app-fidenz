import { OPENWEATHERMAP_ICON_URL } from '../constants/constants.js';
import { fetchDataFromAPI } from './apiHelper.js';
import { timeAndDateFormatter } from './dateAndTimeHelper.js';
import { capFirstLetter } from './stringHelper.js';

// function that returns objects with the formatted data intended to be displayed in our webpage
export const createCityObjects = function (cachedData) {
    try {
        const cityObjects = [];
        const cityWeatherDataList = cachedData;

        for (let i = 0; i < cityWeatherDataList.length; i++) {
            // let cityName = cityWeatherDataList[i].name;
            // let country = cityWeatherDataList[i].sys.country;
            // let temperature = Math.round(cityWeatherDataList[i].main.temp);
            // let minTemp = Math.round(cityWeatherDataList[i].main.temp_min);
            // let maxTemp = Math.round(cityWeatherDataList[i].main.temp_min);
            // let pressure = cityWeatherDataList[i].main.pressure;
            // let humidity = cityWeatherDataList[i].main.humidity;
            // let visibility = (cityWeatherDataList[i].visibility / 1000).toFixed(2);
            // let windSpeed = cityWeatherDataList[i].wind.speed.toFixed(1);
            // let windDirection = cityWeatherDataList[i].wind.deg;
            let timeZoneOffset = cityWeatherDataList[i].sys.timezone;
            // let time = timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).time;
            // let date = timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).date;
            // let sunrise = timeAndDateFormatter(cityWeatherDataList[i].sys.sunrise, timeZoneOffset).time;
            // let sunset = timeAndDateFormatter(cityWeatherDataList[i].sys.sunset, timeZoneOffset).time;
            // let description = capFirstLetter(cityWeatherDataList[i].weather[cityWeatherDataList[i].weather.length - 1].description);
            let descriptionIconCode = cityWeatherDataList[i].weather[cityWeatherDataList[i].weather.length - 1].icon;
            // let iconURL = `${OPENWEATHERMAP_ICON_URL}/${descriptionIconCode}@2x.png`;

            const tempObject = {
                cityName: cityWeatherDataList[i].name,
                country: cityWeatherDataList[i].sys.country,
                temperature: Math.round(cityWeatherDataList[i].main.temp),
                minTemp: Math.round(cityWeatherDataList[i].main.temp_min),
                maxTemp: Math.round(cityWeatherDataList[i].main.temp_max),
                pressure: cityWeatherDataList[i].main.pressure,
                humidity: cityWeatherDataList[i].main.humidity,
                visibility: (cityWeatherDataList[i].visibility / 1000).toFixed(2),
                windSpeed: cityWeatherDataList[i].wind.speed.toFixed(1),
                windDirection: cityWeatherDataList[i].wind.deg,
                time: timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).time,
                date: timeAndDateFormatter(cityWeatherDataList[i].dt, timeZoneOffset).date,
                sunrise: timeAndDateFormatter(cityWeatherDataList[i].sys.sunrise, timeZoneOffset).time,
                sunset: timeAndDateFormatter(cityWeatherDataList[i].sys.sunset, timeZoneOffset).time,
                description: capFirstLetter(cityWeatherDataList[i].weather[cityWeatherDataList[i].weather.length - 1].description),
                iconURL: `${OPENWEATHERMAP_ICON_URL}/${descriptionIconCode}@2x.png`
            };

            cityObjects.push(tempObject);
        }
        return cityObjects;
    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

// function to fetch city codes from the json file
export const fetchCityCodes = async function () {
    const jsonFilePath = '/data/cities.json';
    const cityCodes = [];
    console.log("Trying to fetch city codes...")
    try {
        const dataFromFile = await fetch(jsonFilePath);
        const fileDataInJSON = await dataFromFile.json();
        const cityData = fileDataInJSON.List;
        cityData.forEach(city => cityCodes.push(city.CityCode));
        console.log("Fetching city codes successful...");
        return cityCodes;
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

// function to cache data, data will be cached if data are older than 5 minutes
export const cacheData = async function (cityCodes) {
    const newTime = Date.now();
    let dataExpired = localStorage.getItem("oldTime") != null ? newTime >= Number(localStorage.getItem("oldTime")) + (1000 * 60 * 5) : false;
    let localStorageIsEmpty = (localStorage.getItem("oldTime") === null) && (localStorage.getItem("cityData") === null);
    if (localStorageIsEmpty || dataExpired) {

        // clear the local storage data
        if (!localStorageIsEmpty) {
            localStorage.removeItem("oldTime");
            localStorage.removeItem("cityData");
        }

        // set the oldTime equal to the newTime 
        localStorage.setItem("oldTime", newTime);
        try {
            const fetchedDataFromAPI = await fetchDataFromAPI(cityCodes);

            if (fetchedDataFromAPI) {
                localStorage.setItem("cityData", JSON.stringify(fetchedDataFromAPI));
                console.log("caching data successful...")
            } else {
                localStorage.removeItem('oldTime');
                localStorage.removeItem('cityData');
                throw new Error('Data caching unsuccessful');
            }

        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }
}

// function to retrieve data stored in the cache
// should return data in JSON format
export const retrieveDataFromCache = function (dataKey) {
    const cachedData = localStorage.getItem(dataKey);
    return JSON.parse(cachedData);
}