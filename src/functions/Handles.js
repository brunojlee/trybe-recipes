import {
  getCheckedIngredients, getCheckedIngredientsDrinks,
} from '../services/localStorage';

export function checkBoxStyles(isChecked, index) {
  return isChecked.find((el) => el === `ingredient${index}`)
    ? { textDecoration: 'none solid rgb(0,0,0)' }
    : { textDecoration: 'line-through solid rgb(0,0,0)' };
}

export function getCheckedsDrinks(recipeId) {
  return getCheckedIngredientsDrinks(recipeId)
    ? getCheckedIngredientsDrinks(recipeId) : [];
}

export function getCheckedsMeals(recipeId) {
  return getCheckedIngredients(recipeId)
    ? getCheckedIngredients(recipeId) : [];
}

export function handleIngredientsMeasuresData(
  loading, recipeData, setIngredients, setMeasures,
) {
  if (loading) {
    const entries = Object.entries(recipeData);
    const ingredientFilter = entries
      .filter((el) => el[0].includes('strIngredient'));
    const measuresFilter = entries
      .filter((el) => el[0].includes('strMeasure'));
    const filteredIngredient = ingredientFilter
      .filter((ingredientInfo) => ingredientInfo[1] !== null)
      .filter((ingredientInfo) => ingredientInfo[1].length > 0);
    setIngredients(filteredIngredient);
    const filteredMeasures = measuresFilter
      .filter((measureInfo) => measureInfo[1] !== null)
      .filter((measureInfo) => measureInfo[1].length > 0);
    setMeasures(filteredMeasures);
  }
}

export function checkStyle(isChecked, index) {
  return isChecked.find((el) => el === `ingredient${index}`)
    ? { textDecoration: 'line-through solid rgb(0,0,0)' }
    : { textDecoration: 'none solid rgb(0,0,0)' };
}

export function isHandleFavoriteFunction(recipeInfo, recipeId,
  favoriteRecipes, setFavoriteRecipes) {
  return () => {
    if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', [JSON.stringify(filteredRecipes)]);
      setFavoriteRecipes(filteredRecipes);
    } else {
      const getLocalStorage = localStorage.key('favoriteRecipes') === null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      localStorage.setItem('favoriteRecipes', [JSON.stringify([...getLocalStorage,
        recipeInfo])]);
      setFavoriteRecipes([...favoriteRecipes, recipeInfo]);
    }
  };
}

export function handleChangeOut(isChecked, setIsChecked) {
  return ({ target }) => {
    const { name } = target;
    const filter = isChecked.filter((el) => el !== name);
    const updateCheckedIngredients = () => {
      if (target.checked) {
        setIsChecked(() => ([
          ...filter, name,
        ]));
      } else {
        setIsChecked(() => ([
          ...filter,
        ]));
      }
    };
    updateCheckedIngredients();
  };
}
