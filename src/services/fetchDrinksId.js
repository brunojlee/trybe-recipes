const fetchDrinksId = async (recipeId) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchDrinksId;
