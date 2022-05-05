export const fetchRandomFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchRandomDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
