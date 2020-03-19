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

    console.log(productSku);

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
            productInformation: null,
            storeInformation: [],
        };

        results.map(result => {
            if (result) {
                const store = requestMap.get(result.config.url);
                let storeData;

                switch (store.retailer) {
                    case 'ica':
                        if (result.data.length) {
                            storeData = getIcaStoreData(result.data[0]);
                            if (!productResult.productInformation) {
                                productResult.productInformation = getIcaProductInformation(
                                    result.data[0],
                                );
                            }
                        }
                        break;
                    case 'coop':
                        storeData = getCoopStoreData(result.data);
                        if (!productResult.productInformation) {
                            productResult.productInformation = getCoopProductInformation(
                                result.data,
                            );
                        }
                        break;
                    case 'citygross':
                        if (result.data.data[0]) {
                            storeData = getCityGrossStoreData(
                                result.data.data[0],
                            );
                        }
                        if (!productResult.productInformation) {
                            productResult.productInformation = getCityGrossProductInformation(
                                result.data.data[0],
                            );
                        }
                        break;
                }
                if (storeData) {
                    productResult.storeInformation.push({
                        store: store,
                        priceInformation: storeData,
                    });
                }
            }
        });

        return { status: 200, data: productResult };
    } catch (exception) {
        console.log(exception);
        return { status: 400, data: { error: exception } };
    }
}

function getIcaStoreData(data) {
    const isPromotion = data.promotions && data.promotions.length > 0;

    let currentPromotions = [];

    if (isPromotion) {
        data.promotions.forEach(promotion => {
            currentPromotions.push({
                promoId: promotion.promotionId,
                type: promotion.type,
                price: promotion.discountValue,
                comparePrice: promotion.discountedComparePrice,
                endDate: promotion.endUsable,
                noOfItemsToDiscount: promotion.noOfItemsToDiscount,
                limitOfItems:
                    promotion.noOfGroupsToDiscount > 0 &&
                    promotion.noOfGroupsToDiscount,
                forRegisteredCustomer: promotion.forRegisteredCustomer,
                requiredSpendValue: data.promoPriceProps.spendValue,
            });
        });
    }

    return {
        price:
            data.product.salesUnit === 'kgm'
                ? data.price.listPriceWithoutDeposit /
                  (1000 / data.product.meanWeight)
                : data.price.listPriceWithoutDeposit,
        comparePrice: data.price.comparePrice,
        comparePriceUnit: data.price.comparePriceCode,
        isPromotion,
        currentPromotions,
    };
}

function getIcaProductInformation(data) {
    if (!data.product.brand) {
        data.product.brand = 'ICA';
    }
    const icaNames = formatIcaNames(data.product.name, data.product.brand);
    return {
        gtin: data.product.sku,
        name: icaNames.name,
        brand: icaNames.brand,
        imageUrl: `https://assets.icanet.se/t_product_large_v1,f_auto/${data.product.imageId}.jpg`,
        description: data.product.longDescription,
        salesUnit: getUnit(data.product.salesUnit),
        originCountry: data.product.originCountryCode
            ? data.product.originCountryCode.name
            : null,
        environmentalMarkingCodes: data.product.environmentalMarkingCodes,
        fromSweden:
            data.product.originCountryCode &&
            data.product.originCountryCode.code === 'SE',
        ingredientInfo:
            data.product.ingredientInfo &&
            data.product.ingredientInfo.replace('Ingredienser: ', ''),
        weight: data.product.grossWeight,
        nutritionalInfo:
            data.product.nutrientInformations &&
            data.product.nutrientInformations.nutrientStatement,
    };
}

/**
 * workus in progressus
 * */
