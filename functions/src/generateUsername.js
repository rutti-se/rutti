const express = require('express');
var cors = require('cors');
const { nouns, adjectives } = require('../assets/words');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
    const generatedUsername = await getGeneratedUsername();
    res.status(generatedUsername.status).json(generatedUsername.data);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function getGeneratedUsername() {
    const adjective = adjectives[getRandomInt(adjectives.length)];

    console.log(adjective);

    const noun = nouns[getRandomInt(nouns.length)];

    return {
        status: 200,
        data: { username: adjective + noun + (getRandomInt(90) + 10) },
    };
}

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getGeneratedUsername };
