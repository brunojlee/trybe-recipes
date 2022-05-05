export const fetchMealsIngredientsList = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinksIngredientsList = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
