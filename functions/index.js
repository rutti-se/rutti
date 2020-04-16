const functions = require('firebase-functions');

const findStores = functions
    .region('europe-west2')
    .https.onRequest(require('./src/findStores').app);

const getRecipeDetails = functions
    .region('europe-west2')
    .https.onRequest(require('./src/getRecipeDetails').app);
const getProduct = functions
    .region('europe-west2')
    .https.onRequest(require('./src/getProduct').app);
const getProducts = functions
    .region('europe-west2')
    .https.onRequest(require('./src/getProducts').app);
const search = functions
    .region('europe-west2')
    .https.onRequest(require('./src/search').app);
const generateUsername = functions
    .region('europe-west2')
    .https.onRequest(require('./src/generateUsername').app);

module.exports = {
    findStores,
    getRecipeDetails,
    getProduct,
    getProducts,
    search,
    generateUsername,
};
