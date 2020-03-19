export default ({stores, productSkus}) =>
    fetch(`https://europe-west2-rutti-ca262.cloudfunctions.net/getProducts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({stores, productSkus}),
    }).then(response => response.json());
