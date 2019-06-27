const axios = require('axios');

let coordinates = {
    lat: '',
    long: '',
    cityName: ''
}

let key = process.env.REACT_APP_LOCATION_API;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location) => {
        coordinates['lat'] = location.coords.latitude;
        coordinates['long'] = location.coords.longitude;

        axios.get('http://open.mapquestapi.com/geocoding/v1/reverse?key=' + key + '&location=' + coordinates['lat'] + ',' + coordinates['long'] + '&includeRoadMetadata=true&includeNearestIntersection=true')
            .then(res => {
                coordinates['cityName'] = res.data.results[0].locations[0].adminArea5;
            });
    })
}

export default coordinates;