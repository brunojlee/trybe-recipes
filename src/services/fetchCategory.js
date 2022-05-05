export const fetchMealsCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchDrinksCategory = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFilterMealsByCategory = async (category) => {
  let response = '';
  switch (category) {
  case 'All':
    response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    break;
  default:
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    break;
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFilterDrinksByCategory = async (category) => {
  let response = '';
  switch (category) {
  case 'All':
    response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    break;
  default:
    response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    break;
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
