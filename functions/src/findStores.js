const express = require('express');
const axios = require('axios');
const getNearbyCityGrossStores = require('./citygross');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/:zipCode', async (req, res) => {
    const nearbyStores = await getNearbyStores(req.params);
    res.status(nearbyStores.status).json(nearbyStores.data);
});

async function getNearbyStores({ zipCode }) {
    if (!zipCode || zipCode.length < 1) {
        return { status: 400, data: { error: 'No zipCode parameter.' } };
    }
    let requestMap = new Map();
    let requests = [];

    function addRequest(url, store) {
        requestMap.set(url, store);
        requests.push(axios.get(url));
    }

    addRequest(
        `https://handla.ica.se/api/store/v1?zip=${zipCode}&customertype=B2C`,
        'ICA',
    );

    addRequest(
        `https://www.coop.se/ws/v2/coop/pointofservices?query=${zipCode}`,
        'COOP',
    );

    requests.push(getNearbyCityGrossStores(zipCode));

    const results = await axios
        .all(requests)
        .catch(error => ({ error: error }));

    if (results.error) {
        return { status: 400, data: results };
    }

    let storesResults = [];

    results.map(result =>
        storesResults.push({
            store: result.config
                ? requestMap.get(result.config.url)
                : 'CITYGROSS',
            data: result.config ? result.data : result,
        }),
    );

    return { status: 200, data: storesResults };
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Need parameter for zip code.',
    }),
);

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getNearbyStores };
