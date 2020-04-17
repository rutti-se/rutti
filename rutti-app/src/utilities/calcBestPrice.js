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
        } else {
            result.price = price;
        }
    } else if (promotionPrice > 0) {
        result.price = quantity * promotionPrice;
        result.price = result.price.toFixed(2);
        result.grantedPromotion = true;
    }

    return result;
}
