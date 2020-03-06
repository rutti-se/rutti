export default ({stores, productSkus}) =>
    fetch(`https://europe-west2-rutti-ca262.cloudfunctions.net/getProducts/`, {
        method: 'POST',
        body: {stores, productSkus},
    }).then(response => response.json());
