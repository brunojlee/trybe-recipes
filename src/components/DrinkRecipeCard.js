import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinkRecipeCard() {
  const { searchResults, loading } = useContext(RecipesContext);

  const MAGIC_NUMBER = 12;
  return (
    <div>
      {
        !loading && (
          searchResults.drinks.slice(0, MAGIC_NUMBER).map((recipe, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt="Drink"
              />
              <h2 data-testid={ `${index}-card-name` }>
                { recipe.strDrink }
              </h2>
            </div>
          ))
        )
      }
    </div>
  );
}

export default DrinkRecipeCard;
