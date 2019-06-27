import * as location from './GetLocation.js';
const axios = require('axios');

let key = process.env.REACT_APP_DARKSKY_API;

let weatherInfo = {
    weather: ''
};

setTimeout(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + key + '/' + location.default.lat + ',' + location.default.long)
        .then((res) => {
            weatherInfo.weather = res.data.daily.data.slice(0, 3);
        });
}, 2000);

export default weatherInfo;