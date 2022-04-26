const DRINKS_BASE_API = 'www.thecocktaildb.com/api/json/v1/1/filter.php?';

const fetchDrinks = async (radioType) => {
  let response = '';
  switch (radioType) {
  case 'ingredient':
    response = await fetch(`${DRINKS_BASE_API}i=${radioType.value}`);
    break;
  case 'name':
    response = await fetch(`${DRINKS_BASE_API}s=${radioType.value}`);
    break;
  case 'first-letter':
    response = await fetch(`${DRINKS_BASE_API}f=${radioType.value}`);
    break;

  default:
    break;
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchDrinks;
