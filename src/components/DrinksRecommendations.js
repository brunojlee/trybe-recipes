import PropTypes from 'prop-types';
import React from 'react';

function DrinksRecommendations({ drink, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt="Drink"
      />
      <span data-testid={ `${index}-card-name` }>{drink.strDrink}</span>
    </div>
  );
}

DrinksRecommendations.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DrinksRecommendations;
