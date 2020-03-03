const express = require('express');
const axios = require('axios');
var cors = require('cors');
const functions = require('firebase-functions');

const app = express();
app.use(cors());

app.get('*', async (req, res) => {
    const searchResults = await getSearchResults(req.query);

    res.status(searchResults.status).json(searchResults.data);
});

async function getSearchResults({ q: query }) {
    const result = await axios
        .get(
            `http://api.dabas.com/DABASService/V2/articles/searchparameter/${query}/json?apikey=${
                functions.config().dabas.key
            }`,
        )
        .catch(error => ({
            error: error,
        }));

    if (result.error) {
        return { status: 400, data: error };
    }

    return { status: 200, data: result.data };
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Invalid parameters.',
    }),
);

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getSearchResults };
