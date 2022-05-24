import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonPrevious from '../components/ButtonPrevious';
import SwiperDrinks from '../components/SwiperDrinks';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinksRecommendations from '../services/fetchDrinksRecommendations';
import fetchFoodsId from '../services/fetchFoodsId';
// import styles from '../styles/RecipeDetailsPage.module.css';

function progressTestOut(recipeId) {
  return () => {
    const inProgressRecipesData = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ).meals[recipeId]
      ? Object.values(
        JSON.parse(localStorage.getItem('inProgressRecipes')).meals[recipeId],
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

function FoodDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.hash.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();
  const {
    ingredients, setIngredients, measures, setMeasures, loading,
    setLoading, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const handleShare = async () => {
    const recipeURL = window.location.hash;
    await copy(`http://localhost:3000/${recipeURL}`);
    setLinkCopied(!linkCopied);
  };

  const recipeInfo = {
    id: recipeData.idMeal,
    type: 'food',
    nationality: recipeData.strArea,
    category: recipeData.strCategory,
    alcoholicOrNot: '',
    name: recipeData.strMeal,
    image: recipeData.strMealThumb,
  };

  const handleFavorite = isHandleFavoriteFunction(recipeInfo, recipeId,
    favoriteRecipes, setFavoriteRecipes);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchFoodsId(recipeId);
      const allDrinks = await fetchDrinksRecommendations();
      const SIX = 6;
      const drinksFiltered = allDrinks.drinks.slice(0, SIX);
      if (fetchApi.meals && allDrinks) {
        setDrinksRecommendations(drinksFiltered);
        setRecipeData(fetchApi.meals[0]);
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
      const ingredientFilter = entries.filter((el) => el[0].includes('strIngredient'));
      const measuresFilter = entries.filter((el) => el[0].includes('strMeasure'));
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
  const progressTest = progressTestOut(recipeId);

  return (
    <div>
      {
        !loading && (
          <>
            <ButtonPrevious />
            <img
              className="mx-auto h-64 min-w-full object-cover"
              data-testid="recipe-photo"
              src={ recipeData.strMealThumb }
              alt="Food"
            />
            <div className="grid grid-cols-2 gap-2 h-28">
              <div className="flex flex-column justify-center">
                <h2
                  className="text-3xl font-bold ml-3"
                  data-testid="recipe-title"
                >
                  {recipeData.strMeal}
                </h2>
                <p
                  className="text-xl ml-4"
                  data-testid="recipe-category"
                >
                  {recipeData.strCategory}
                </p>
              </div>
              <div className="flex justify-content-end mr-3">
                <button
                  className="mx-2"
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
                      className="mx-2"
                      type="button"
                      data-testid="favorite-btn"
                      src={ blackHeartIcon }
                      onClick={ () => handleFavorite() }
                    >
                      <img src={ blackHeartIcon } alt="isFavorite" />
                    </button>
                  ) : (
                    <button
                      className="mx-2"
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
            </div>
            <h1 className="text-3xl font-medium mx-3 mb-3">Ingredients</h1>
            <div className="bg-grey1 flex flex-col mx-4 h-full rounded-xl">
              <ul className="text-start mx-4 mt-3 mb-3 text-l">
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
            </div>
            <h1 className="text-3xl font-medium mx-3 mb-3 mt-4">Instructions</h1>
            <div className="bg-grey1 flex flex-col mx-4 h-full rounded-xl">
              <p
                data-testid="instructions"
                className="mt-3 mx-4 text-justify mb-3"
              >
                {recipeData.strInstructions}
              </p>
            </div>
            <iframe
              className="mx-auto mt-4"
              title="video"
              width="340"
              height="240"
              src={
                recipeData.strYoutube ? recipeData.strYoutube
                  .replace('watch?v=', 'embed/') : ''
              }
              frameBorder="0"
              allowFullScreen
              data-testid="video"
            />
            <h1 className="text-3xl font-medium mx-3 mb-3 mt-4">Recommendations</h1>
            <div className="pl-4 py-6 mb-3">
              <SwiperDrinks drinksRecommendations={ drinksRecommendations } />
            </div>
            <div className="flex flex-col mx-4 h-full mb-5">
              <button
                className="font-bold bg-darkblue text-white
                rounded-xl py-3 opacity-100
                hover:opacity-90"
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

export default FoodDetails;
