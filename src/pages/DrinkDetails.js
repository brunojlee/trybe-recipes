import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinksId from '../services/fetchDrinksId';
import fetchMealsRecommendations from '../services/fetchMealsRecommendations';
import styles from '../styles/RecipeDetailsPage.module.css';

function isHandleFavoriteFunction(recipeInfo, recipeId,
  favoriteRecipes, setFavoriteRecipes) {
  return () => {
    if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', [JSON.stringify(filteredRecipes)]);
      setFavoriteRecipes(filteredRecipes);
    } else {
      const getLocalStorage = localStorage.key('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      localStorage.setItem('favoriteRecipes', [JSON.stringify([...getLocalStorage,
        recipeInfo])]);
      setFavoriteRecipes([...favoriteRecipes, recipeInfo]);
    }
  };
}

function DrinkDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [mealsRecommendations, setMealsRecommendations] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const history = useHistory();

  const {
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    loading,
    setLoading,
    favoriteRecipes,
    setFavoriteRecipes,
  } = useContext(RecipesContext);

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
      const getLocalStorage = localStorage.key('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

      setFavoriteRecipes(getLocalStorage);
      console.log(getLocalStorage);
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
                  type="button"
                  data-testid="favorite-btn"
                  src={ blackHeartIcon }
                  onClick={ () => handleFavorite() }
                >
                  <img src={ blackHeartIcon } alt="isFavorite" />
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  onClick={ () => handleFavorite() }
                >
                  <img src={ whiteHeartIcon } alt="isNotFavorite" />
                </button>
              )
            }
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
                    {`${el[1]} ${measures[index] ? measures[index][1] : ''}`}
                  </li>
                ))
              }
            </ul>
            <span data-testid="instructions">
              {recipeData.strInstructions}
            </span>
            {
              mealsRecommendations.map((meal, index) => (
                <RecommendationCard key={ index } meal={ meal } index={ index } />
              ))
            }
            <button
              className={ `${styles['start-recipe-btn']}` }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ goProgress }
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
