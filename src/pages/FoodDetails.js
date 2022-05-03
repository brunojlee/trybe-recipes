import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinksRecommendations from '../services/fetchDrinksRecommendations';
import fetchFoodsId from '../services/fetchFoodsId';
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

function FoodDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState('');
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
    id: recipeData.idMeal,
    type: 'food',
    nationality: recipeData.strArea,
    category: recipeData.strCategory,
    alcoholicOrNot: '',
    name: recipeData.strMeal,
    image: recipeData.strMealThumb,
  };

  const handleFavorite = isHandleFavoriteFunction(
    recipeInfo, recipeId, favoriteRecipes, setFavoriteRecipes,
  );

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
      const getLocalStorage = localStorage.key('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

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
    history.push(`/foods/${recipeId}/in-progress`);
  };

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
              style={ { maxWidth: '60%' } }
              alt="Food"
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
              title="video"
              width="320"
              height="240"
              src={
                recipeData.strYoutube ? recipeData.strYoutube
                  .replace('watch?v=', 'embed/') : ''
              }
              frameBorder="0"
              allowFullScreen
              data-testid="video"
            />

            <ul className="text-start mx-12 text-xl">
              <p
               className="text-center my-4 text-xl font-bold text-darkblue"
               data-testid="0-recomendation-card"
              >
                Recomendations
              </p>
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
            {
              drinksRecommendations.map((drink, index) => (
                <RecommendationCard key={ index } drink={ drink } index={ index } />
              ))
            }
            <button
              className={ `${styles['start-recipe-btn']}` }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ goProgress }
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
