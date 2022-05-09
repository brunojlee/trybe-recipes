export const fetchMealsAreas = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchFilterMealsByArea = async (category) => {
  let response = '';
  switch (category) {
  case 'All':
    response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    break;
  default:
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`,
    );
    break;
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
