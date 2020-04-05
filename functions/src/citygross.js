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
        'https://www.citygross.se/api/v1/PageData/stores',
    );

    const sites = result.data;

    let nearbyStores = [];

    let errorSites = 0;

    sites.forEach(site => {
        if (!site || !site.data.storeLocation.coordinates) {
            errorSites++;
            return;
        }
        const sitePosition = site.data.storeLocation.coordinates.split(',');

        const dist = getDistanceFromLatLonInKm(
            currentPosition.lat,
            currentPosition.long,
            sitePosition[0],
            sitePosition[1],
        );

        site.data.latitude = parseFloat(sitePosition[0]);
        site.data.longitude = parseFloat(sitePosition[1]);

        if (dist < 100) {
            nearbyStores.push(site.data);
        }
    });

    console.log(errorSites + ' citygross stores lack lat-long');

    return nearbyStores;
};
