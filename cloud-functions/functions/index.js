const functions = require('firebase-functions');

const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('');

app.get('/search', (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Request method not allowed.' });
    }
    const { q: query } = req.query;

    if (!query) {
        res.status(400).json({ error: 'No query' });
    }

    axios
        .get(
            `http://api.dabas.com/DABASService/V2/articles/searchparameter/${query}/json?apikey=1156f1c4-2973-4b1e-a874-185023cc50c3`,
        )
        .then(result => {
            return res.json(result.data);
        })
        .catch(error => console.log(error));
});

app.post('/:productSku', (req, res) => {
    const { productSku } = req.params;

    if (!/^-?\d+\.?\d*$/.test(productSku)) {
        return res.json({ error: 'Faulty SKU' });
    }

    const { stores } = JSON.parse(req.body);

    if (!stores || stores.length < 1) {
        return res.json({ error: 'No stores.' });
    }

    let requestMap = new Map();
    let requests = [];

    function addRequest(url, store) {
        requestMap.set(url, store);
        requests.push(axios.get(url));
    }

    stores.forEach(store => {
        if (store.retailer === 'ica') {
            console.log('retailer ica');
            addRequest(
                `https://handla.ica.se/api/content/v1/collections/customer-type/B2C/store/${store.storeId}/products?productIds=${productSku}`,
                store,
            );
        } else if (store.retailer === 'coop') {
            console.log('retailer coop');
            addRequest(
                `https://www.coop.se/ws/v2/coop/users/anonymous/products/${productSku}?fields=FULL&storeId=${store.storeId}`,
                store,
            );
        } else if (store.retailer === 'citygross') {
            console.log('retailer citygross');
            addRequest(
                `https://www.citygross.se/api/v1/esales/search/?Q=${productSku}&page=0&store=${store.storeId}`,
                store,
            );
        }
    });

    axios
        .all(requests)
        .then(results => {
            let productResult = [];

            results.map(result =>
                productResult.push({
                    store: requestMap.get(result.config.url),
                    data: result.data,
                }),
            );
            return res.json(productResult);
        })
        .catch(error => res.json(error));
});

exports.api = functions.region('europe-west2').https.onRequest(app);
