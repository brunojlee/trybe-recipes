import PropTypes from 'prop-types';
import React from 'react';

function RecommendationCard({ meal, drink, index }) {
  if (drink) {
    return (
      <div
        className="flex flex-row items-center border-2
        border-black rounded-xl"
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ drink.strDrinkThumb }
          style={ { maxWidth: '50%' } }
          alt="Drink"
          className="rounded-l-xl"
        />
        <p
          className="text-xl text-center mx-auto"
          data-testid={ `${index}-recomendation-title` }
        >
          {drink.strDrink}
        </p>
      </div>
    );
  }

  if (meal) {
    return (
      <div
        className="flex flex-row text-center items-center border-2
        border-black rounded-xl"
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          style={ { maxWidth: '50%' } }
          src={ meal.strMealThumb }
          alt="Meal"
          className="rounded-l-xl"
        />
        <p
          data-testid={ `${index}-recomendation-title` }
          className="text-xl text-center mx-auto"
        >
          {meal.strMeal}
        </p>
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