function getCoopStoreData(data) {
    const isPromotion = data.potentialPromotions.length > 0;

    const comparePrice = /\d+\.\d+/.exec(
        data.comparisonPrice.formattedValue,
    )[0];

    const comparePriceUnit = data.comparisonPrice.formattedValue.replace(
        comparePrice + ' ',
        '',
    );

    let currentPromotions = [];

    data.potentialPromotions.forEach(promotion => {
        let noOfItemsToDiscount, price;

        if (promotion.description.includes('för')) {
            const amounts = promotion.description.split(' för ');
            noOfItemsToDiscount = amounts[0];
            price = amounts[1].replace(':-', '');
        }

        if (
            promotion.description.includes('/kg') ||
            promotion.description.includes('/st')
        ) {
            noOfItemsToDiscount = 1;
            price = data.promotionPrice.value;
        }

        currentPromotions.push({
            promoId: promotion.code,
            type: promotion.type,
            price: price,
            comparePrice: price / (data.pickPrice.value / comparePrice),
            endDate: promotion.endDate,
            noOfItemsToDiscount: noOfItemsToDiscount,
            limitOfItems:
                promotion.maxUseText && promotion.maxUseText.length > 0,
            forRegisteredCustomer: promotion.medmera,
        });
    });

    return {
        price: data.pickPrice.value,
        comparePrice,
        comparePriceUnit,
        isPromotion,
        currentPromotions,
    };
}

function getCoopProductInformation(data) {
    let nutritionalInfo;

    if (!data.foodAnnexNotRequired) {
        nutritionalInfo = '';
        data.foodAnnex.forEach(({ name, value }, index) => {
            if (name.length > 0) {
                nutritionalInfo += name + ': ' + value;
                if (data.foodAnnex.length - 1 !== index) {
                    nutritionalInfo += ', ';
                }
            }
        });
    }

    return {
        gtin: data.code,
        name: data.name,
        brand: data.manufacturer,
        imageUrl: data.images[0].url,
        description: data.description,
        salesUnit: data.unit.name,
        originCountry: data.fromSweden && 'Sverige',
        environmentalMarkingCodes: data.productLabels,
        fromSweden: data.fromSweden,
        ingredientInfo: data.listOfIngredients,
        weight: data.packageSize,
        nutritionalInfo,
    };
}

function getCityGrossStoreData(data) {
    const isPromotion =
        data.prices[0].promotions && data.prices[0].promotions.length > 0;

    let currentPromotions = [];

    if (isPromotion) {
        data.prices[0].promotions.forEach(promotion => {
            currentPromotions.push({
                promoId: promotion.promotionId,
                type: promotion.effectType,
                price: promotion.effectAmount,
                comparePrice: promotion.price.comparisonPrice,
                endDate: promotion.endUsable,
                noOfItemsToDiscount: promotion.numberOfItems,
                limitOfItems:
                    promotion.amountLimitPerReceipt > 0 &&
                    promotion.amountLimitPerReceipt,
                forRegisteredCustomer: promotion.onlyForMembers,
                requiredSpendValue: promotion.purchaseAmount,
            });
        });
    }

    return {
        price: data.prices[0].ordinaryPrice.price,
        comparePrice: data.prices[0].ordinaryPrice.comparisonPrice,
        comparePriceUnit: 'st',
        isPromotion,
        currentPromotions,
    };
}

function getCityGrossProductInformation(data) {
    return {
        gtin: data.gtin,
        name: data.name,
        brand: data.brand,
        imageUrl: data.images[0].url,
        description: data.description,
        salesUnit: '',
        originCountry: data.country,
        environmentalMarkingCodes: data.markings,
        fromSweden: data.country === 'SE',
        ingredientInfo:
            data.foodAndBeverageExtension &&
            data.foodAndBeverageExtension.ingredientStatement,
        weight: data.netContent && data.netContent.value,
        nutrionalInfo:
            data.foodAndBeverageExtension &&
            data.foodAndBeverageExtension.nutrientInformations &&
            data.foodAndBeverageExtension.nutrientInformations[0]
                .nutrientStatement,
    };
}

function getUnit(unit) {
    return 'st';
    // if (unit === 'pce') {
    //     return 'st';
    // } else if (unit === 'kgm') {
    //     return '/kg';
    // }
}

function formatIcaNames(productName, brandName) {
    let name = productName;
    let brand = brandName;

    const index = productName
        .toLowerCase()
        .replace(/å|ä/, 'a')
        .replace(/ö/, 'o')
        .indexOf(brandName.replace(/[-]+/g, ''));

    if (index > -1) {
        name = productName.substr(0, index - 1);
        brand = productName.substr(index, productName.length);
    }
    return { name, brand };
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
