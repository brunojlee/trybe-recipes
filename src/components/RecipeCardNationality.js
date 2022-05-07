import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipeCardNationality({ meals }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const {
    setLoading,
  } = useContext(RecipesContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
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
                history.push(`../../foods/${recipe.idMeal}`);
              } }
            >
              <div
                className="flex flex-row items-center justify-between m-2 mx-4
                border-darkblue rounded-lg
                border-2"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="rounded-l"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt="Food"
                  style={ { maxWidth: '40%' } }
                />
                <div className="w-full text-center">
                  <h2
                    className="text-2xl text-darkblue"
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe.strMeal }
                  </h2>
                </div>
              </div>
            </button>
          ))
        )
      }
    </div>
  );
}

RecipeCardNationality.propTypes = {
  meals: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default RecipeCardNationality;
