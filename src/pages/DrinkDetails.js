import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonPrevious from '../components/ButtonPrevious';
import SwiperFoods from '../components/SwiperFoods';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinksId from '../services/fetchDrinksId';
import fetchMealsRecommendations from '../services/fetchMealsRecommendations';
// import styles from '../styles/RecipeDetailsPage.module.css';

function progressTestOut(recipeId) {
  return () => {
    const inProgressRecipesData = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ).cocktails[recipeId]
      ? Object.values(
        JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[recipeId],
      ) : false;
    if (inProgressRecipesData) {
      return true;
    }
    return false;
  };
}
function isHandleFavoriteFunction(recipeInfo, recipeId,
  favoriteRecipes, setFavoriteRecipes) {
  return () => {
    if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', [JSON.stringify(filteredRecipes)]);
      setFavoriteRecipes(filteredRecipes);
    } else {
      const getLocalStorage = localStorage.getItem('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      localStorage.setItem('favoriteRecipes', [JSON.stringify([...getLocalStorage,
        recipeInfo])]);
      setFavoriteRecipes([...favoriteRecipes, recipeInfo]);
    }
  };
}
const getLocalStorageOut = localStorage.getItem('favoriteRecipes')
  ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

function DrinkDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [mealsRecommendations, setMealsRecommendations] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const history = useHistory();

  const {
    ingredients, setIngredients, measures, setMeasures, loading,
    setLoading, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);

  const handleShare = async () => {
    const recipeURL = window.location.pathname;
    await copy(`http://localhost:3000${recipeURL}`);
    setLinkCopied(!linkCopied);
  };

  const recipeInfo = {
    id: recipeData.idDrink,
    type: 'drink',
    nationality: '',
    category: recipeData.strCategory,
    alcoholicOrNot: recipeData.strAlcoholic,
    name: recipeData.strDrink,
    image: recipeData.strDrinkThumb,
  };

  const handleFavorite = isHandleFavoriteFunction(
    recipeInfo, recipeId, favoriteRecipes, setFavoriteRecipes,
  );

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchDrinksId(recipeId);

      const allMeals = await fetchMealsRecommendations();
      const SIX = 6;
      const mealsFiltered = allMeals.meals.slice(0, SIX);
      if (fetchApi.drinks && allMeals) {
        setMealsRecommendations(mealsFiltered);
        setRecipeData(fetchApi.drinks[0]);
        setLoading(false);
      }
      const getLocalStorage = getLocalStorageOut;
      setFavoriteRecipes(getLocalStorage);
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
    history.push(`/drinks/${recipeId}/in-progress`);
  };
  const progressTest = progressTestOut(recipeId);
  return (
    <div>
      {
        !loading && (
          <>
            <div className="bg-grey1 pb-8 border-b-4 border-darkblue">
              <ButtonPrevious />
              <h2
                className="text-center text-3xl font-bold"
                data-testid="recipe-title"
              >
                {recipeData.strDrink}
              </h2>
              <p
                className="text-center text-xl px-2 mb-4 mx-auto"
                data-testid="recipe-category"
              >
                {recipeData.strAlcoholic}
              </p>
              <img
                className="mx-auto rounded"
                data-testid="recipe-photo"
                src={ recipeData.strDrinkThumb }
                style={ { maxWidth: '60%' } }
                alt="Drink"
              />
            </div>
            <div className="flex flex-row mx-auto justify-center m-4">
              <button
                className="py-2 px-4 bg-grey1 mx-1 rounded-xl"
                type="button"
                data-testid="share-btn"
                src={ ShareIcon }
                onClick={ () => handleShare() }
              >
                {
                  linkCopied ? 'Link copied!' : <img src={ ShareIcon } alt="Share" />
                }
              </button>
              {
                favoriteRecipes.find((recipe) => recipe.id === recipeId) ? (
                  <button
                    className="py-2 px-4 bg-grey1 mx-1 rounded-xl"
                    type="button"
                    data-testid="favorite-btn"
                    src={ blackHeartIcon }
                    onClick={ () => handleFavorite() }
                  >
                    <img src={ blackHeartIcon } alt="isFavorite" />
                  </button>
                ) : (
                  <button
                    className="py-2 px-4 bg-grey1 mx-1 rounded-xl"
                    type="button"
                    data-testid="favorite-btn"
                    src={ whiteHeartIcon }
                    onClick={ () => handleFavorite() }
                  >
                    <img src={ whiteHeartIcon } alt="isNotFavorite" />
                  </button>
                )
              }
            </div>
            <ul className="text-start mx-12 text-xl mt-4">
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
              data-testid="instructions"
              className="mt-4 mx-4 text-justify"
            >
              {recipeData.strInstructions}
            </p>
            <div className="pl-4 py-6 mb-8">
              <h2 className="my-4 text-center text-xl font-bold">
                Recomendations
              </h2>
              <SwiperFoods mealsRecommendations={ mealsRecommendations } />
            </div>
            <div className="w-full flex justify-center mb-8">
              <button
                className="bg-darkblue text-white
                p-1 rounded-lg font-bold left-1/4 w-48"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ goProgress }
              >
                {
                  progressTest() ? 'Continue Recipe' : 'Start Recipe'
                }
              </button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default DrinkDetails;
