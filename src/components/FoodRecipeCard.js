import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodRecipeCard() {
  const { searchResults, loading } = useContext(RecipesContext);

  const MAGIC_NUMBER = 12;

  if (loading) return null;
  return (
    searchResults.meals.slice(0, MAGIC_NUMBER).map((recipe, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb }
          alt="Food"
        />
        <h2 data-testid={ `${index}-card-name` }>
          { recipe.strMeal }
        </h2>
      </div>
    ))
  );
}

export default FoodRecipeCard;
