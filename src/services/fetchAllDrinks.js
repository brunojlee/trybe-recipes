const fetchAllDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchAllDrinks;
