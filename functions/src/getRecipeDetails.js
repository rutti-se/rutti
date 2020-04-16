const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();
app.use(cors());

app.get('/:recipeUrl', async (req, res) => {
    const recipeDetails = await getRecipeDetails({
        ...req.params,
        ...req.query,
    });
    res.status(recipeDetails.status).json(recipeDetails.data);
});

async function getRecipeDetails({ recipeUrl, portions }) {
    if (recipeUrl.length < 1) {
        return { status: 400, data: { error: 'No recipeUrl parameter.' } };
    }

    if (!portions || portions < 1) {
        portions = 4;
    }

    return await axios
        .get(
            `https://api.mathem.io/ecom-recipe/noauth/recipes/detail?url=${recipeUrl}${portions &&
                `&portions=${portions}`}`,
        )
        .then(result => ({ status: 200, data: result.data }))
        .catch(error => {
            return { status: 400, data: error };
        });
}

app.get('*', (req, res) =>
    res.status(400).json({
        error: 'Need parameter for recipe url.',
    }),
);

app.post('*', (req, res) =>
    res.status(405).json({
        error: 'No POST request allowed.',
    }),
);

module.exports = { app, getRecipeDetails };
