const fetchIngredientsImage = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
  console.log(response);
  console.log(response.url);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchIngredientsImage;
