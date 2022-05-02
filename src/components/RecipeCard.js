import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipeCard({ drinks, meals }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const {
    setLoading,
  } = useContext(RecipesContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!isLoading && drinks && drinks.length > 0) {
    return (
      <div>
        {
          (!isLoading && drinks && drinks.length > 0) && (
            drinks.map((recipe, index) => (
              <button
                type="button"
                key={ recipe.idDrink }
                value={ recipe.idDrink }
                onClick={ () => {
                  setLoading(true);
                  history.push(`./drinks/${recipe.idDrink}`);
                } }
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
  } return (
    <div>
      {
        (!isLoading && meals && meals.length > 0) && (
          meals.map((recipe, index) => (
            <button
              type="button"
              key={ recipe.idMeal }
              value={ recipe.idMeal }
              onClick={ () => {
                setLoading(true);
                history.push(`./foods/${recipe.idMeal}`);
              } }
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

RecipeCard.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.any),
  meals: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default RecipeCard;
