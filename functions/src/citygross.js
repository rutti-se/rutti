const functions = require('firebase-functions');

const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());

let zips = require('../assets/zips');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = async zipCode => {
    zipCode = zipCode.substr(0, 3);

    const currentPosition = zips.filter(e => e.zip === zipCode)[0];

    let result = await axios.get(
        'https://www.citygross.se/api/v1/sites?siteTypeId=3',
    );

    const { sites } = result.data;

    let nearbyStores = [];

    sites.forEach(site => {
        let sitePosition = zips.filter(
            e => e.zip === site.zipcode.substr(0, 3),
        )[0];

        const dist = getDistanceFromLatLonInKm(
            currentPosition.lat,
            currentPosition.long,
            sitePosition.lat,
            sitePosition.long,
        );

        site.latitude = parseFloat(sitePosition.lat);
        site.longitude = parseFloat(sitePosition.long);

        if (dist < 50) {
            nearbyStores.push(site);
        }
    });
    let requestMap = new Map();
    let requests = [];

    function addRequest(url, store) {
        requestMap.set(url, store);
        requests.push(axios.get(url));
    }

    nearbyStores.forEach(site => {
        addRequest(
            `https://www.citygross.se/api/v1/sites/${site.id}/storeNumber`,
            site,
        );
    });

    let storeNumberResults = await axios.all(requests);
    storeNumberResults.forEach(storeNumberResult => {
        let storeData = requestMap.get(storeNumberResult.config.url);
        storeData.storeId = storeNumberResult.data.storeNumber;
        nearbyStores.push(storeData);
    });

    return nearbyStores;
};
