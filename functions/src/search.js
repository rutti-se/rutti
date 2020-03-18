const express = require('express');
const axios = require('axios');
var cors = require('cors');
const functions = require('firebase-functions');

const app = express();
app.use(cors());

app.post('*', async (req, res) => {
    const { q } = req.query;
    const { stores } = req.body;

    console.log('new request');

    const searchResults = await getSearchResults({ q, stores });
    res.status(searchResults.status).json(searchResults.data);
});

async function getSearchResults({ q, stores }) {
    let requestMap = new Map();
    let requests = [];
    const query = encodeURI(q);

    function addRequest(url, store) {
        requestMap.set(url, store);
        requests.push(axios.get(url).catch(exception => null));
    }

    stores.forEach(store => {
        if (store.retailer === 'ica') {
            addRequest(
                `https://handla.ica.se/api/search-info/v1/search/skus?storeId=${store.storeId}&searchTerm=${query}`,
                store,
            );
        } else if (store.retailer === 'coop') {
            addRequest(
                `https://www.coop.se/ws/v2/coop/users/anonymous/products/search?fields=FULL&storeId=${store.storeId}&text=${query}`,
                store,
            );
        } else if (store.retailer === 'citygross') {
            addRequest(
                `https://www.citygross.se/api/v1/esales/search/quick/?q=${query}&store=${store.storeId}`,
                store,
            );
        }
    });

    addRequest(
        `https://api.mathem.io/ecom-recipe/noauth/search/query?q=${query}&index=0&size=40&mainIngredient=&courseType=&origin=&mealType=&occasion=&other=`,
        { retailer: 'mathem' },
    );

    const results = await axios.all(requests);

    let searchResults = new Map();
    let recipes = {};

    results.forEach(result => {
        const store = requestMap.get(result.config.url);

        if (store.retailer === 'ica') {
            if (result.data && result.data.products) {
                result.data.products.forEach(item => {
                    searchResults.set(item, null);
                });
            }
        } else if (store.retailer === 'coop') {
            if (result.data && result.data.products) {
                result.data.products.forEach(item => {
                    if (item.code) {
                        searchResults.set(item.code, null);
                    }
                });
            }
        } else if (store.retailer === 'citygross') {
            if (result.data && result.data.data) {
                result.data.data.forEach(item => {
                    if (item.gtin) {
                        searchResults.set(item.gtin, null);
                    }
                });
            }
        } else if (store.retailer === 'mathem') {
            console.log('issa mathem');
            recipes = result.data;
        }
    });

    return {
        status: 200,
        data: { products: [...searchResults.keys()], recipes: recipes },
    };
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Invalid parameters.',
    }),
);

app.get('*', (req, res) =>
    res.status(405).json({
        error: 'No GET request allowed.',
    }),
);

module.exports = { app, getSearchResults };
