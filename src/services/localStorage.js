export const saveCheckedIngredients = (recipeId, recipeData) => {
  localStorage.setItem(`${recipeId}`, JSON.stringify(recipeData));
};

export const getCheckedIngredients = () => {
  const chaves = []; for (let i = 0; i < localStorage.length; i += 1) {
    chaves.push(localStorage.key(i));
  }
  return chaves;
};
