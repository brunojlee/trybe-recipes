import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function IngredientCard({ drinks, meals, index }) {
  const { setLoading } = useContext(RecipesContext);
  const history = useHistory();

  if (drinks) {
    return (
      <div
        className="flex mx-2 mt-3
        rounded-xl shadow-md bg-white"
      >
        <button
          type="button"
          onClick={ () => {
            setLoading(true);
            localStorage.setItem('ingredient', drinks.strIngredient1);
            history.push('/drinks');
          } }
        >
          <div data-testid={ `${index}-ingredient-card` } key={ index } className="flex">
            <img
              className="rounded-l-xl w-56 ml-3"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}-Small.png` }
              alt="Drink"
            />
            <div className="flex w-full items-center justify-center">
              <h2
                className="font-semibold text-l px-5"
                data-testid={ `${index}-card-name` }
              >
                { drinks.strIngredient1 }
              </h2>
            </div>
          </div>
        </button>
      </div>
    );
  }
  return (
    <div
      className="flex mx-2 mt-3
        rounded-xl shadow-md bg-white"
    >
      <button
        type="button"
        onClick={ () => {
          setLoading(true);
          localStorage.setItem('ingredient', meals.strIngredient);
          history.push('/foods');
        } }
      >
        <div data-testid={ `${index}-ingredient-card` } key={ index } className="flex">
          <img
            className="rounded-l-xl w-56 ml-3"
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${meals.strIngredient}-Small.png` }
            alt="al"
          />
        </div>
      </button>
      <div className="flex w-full items-center justify-center">
        <h2
          className="font-semibold text-l px-5"
          data-testid={ `${index}-card-name` }
        >
          { meals.strIngredient }
        </h2>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.any),
  meals: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientCard;
