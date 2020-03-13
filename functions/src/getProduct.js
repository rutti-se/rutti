const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());

app.post('/:productSku', async (req, res) => {
    const { stores } = req.body;
    const { productSku } = req.params;
    if (!stores || stores.length < 1) {
        return { status: 400, data: { error: 'No stores.' } };
    }

    const productInfo = await getProduct({ productSku, stores });
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

        let productResult = {
            productInformation: {
                gtin,
                name,
                brand,
                imageUrl,
                type,
                description,
                salesUnit,
                originCountry,
                environmentalMarkingCodes,
                fromSweden,
                ingredientInfo,
                grossWeight,
                netWeightVolume,
                nutritionalInfo,
            },
            storeInformation: [],
        };

        results.map(result => {
            if (result) {
                const store = requestMap.get(result.config.url);
                let storeData = {
                    price,
                    comparePrice,
                    isPromotion,
                    currentPromotions: [
                        {
                            type,
                            price,
                            endDate,
                            noOfItemsToDiscount,
                            limitOfItems,
                            forRegisteredCustomer,
                            requiredSpendValue,
                        },
                    ],
                };

                switch (store.retailer) {
                    case 'ica':
                        storeData = result.data.length
                            ? getIcaStoreData(result.data)
                            : null;
                        break;
                    case 'coop':
                        storeData = getCoopStoreData(result.data);
                        break;
                    case 'citygross':
                        storeData = result.data.data[0]
                            ? getCityGrossStoreData(result.data.data[0])
                            : null;
                        break;
                }
                if (data) {
                    productResult.storeInformation.push({
                        store: store,
                        priceInformation: storeData,
                    });
                }
            }
        });

        return { status: 200, data: productResult };
    } catch (exception) {
        return { status: 400, data: { error: exception } };
    }
}

function getIcaStoreData(data) {
    const isPromotion = data.promotions.length > 0;

    let currentPromotions = [];

    data.promotions.forEach(promotion => {
        currentPromotions.push({
            promoId: promotion.promotionId,
            type: promotion.type,
            price: promotion.discountValue,
            comparePrice: promotion.discountedComparePrice,
            endDate: promotion.endUsable,
            noOfItemsToDiscount: promotion.noOfItemsToDiscount,
            limitOfItems:
                promotion.noOfGroupsToDiscount > 0
                    ? promotion.noOfGroupsToDiscount
                    : null,
            forRegisteredCustomer: promotion.forRegisteredCustomer,
            requiredSpendValue: data.promoPriceProps.spendValue,
        });
    });

    return {
        price: data.price.listPriceWithoutDeposit,
        comparePrice: price.comparePrice,
        comparePriceUnit: comparePriceCode,
        isPromotion,
        currentPromotions,
    };
}

function getCoopStoreData(data) {
    const isPromotion = data.potentialPromotions.length > 0;

    let currentPromotions = [];

    data.potentialPromotions.forEach(promotion => {
        currentPromotions.push({
            promoId: promotion.code,
            type: promotion.type,
            price: promotion.discountValue,
            comparePrice: promotion.discountedComparePrice,
            endDate: promotion.endUsable,
            noOfItemsToDiscount: promotion.noOfItemsToDiscount,
            limitOfItems:
                promotion.noOfGroupsToDiscount > 0
                    ? promotion.noOfGroupsToDiscount
                    : null,
            forRegisteredCustomer: promotion.forRegisteredCustomer,
            requiredSpendValue: data.promoPriceProps.spendValue,
        });
    });

    const comparePrice = /\d+\.\d+/.exec(price.comparePrice)[0];

    const comparePriceUnit = string.replace(comparePrice + ' ', '');

    return {
        price: data.pickPrice.value,
        comparePrice,
        comparePriceUnit,
        isPromotion,
        currentPromotions,
    };
}

function getCityGrossStoreData(data) {}

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
