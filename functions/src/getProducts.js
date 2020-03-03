const express = require('express');
const axios = require('axios');
var cors = require('cors');
const { getProduct } = require('./getProduct');
const app = express();
app.use(cors());

app.post('/', async (req, res) => {
    const products = await getProducts(req.body);

    res.status(products.status).json(products.data);
});

async function getProducts({ stores, productSkus }) {
    if (!stores || stores.length < 1) {
        return { status: 400, data: { error: 'No stores.' } };
    }

    if (!productSkus || productSkus.length < 1) {
        return { status: 400, data: { error: 'No product SKUs.' } };
    }
    let requests = [];

    productSkus.forEach(productSku => {
        requests.push(getProduct({ productSku, stores }));
    });

    const results = await axios.all(requests);

    return { status: 200, data: results };
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Invalid parameters.',
    }),
);

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getProducts };
