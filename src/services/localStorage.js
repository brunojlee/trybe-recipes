export const saveCheckedIngredients = (recipeId, recipeData) => {
  localStorage.setItem('meals', JSON.stringify({ [recipeId]: recipeData }));
};

export const saveCheckedIngredientsDrink = (recipeId, recipeData) => {
  localStorage.setItem('drinks', JSON.stringify({ [recipeId]: recipeData }));
};

export const getCheckedIngredients = (recipeId) => {
  const chaves = [];
  chaves.push(localStorage.getItem(recipeId));

  return chaves;
};
