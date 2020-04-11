export default function(stores) {
    console.log('STORESSSSS: ', stores);
    let arr = [
        {retailer: 'ica', isSelected: false},
        {retailer: 'coop', isSelected: false},
        {retailer: 'citygross', isSelected: false},
    ];

    stores.map(store => {
        store.store.retailer === 'ica' && (arr[0].isSelected = true);
        store.store.retailer === 'coop' && (arr[1].isSelected = true);
        store.store.retailer === 'citygross' && (arr[2].isSelected = true);
    });

    return arr;
}
