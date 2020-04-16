export default ({recipeUrl, portions}) =>
    fetch(
        `https://europe-west2-rutti-ca262.cloudfunctions.net/getRecipeDetails/${recipeUrl}&portions=${portions}`,
    ).then(response => response.json());
