import PropTypes from 'prop-types';
import React from 'react';

function MealRecommendationCard({ meal, index }) {
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

MealRecommendationCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default MealRecommendationCard;
