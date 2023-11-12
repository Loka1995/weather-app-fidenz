import { OPENWEATHERMAP_URL, WEATHER_API_KEY } from '../constants/constants.js';

// function to fetch data from the api
export const fetchDataFromAPI = async function (cityCodes) {
    const URL = `${OPENWEATHERMAP_URL}?id=${cityCodes.join()}&units=metric&appid=${WEATHER_API_KEY}`;

    try {
        const dataFromAPI = await fetch(URL);
        const dataFromAPIToJson = await dataFromAPI.json();

        if (dataFromAPI.status == 401 || dataFromAPI.status == 404 || dataFromAPI.status == 429 || dataFromAPI.status == 500
            || dataFromAPI.status == 502 || dataFromAPI.status == 503 || dataFromAPI.status == 504) {
            throw new Error(`${dataFromAPI.status}: ${dataFromAPI.statusText}`);
        } else return dataFromAPIToJson.list;

    } catch (error) {
        console.error(error);
        console.log(error);
    }
}