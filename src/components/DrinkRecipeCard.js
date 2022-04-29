import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function DrinkRecipeCard() {
  const { searchResults, loading } = useContext(RecipesContext);

  const MAGIC_NUMBER = 12;

  const history = useHistory();
  return (
    <div>
      {
        !loading && (
          searchResults.drinks.slice(0, MAGIC_NUMBER).map((recipe, index) => (
            <button
              type="button"
              key={ recipe.idDrink }
              value={ recipe.idDrink }
              onClick={ () => { history.push(`./drinks/${recipe.idDrink}`); } }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strDrinkThumb }
                  alt="Drink"
                />
                <h2 data-testid={ `${index}-card-name` }>
                  { recipe.strDrink }
                </h2>
              </div>
            </button>
          ))
        )
      }
    </div>
  );
}

export default DrinkRecipeCard;
