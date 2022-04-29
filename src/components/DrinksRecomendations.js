import React from 'react';
import PropTypes from 'prop-types';

function DrinksRecomendations({ drink, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt="Drink"
      />
      <span data-testid={ `${index}-card-name` }>{drink.strDrink}</span>
    </div>
  );
}

DrinksRecomendations.propTypes = {
  drink: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DrinksRecomendations;
