import React, { useContext, useEffect, useState } from 'react';
import MealRecommendationCard from '../components/MealRecommendationCard';
import RecipesContext from '../context/RecipesContext';
import fetchDrinksId from '../services/fetchDrinksId';
import fetchMealsRecommendations from '../services/fetchMealsRecommendations';

function DrinkDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    setMealsRecommendations,
    mealsRecommendations,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchDrinksId(recipeId);
      const allMeals = await fetchMealsRecommendations();
      const SIX = 6;
      console.log(allMeals);
      const mealsFiltered = allMeals.meals.slice(0, SIX);
      if (fetchApi.drinks && allMeals) {
        setMealsRecommendations(mealsFiltered);
        setRecipeData([fetchApi.drinks[0]]);
        setIsLoading(false);
      }
    };
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recipeData.length > 0) {
      const entries = Object.entries(recipeData[0]);
      const ingredientFilter = entries
        .filter((el) => el[0].includes('strIngredient'));
      const measuresFilter = entries
        .filter((el) => el[0].includes('strMeasure'));

      const filteredIngredient = ingredientFilter
        .filter((ingredientInfo) => ingredientInfo[1] !== null)
        .filter((ingredientInfo) => ingredientInfo[1].length > 0);
      setIngredients(filteredIngredient);

      const filteredMeasures = measuresFilter
        .filter((measureInfo) => measureInfo[1] !== null)
        .filter((measureInfo) => measureInfo[1].length > 0);
      setMeasures(filteredMeasures);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  return (
    <>
      <h1>
        Drink Details Page
      </h1>
      {
        !isLoading && (
          <>
            <h2 data-testid="recipe-title">
              {recipeData[0].strDrink}
            </h2>
            <img
              data-testid="recipe-photo"
              src={ recipeData[0].strDrinkThumb }
              alt="Drink"
            />
            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
            <span
              data-testid="recipe-category"
            >
              {recipeData[0].strAlcoholic}
            </span>
            <iframe
              title="video"
              width="320"
              height="240"
              src={
                recipeData[0].strVideo ? recipeData[0].strVideo
                  .replace('watch?v=', 'embed/') : ''
              }
              frameBorder="0"
              allowFullScreen
            />
            <ul>
              {
                ingredients.map((el, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${el[1]} ${measures[index][1]}`}
                  </li>
                ))
              }
            </ul>
            <span data-testid="instructions">
              {recipeData[0].strInstructions}
            </span>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
            {
              mealsRecommendations.map((meal, index) => (
                <MealRecommendationCard key={ index } meal={ meal } index={ index } />
              ))
            }
          </>
        )
      }
    </>
  );
}

export default DrinkDetails;
