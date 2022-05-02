import PropTypes from 'prop-types';
import React from 'react';

function RecommendationCard({ meal, drink, index }) {
  if (drink) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ drink.strMealThumb }
          alt="Drink"
        />
        <span data-testid={ `${index}-recomendation-title` }>{drink.strMeal}</span>
      </div>
    );
  }

  if (meal) {
    return (
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ meal.strMealThumb }
          alt="Drink"
        />
        <span data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</span>
      </div>
    );
  }
}

RecommendationCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;

export default RecommendationCard;
