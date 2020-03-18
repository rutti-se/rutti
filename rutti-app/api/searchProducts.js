export default function({q, stores}) {
    return fetch(
        `https://europe-west2-rutti-ca262.cloudfunctions.net/search?q=${q}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({stores}),
        },
    ).then(response => response.json());
}
