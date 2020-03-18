export default ({q, stores}) =>
    fetch(`https://europe-west2-rutti-ca262.cloudfunctions.net/search?q=${q}`, {
        method: 'POST',
        body: {stores},
    }).then(response => response.json());
