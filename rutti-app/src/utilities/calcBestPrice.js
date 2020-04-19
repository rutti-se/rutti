import getDistanceFromLatLonInKm from './calcDistance';

export default function(storeInfo) {
    let price = Number.MAX_SAFE_INTEGER;
    let retailer = null;
    let promotion = {
        isPromotion: false,
        comparePrice: Number.MAX_SAFE_INTEGER,
        noOfItemsToDiscount: 0,
        promotionPrice: 0,
    };

    storeInfo.map(aStore => {
        const store = aStore.priceInformation;

        if (store.price < price && store.price !== null && store.price > 0) {
            price = store.price;
            retailer = aStore.store.retailer;
        }

        if (
            store.isPromotion &&
            store.currentPromotions[0].comparePrice < store.comparePrice
        ) {
            promotion.isPromotion = true;
            promotion.comparePrice = store.currentPromotions[0].comparePrice;
            promotion.noOfItemsToDiscount =
                store.currentPromotions[0].noOfItemsToDiscount;
            promotion.promotionPrice = store.currentPromotions[0].price;
            retailer = aStore.store.retailer;
        } else if (store.price === 0 || store.price === null) {
            price = store.comparePrice;
        }
    });

    price = price.toFixed(2);
    price = price < Number.MAX_SAFE_INTEGER ? price : null;
    return {price: price, promotion: promotion, retailer: retailer};
}

export function calcTotalPrice(
    price,
    quantity,
    promotionPrice,
    noOfItemsToDiscount,
) {
    let result = {
        price: (price * quantity).toFixed(2),
        grantedPromotion: false,
    };

    if (noOfItemsToDiscount > 1) {
        if (quantity >= noOfItemsToDiscount) {
            let difference = noOfItemsToDiscount * price - promotionPrice;
            result.price -= difference;
            result.price = result.price.toFixed(2);
            result.grantedPromotion = true;
        }
    } else if (promotionPrice > 0) {
        result.price = quantity * promotionPrice;
        result.price = result.price.toFixed(2);
        result.grantedPromotion = true;
    }

    return result;
}

export function getTotalSavings(products) {
    const economicalSavings = products.reduce(
        (a, product) => (a += getProductPrice(product, products).savings),
        0,
    );

    console.log(economicalSavings);

    const environmentalSavings = getEnvironmentalEffect(
        getNecessaryStores(products),
    );
    console.log(environmentalSavings);

    return {economicalSavings, environmentalSavings};
}

export function getProductPrice(product, products) {
    let minPrice = Number.MAX_SAFE_INTEGER;
    let cheapestStore = [];
    let maxPrice = Number.MIN_SAFE_INTEGER;
    let grantedPromotion = false;

    product.data.storeInformation.forEach((storeInfo, index) => {
        grantedPromotion = storeInfo.priceInformation.isPromotion;
        if (storeInfo.priceInformation.isPromotion) {
            let currentPromotion =
                storeInfo.priceInformation.currentPromotions[0];

            // GET ARRAY OF OTHER PRODUCTS
            let otherPromotionProducts = [];

            products.map(
                (e, productIndex) =>
                    e.sku !== product.sku &&
                    e.data.storeInformation.findIndex(
                        a =>
                            a.priceInformation.isPromotion &&
                            a.priceInformation.currentPromotions[0].promoId ===
                                currentPromotion.promoId &&
                            storeInfo.store.storeId === a.store.storeId,
                    ) > -1 &&
                    ((e.index = productIndex) &&
                        otherPromotionProducts.push(e)),
            );

            let totalAmountOfPromoProducts =
                otherPromotionProducts.reduce(
                    (a, product) => a + product.quantity,
                    0,
                ) + product.quantity;

            if (currentPromotion.noOfItemsToDiscount > 1) {
                // MODULATION
                const thisPromoItemsEvensOut =
                    product.quantity % currentPromotion.noOfItemsToDiscount ===
                    0;
                const allPromoItemsEvensOut =
                    totalAmountOfPromoProducts %
                        currentPromotion.noOfItemsToDiscount ===
                    0;
                const individualPrice =
                    currentPromotion.price /
                    currentPromotion.noOfItemsToDiscount;

                if (thisPromoItemsEvensOut || allPromoItemsEvensOut) {
                    //ALL ITEMS SHOULD BE DISCOUNTED
                    minPrice > individualPrice * product.quantity &&
                        (minPrice = individualPrice * product.quantity) &&
                        (cheapestStore = [storeInfo]);
                } else {
                    //JUST A SPECIFIC AMOUNT OF ITEMS SHOULD BE DISCOUNTED, NEEDS
                    //TO KEEP TRACK OF THE OTHER ITEMS IN THE PROMOTION TO MAKE SURE
                    //IT'S COUNTED PROPERLY (THIS ONE STILL NEEDS SOME ATTENTION, BUT IT'S A SUPER EDGE CASE)
                    const thisPromoItemsRest =
                        product.quantity % currentPromotion.noOfItemsToDiscount;
                    const otherPromoItemsRest = otherPromotionProducts.reduce(
                        (a, e) =>
                            a +
                            (e.quantity % currentPromotion.noOfItemsToDiscount),
                        0,
                    );

                    const justThisProductPrice =
                        (product.quantity - thisPromoItemsRest) *
                        individualPrice;
                    const restPrice =
                        otherPromoItemsRest === 0
                            ? thisPromoItemsRest *
                              storeInfo.priceInformation.price
                            : thisPromoItemsRest + otherPromoItemsRest >=
                                  currentPromotion.noOfItemsToDiscount &&
                              thisPromoItemsRest * individualPrice;

                    minPrice > justThisProductPrice + restPrice &&
                        (minPrice = justThisProductPrice + restPrice) &&
                        (cheapestStore = [storeInfo]) &&
                        (thisPromoItemsRest === 0 &&
                            (grantedPromotion = false));
                }
            } else if (currentPromotion.limitOfItems) {
                // MAKE SURE TO NOT DISCOUNT TOO MANY ITEMS
                const itemsWithoutDiscount =
                    product.quantity - currentPromotion.limitOfItems;

                const price =
                    itemsWithoutDiscount * storeInfo.priceInformation.price +
                    currentPromotion.limitOfItems * currentPromotion.price;

                minPrice > price &&
                    (minPrice = price) &&
                    (cheapestStore = [storeInfo]);
            } else {
                // JUST ADD THE DISCOUNT

                const price = product.quantity * currentPromotion.price;

                minPrice > price &&
                    (minPrice = price) &&
                    (cheapestStore = [storeInfo]);
            }
        }
        // CHECK NORMAL PRICE
        minPrice > storeInfo.priceInformation.price * product.quantity &&
            (minPrice = storeInfo.priceInformation.price * product.quantity) &&
            (cheapestStore = [storeInfo]);
        minPrice === storeInfo.priceInformation.price * product.quantity &&
            cheapestStore.push(storeInfo);
        maxPrice < storeInfo.priceInformation.price * product.quantity &&
            (maxPrice = storeInfo.priceInformation.price * product.quantity);
    });

    return {
        price: minPrice,
        cheapestStore,
        grantedPromotion,
        savings: maxPrice - minPrice,
    };
}

