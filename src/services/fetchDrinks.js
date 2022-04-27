const fetchDrinks = async (radioSelected, searchBarInput) => {
  let response = '';
  switch (radioSelected) {
  case 'ingredient':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarInput}`);
    break;
  case 'name':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBarInput}`);
    break;
  case 'first-letter':
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBarInput}`);
    break;
  default:
    return 'Radio not selected';
  }

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchDrinks;
