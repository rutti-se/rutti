export default ({zipCode}) =>
    fetch(
        `https://europe-west2-rutti-ca262.cloudfunctions.net/findStores/${zipCode}`,
    ).then(response => response.json());
