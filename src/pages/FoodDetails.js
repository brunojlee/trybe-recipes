import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchFoodsId from '../services/fetchFoodsId';

function FoodDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const history = useHistory();

  const {
    loading,
    setLoading,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchFoodsId(recipeId);
      if (fetchApi.meals) {
        setRecipeData(fetchApi.meals[0]);
        setLoading(false);
      }
    };
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      const entries = Object.entries(recipeData);
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

  const goProgress = () => {
    setLoading(true);
    history.push(`/foods/${recipeId}/in-progress`);
  };
  console.log(recipeData);

  return (
    <>
      <h1
        className="text-center bg-orange py-4 text-2xl font-bold border-b-4
        border-darkblue"
      >
        Food Details Page
      </h1>
      {
        !loading && (
          <>
            <h2
              className="text-center py-4 text-2xl font-bold"
              data-testid="recipe-title"
            >
              {recipeData.strMeal}
            </h2>
            <img
              className="mx-auto rounded"
              data-testid="recipe-photo"
              src={ recipeData.strMealThumb }
              alt="Drink"
              style={ { maxWidth: '60%' } }
            />
            <h3
              className="w-56 border-2 border-black text-center text-xl px-2
              py-1 my-4 mx-auto rounded-xl"
              data-testid="recipe-category"
            >
              {recipeData.strCategory}
            </h3>
            <div className="flex flex-row mx-auto justify-center m-4">
              <button
                className="items-center
                w-28 mx-1 py-2 px-4 bg-darkblue text-white rounded-xl"
                type="button"
                data-testid="share-btn"
              >
                Share
              </button>
              <button
                className="items-center
                w-28 mx-1 py-2 px-4 bg-darkblue text-white rounded-xl"
                type="button"
                data-testid="favorite-btn"
              >
                Favorite
              </button>
            </div>
            <iframe
              className="mx-auto"
              data-testid="video"
              title="video"
              width="320"
              height="240"
              src={
                recipeData.strYoutube ? recipeData.strYoutube
                  .replace('watch?v=', 'embed/') : ''
              }
              frameBorder="0"
              allowFullScreen
            />
            <p
              className="text-center my-4 text-xl font-bold text-darkblue"
              data-testid="0-recomendation-card"
            >
              Recomendations
            </p>
            <ul className="text-start mx-12 text-xl">
              {
                ingredients.map((el, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${el[1]} ${measures[index] ? measures[index][1] : ''}`}
                  </li>
                ))
              }
            </ul>
            <p
              className="text-justify m-4"
              data-testid="instructions"
            >
              {recipeData.strInstructions}
            </p>
            <div className="flex my-8 justify-center">
              <button
                className="w-44 py-2 px-4 bg-darkblue text-white rounded-xl"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ goProgress }
              >
                Start Recipe
              </button>
            </div>
          </>
        )
      }
    </>
  );
}

export default FoodDetails;
