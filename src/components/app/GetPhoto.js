import * as location from './GetLocation.js';
const axios = require('axios');

let key = process.env.REACT_APP_FLICKR_API;

let photoInfo = [
    {
        id: '',
        farm: '',
        server: '',
        secret: '',
        photoSrc: ''
    },
    {
        id: '',
        farm: '',
        server: '',
        secret: '',
        photoSrc: ''
    },
    {
        id: '',
        farm: '',
        server: '',
        secret: '',
        photoSrc: ''
    },
];

checkIfDataLoaded();

function getImage() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&tags=' + location.default.cityName
    + '%2C+building&tag_mode=all&format=json&nojsoncallback=1')
        .then((res) => {
            let photosArray = res.data.photos.photo;

            for (let i = 0; i <= 2; i++) {
                let randomPhoto = photosArray[Math.floor(Math.random() * photosArray.length)];
                photoInfo[i].id = randomPhoto.id;
                photoInfo[i].farm = randomPhoto.farm;
                photoInfo[i].secret = randomPhoto.secret;
                photoInfo[i].server = randomPhoto.server;
            }
        })
        .then(() => {
            for (let i = 0; i <= 2; i++) {
                photoInfo[i].photoSrc = 'http://farm' + photoInfo[i].farm + '.staticflickr.com/' + photoInfo[i].server
                    + '/' + photoInfo[i].id + '_' + photoInfo[i].secret + '_b.jpg';
                photoInfo[i].photoSrcSmall = 'http://farm' + photoInfo[i].farm + '.staticflickr.com/' + photoInfo[i].server
            }
        });
    setImage();
}

function setImage() {
    let backgroundImageOne = document.getElementsByClassName("WeatherNowBg")[0];

    if (typeof(backgroundImageOne) !== 'undefined' && backgroundImageOne != null) {
        let backgroundImageTwo = document.getElementsByClassName("WeatherTomorrowBg")[0];
        let backgroundImagesThree = document.getElementsByClassName("WeatherLaterBg")[0];
        let backgroundArray = [backgroundImageOne, backgroundImageTwo, backgroundImagesThree];

        for (let i = 0; i < backgroundArray.length; i++) {
                backgroundArray[i].style.filter = "blur(5px) invert(25%) saturate(2)";
                backgroundArray[i].style.webkitBackgroundSize = "cover";
                backgroundArray[i].style.backgroundImage = 'url(' + photoInfo[i].photoSrc + ')';
        }
    } else {
        setTimeout(() => {
            setImage();
        }, 1000)
    }
}

function checkIfDataLoaded() {
    if (location.default.cityName === '') {
        setTimeout(() => {
            checkIfDataLoaded();
        }, 1000);
    } else {
        getImage();
    }
}

export default photoInfo;