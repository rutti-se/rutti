export default () =>
    fetch(
        `https://europe-west2-rutti-ca262.cloudfunctions.net/generateUsername`,
    ).then(response => response.json());
