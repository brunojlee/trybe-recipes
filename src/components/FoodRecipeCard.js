import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function FoodRecipeCard() {
  const { searchResults, loading } = useContext(RecipesContext);

  const MAGIC_NUMBER = 12;

  const history = useHistory();
  return (
    <div>
      {
        !loading && (
          searchResults.meals.slice(0, MAGIC_NUMBER).map((recipe, index) => (
            <button
              type="button"
              key={ recipe.idMeal }
              value={ recipe.idMeal }
              onClick={ () => { history.push(`./${recipe.idMeal}`); } }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt="Food"
                />
                <h2 data-testid={ `${index}-card-name` }>
                  { recipe.strMeal }
                </h2>
              </div>
            </button>
          ))
        )
      }
    </div>
  );
}

export default FoodRecipeCard;
