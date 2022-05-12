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
              <div
                key={ index }
                id={ `Receita-${recipe.id}` }
                className="flex mx-2 mt-3
                  rounded-xl shadow-md"
              >
                <button
                  type="button"
                  value={ recipe.idDrink }
                  onClick={ () => {
                    setLoading(true);
                    history.push(`./drinks/${recipe.idDrink}`);
                  } }
                  className="flex mt-3 rounded-xl"
                >
                  <div
                    className="flex flex-row items-center justify-between"
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      className="rounded-l-xl"
                      data-testid={ `${index}-card-img` }
                      src={ recipe.strDrinkThumb }
                      alt="Drink"
                      style={ { width: '50%' } }
                    />
                    <div className="w-full text-center">
                      <h2
                        className="text-xl text-darkblue"
                        data-testid={ `${index}-card-name` }
                      >
                        { recipe.strDrink }
                      </h2>
                    </div>
                  </div>
                </button>
              </div>
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
            <div
              key={ index }
              id={ `Receita-${recipe.id}` }
              className="flex mx-2 mt-3
                rounded-xl shadow-md"
            >
              <button
                type="button"
                key={ recipe.idMeal }
                value={ recipe.idMeal }
                onClick={ () => {
                  setLoading(true);
                  history.push(`./foods/${recipe.idMeal}`);
                } }
                className="flex flex-col mt-3 rounded-xl"
              >
                <div
                  className="flex flex-row items-center justify-between"
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    className="rounded-l-xl"
                    data-testid={ `${index}-card-img` }
                    src={ recipe.strMealThumb }
                    alt="Food"
                    style={ { width: '50%' } }
                  />
                  <div className="w-full text-center">
                    <h2
                      className="text-xl text-darkblue"
                      data-testid={ `${index}-card-name` }
                    >
                      { recipe.strMeal }
                    </h2>
                  </div>
                </div>
              </button>
            </div>
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
