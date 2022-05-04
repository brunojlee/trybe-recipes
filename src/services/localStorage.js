export const saveCheckedIngredients = (recipeId, recipeData) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newData = { ...data.meals, [recipeId]: recipeData };
  data.meals = newData;
  localStorage.setItem('inProgressRecipes', JSON.stringify(data));
};

export const saveCheckedIngredientsDrink = (recipeId, recipeData) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newData = { ...data.cocktails, [recipeId]: recipeData };
  data.cocktails = newData;
  localStorage.setItem('inProgressRecipes', JSON.stringify(data));
};

export const getCheckedIngredients = (recipeId) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return data.meals[recipeId];
};

export const getCheckedIngredientsDrinks = (recipeId) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return data.cocktails[recipeId];
};
