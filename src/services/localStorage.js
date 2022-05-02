export const saveCheckedIngredients = (recipeId, recipeData) => {
  localStorage.setItem(`${recipeId}`, JSON.stringify(recipeData));
};

export const getCheckedIngredients = (recipeId) => {
  const chaves = [];
  chaves.push(localStorage.getItem(recipeId));

  return chaves;
};
