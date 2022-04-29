import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchDrinksId from '../services/fetchDrinksId';

function DrinkDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const { loading, setLoading } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchDrinksId(recipeId);
      if (fetchApi.drinks) {
        setRecipeData(fetchApi.drinks[0]);
        setLoading(false);
      }
    };
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!loading) {
  //   const recipeIngredients = recipeData
  //     .filter((recipe) => (Object.entries(recipe).contains('strIngredient')));
  //   console.log(recipeIngredients);
  // }

  // const recipeIngredients = recipeData
  //   .filter((recipe) => (Object.entries(recipe).contains('strIngredient')));
  // recipeIngredients
  //   .filter((element) => Object.values(element) !== null)
  //   .map((el, index) => (
  //     <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
  //       {el}
  //     </li>
  //   ));

  console.log(recipeData);
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
              <li
                data-testid="0-ingredient-name-and-measure"
              >
                {recipeData.strIngredient1}
                {' '}
                {recipeData.strMeasure1}
              </li>
              <li
                data-testid="1-ingredient-name-and-measure"
              >
                {recipeData.strIngredient2}
                {' '}
                {recipeData.strMeasure2}
              </li>
              <li
                data-testid="2-ingredient-name-and-measure"
              >
                {recipeData.strIngredient3}
                {' '}
                {recipeData.strMeasure3}
              </li>
              <li
                data-testid="3-ingredient-name-and-measure"
              >
                {recipeData.strIngredient4}
                {' '}
                {recipeData.strMeasure4}
              </li>
              <li
                data-testid="4-ingredient-name-and-measure"
              >
                {recipeData.strIngredient5}
                {' '}
                {recipeData.strMeasure5}
              </li>
              <li
                data-testid="5-ingredient-name-and-measure"
              >
                {recipeData.strIngredient6}
                {' '}
                {recipeData.strMeasure6}
              </li>
              <li
                data-testid="6-ingredient-name-and-measure"
              >
                {recipeData.strIngredient7}
                {' '}
                {recipeData.strMeasure7}
              </li>
              <li
                data-testid="7-ingredient-name-and-measure"
              >
                {recipeData.strIngredient8}
                {' '}
                {recipeData.strMeasure8}
              </li>
              <li
                data-testid="8-ingredient-name-and-measure"
              >
                {recipeData.strIngredient9}
                {' '}
                {recipeData.strMeasure9}
              </li>
              <li
                data-testid="9-ingredient-name-and-measure"
              >
                {recipeData.strIngredient10}
                {' '}
                {recipeData.strMeasure10}
              </li>
              <li
                data-testid="10-ingredient-name-and-measure"
              >
                {recipeData.strIngredient11}
                {' '}
                {recipeData.strMeasure11}
              </li>
              <li
                data-testid="11-ingredient-name-and-measure"
              >
                {recipeData.strIngredient12}
                {' '}
                {recipeData.strMeasure12}
              </li>
              <li
                data-testid="12-ingredient-name-and-measure"
              >
                {recipeData.strIngredient13}
                {' '}
                {recipeData.strMeasure13}
              </li>
              <li
                data-testid="13-ingredient-name-and-measure"
              >
                {recipeData.strIngredient14}
                {' '}
                {recipeData.strMeasure14}
              </li>
              <li
                data-testid="14-ingredient-name-and-measure"
              >
                {recipeData.strIngredient15}
                {' '}
                {recipeData.strMeasure15}
              </li>
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
          </>
        )
      }
    </>
  );
}

export default DrinkDetails;
