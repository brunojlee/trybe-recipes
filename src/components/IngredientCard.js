import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function IngredientCard({ drinks, meals, index }) {
  const { setLoading } = useContext(RecipesContext);
  const history = useHistory();

  if (drinks) {
    return (
      <div>
        <button
          type="button"
          onClick={ () => {
            setLoading(true);
            history.push(`/drinks?INGREDIENT=${drinks.strIngredient1.toLowerCase()}`);
          } }
        >
          <div data-testid={ `${index}-ingredient-card` } key={ index }>
            <img
              className="rounded-l"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}-Small.png` }
              alt="Drink"
              style={ { maxWidth: '40%' } }
            />
            <div className="w-full text-center">
              <h2
                className="text-2xl text-darkblue"
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
    <div>
      <button
        type="button"
        onClick={ () => {
          setLoading(true);
          localStorage.setItem('ingredient', meals.strIngredient.toLowerCase());
          history.push('/foods');
        } }
      >
        <div data-testid={ `${index}-ingredient-card` } key={ index }>
          <img
            className="rounded-l"
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${meals.strIngredient}-Small.png` }
            alt="Meal"
            style={ { maxWidth: '40%' } }
          />
          <div className="w-full text-center">
            <h2
              className="text-2xl text-darkblue"
              data-testid={ `${index}-card-name` }
            >
              { meals.strIngredient }
            </h2>
          </div>
        </div>
      </button>
    </div>
  );
}

IngredientCard.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.any),
  meals: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientCard;
