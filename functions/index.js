const functions = require('firebase-functions');

const findStores = functions
    .region('europe-west2')
    .https.onRequest(require('./src/findStores').app);
const getProduct = functions
    .region('europe-west2')
    .https.onRequest(require('./src/getProduct').app);
const getProducts = functions
    .region('europe-west2')
    .https.onRequest(require('./src/getProducts').app);
const search = functions
    .region('europe-west2')
    .https.onRequest(require('./src/search').app);

module.exports = {
    findStores,
    getProduct,
    getProducts,
    search,
};
