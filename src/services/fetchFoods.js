const FOODS_BASE_API = 'www.themealdb.com/api/json/v1/1/filter.php?';

const fetchFoods = async (type, value) => {
  let response = '';
  switch (type) {
  case 'ingredient':
    response = await fetch(`${FOODS_BASE_API}i=${value}`);
    break;
  case 'name':
    response = await fetch(`${FOODS_BASE_API}s=${value}`);
    break;
  case 'first-letter':
    response = await fetch(`${FOODS_BASE_API}f=${value}`);
    break;

  default:
    break;
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchFoods;
