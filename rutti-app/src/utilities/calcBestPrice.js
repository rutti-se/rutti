export default function(storeInfo) {
    let price = Number.MAX_SAFE_INTEGER;
    storeInfo.map(store => {
        if (
            store.priceInformation.price < price &&
            store.priceInformation.price !== null
        ) {
            price = store.priceInformation.price;
        }
    });

    return price < Number.MAX_SAFE_INTEGER ? price : null;
}
