import React, { useContext, useEffect, useState } from 'react';
import DrinksRecommendations from '../components/DrinksRecommendations';
import RecipesContext from '../context/RecipesContext';
import fetchDrinksId from '../services/fetchDrinksId';
import fetchDrinksRecommendations from '../services/fetchDrinksRecommendations';

function DrinkDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);

  const {
    loading,
    setLoading,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    setDrinksRecommendations,
    drinksRecommendations,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchDrinksId(recipeId);
      const allDrinks = await fetchDrinksRecommendations();
      const SIX = 6;
      console.log(allDrinks);
      const drinksFiltered = allDrinks.drinks.slice(0, SIX);
      if (fetchApi.drinks && allDrinks) {
        setDrinksRecommendations(drinksFiltered);
        setRecipeData([fetchApi.drinks[0]]);
        setLoading(false);
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
        !loading && (
          <>
            <h2 data-testid="recipe-title">
              {recipeData.strDrink}
            </h2>
            <img
              data-testid="recipe-photo"
              src={ recipeData.strDrinkThumb }
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
              {recipeData.strAlcoholic}
            </span>
            <iframe
              title="video"
              width="320"
              height="240"
              src={
                recipeData.strVideo ? recipeData.strVideo
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
              {recipeData.strInstructions}
            </span>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
            {
              drinksRecommendations.map((drink, index) => (
                <DrinksRecommendations key={ index } drink={ drink } index={ index } />
              ))
            }
          </>
        )
      }
    </>
  );
}

export default DrinkDetails;
