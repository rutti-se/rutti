const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const getNearbyCityGrossStores = require('./citygross');
var cors = require('cors');

const app = express();
app.use(cors());

// app.get('/citygross', async (req, res) => {
//     if (req.method !== 'GET') {
//         res.status(405).json({ error: 'Request method not allowed.' });
//     }
//     let { zipCode } = req.query;

//     if (!zipCode) {
//         res.status(400).json({ error: 'No zipCode parameter.' });
//     }

//     const nearbyStores = await getNearbyCityGrossStores(zipCode);

//     res.json(nearbyStores);
// });

app.get('/findStores', (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Request method not allowed.' });
    }
    const { zipCode } = req.query;

    if (!zipCode) {
        res.status(400).json({ error: 'No zipCode parameter.' });
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

    axios
        .all(requests)
        .then(results => {
            let storesResults = [];

            results.map(result =>
                storesResults.push({
                    store: result.config
                        ? requestMap.get(result.config.url)
                        : 'CITYGROSS',
                    data: result.config ? result.data : result,
                }),
            );

            return res.status(200).json(storesResults);
        })
        .catch(error => res.status(500).json(error));
});

app.post('/getProducts', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Request method not allowed.' });
    }

    const { stores, productSkus } = req.body;

    if (!stores || stores.length < 1) {
        return res.status(400).json({ error: 'No stores.' });
    }

    let requests = [];

    productSkus.forEach(productSku => {
        if (/^-?\d+\.?\d*$/.test(productSku)) {
            requests.push(getProductInfo(productSku, stores));
        }
    });

    const results = await axios.all(requests);

    res.json(results);
});

app.post('/getProduct/:productSku', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Request method not allowed.' });
    }

    const { productSku } = req.params;

    if (!/^-?\d+\.?\d*$/.test(productSku)) {
        return res.status(400).json({ error: 'Faulty SKU' });
    }

    const { stores } = JSON.parse(req.body);

    if (!stores || stores.length < 1) {
        return res.status(400).json({ error: 'No stores.' });
    }

    res.json(await getProductInfo());
});

async function getProductInfo(productSku, stores) {
    try {
        let requestMap = new Map();
        let requests = [];

        function addRequest(url, store) {
            requestMap.set(url, store);
            requests.push(axios.get(url).catch(exception => null));
        }

        stores.forEach(store => {
            if (store.retailer === 'ica') {
                addRequest(
                    `https://handla.ica.se/api/content/v1/collections/customer-type/B2C/store/${store.storeId}/products?productIds=${productSku}`,
                    store,
                );
            } else if (store.retailer === 'coop') {
                addRequest(
                    `https://www.coop.se/ws/v2/coop/users/anonymous/products/${productSku}?fields=FULL&storeId=${store.storeId}`,
                    store,
                );
            } else if (store.retailer === 'citygross') {
                addRequest(
                    `https://www.citygross.se/api/v1/esales/search/?Q=${productSku}&page=0&store=${store.storeId}`,
                    store,
                );
            }
        });

        const results = await axios.all(requests);

        let productResult = [];

        results.map(result => {
            if (result) {
                const store = requestMap.get(result.config.url);
                let data = {};
                switch (store.retailer) {
                    case 'ica':
                        data = result.data.length ? result.data : null;
                        break;
                    case 'coop':
                        data = result.data;
                        break;
                    case 'citygross':
                        data = result.data.data[0] ? result.data.data[0] : null;
                        break;
                }
                if (data) {
                    productResult.push({ store: store, data: data });
                }
            }
        });

        return productResult;
    } catch (exception) {
        return exception;
    }
}

exports.api = functions.region('europe-west2').https.onRequest(app);