export function getNecessaryStores(products) {
    let storesMap = new Map();

    const productBestPrices = products.map(product =>
        getProductPrice(product, products),
    );

    productBestPrices.forEach(({cheapestStore}) => {
        if (cheapestStore.length === 1) {
            //PRODUCT IS CHEAP IN MULTIPLE PLACES
            let temp = cheapestStore[0];
            temp.isNecessary = true;
            storesMap.set(temp.store.retailer + '-' + temp.store.storeId, temp);
        } else {
            cheapestStore.forEach(cheapStore => {
                const storeMapId =
                    cheapStore.store.retailer + '-' + cheapStore.store.storeId;

                if (!storesMap.has(storeMapId)) {
                    storesMap.set(storeMapId, cheapStore);
                }
            });
        }
    });

    return [...storesMap.values()];
}

export function getBestStore(products) {
    let storeCounterMap = new Map();
    products.forEach(product => {
        console.log(product);
        product.data.storeInformation.map(storeInfo => {
            const storeMapId =
                storeInfo.store.retailer + '-' + storeInfo.store.storeId;
            if (storeCounterMap.has(storeMapId)) {
                let value =
                    storeCounterMap.get(storeMapId).productsAvailable + 1;
                storeCounterMap.set(storeMapId, {
                    productsAvailable: value,
                    store: storeInfo.store,
                });
            } else {
                storeCounterMap.set(storeMapId, {
                    productsAvailable: 1,
                    store: storeInfo.store,
                });
            }
        });
    });

    let bestAmountOfProducts = 0;
    let bestStore = [];

    storeCounterMap.forEach(popularStore => {
        if (popularStore.productsAvailable > bestAmountOfProducts) {
            bestAmountOfProducts = popularStore.productsAvailable;
            bestStore = [popularStore];
        } else if (popularStore.productsAvailable === bestAmountOfProducts) {
            bestStore.push(popularStore);
        }
    });

    return bestStore;
}

export function getEnvironmentalEffect(stores) {
    const CO2_PER_KM = 140;
    const BIRDS_DISTANCE_TO_ROAD_MULTIPLIER = 4;

    return stores.reduce(
        (a, value, i) =>
            i > 0 &&
            (a +=
                i > 0 &&
                getDistanceFromLatLonInKm(
                    stores[i - 1].store.latitude,
                    stores[i - 1].store.longitude,
                    stores[i].store.latitude,
                    stores[i].store.longitude,
                ) *
                    BIRDS_DISTANCE_TO_ROAD_MULTIPLIER *
                    CO2_PER_KM),
        0,
    );
}
