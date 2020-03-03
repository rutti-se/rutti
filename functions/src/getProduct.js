const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());

app.post('/:productSku', async (req, res) => {
    const { stores } = req.body;

    if (!stores || stores.length < 1) {
        return { status: 400, data: { error: 'No stores.' } };
    }

    const productInfo = await getProduct(req.params);
    res.status(productInfo.status).json(productInfo.data);
});

async function getProduct({ productSku, stores }) {
    const skuRegex = /^-?\d+\.?\d*$/;
    if (!skuRegex.test(productSku)) {
        return { status: 400, data: { error: 'Faulty SKU.' } };
    }

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

        return { status: 200, data: productResult };
    } catch (exception) {
        return { status: 400, data: { error: exception } };
    }
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Need parameter for product SKU.',
    }),
);

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getProduct };
