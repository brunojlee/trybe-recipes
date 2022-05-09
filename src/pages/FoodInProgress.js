/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  checkBoxStyles,
  checkStyle,
  getCheckedsMeals,
  handleChangeOut,
  handleIngredientsMeasuresData,
  isHandleFavoriteFunction,
} from '../functions/Handles';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodsId from '../services/fetchFoodsId';
import { saveCheckedIngredients, saveDoneRecipe } from '../services/localStorage';

function FoodInProgress() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [disableFinished, setDisableFinished] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();

  const {
    loading,
    setLoading,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    isChecked,
    setIsChecked,
    favoriteRecipes,
    setFavoriteRecipes,
  } = useContext(RecipesContext);

  const timeElapsed = Date.now();

  const today = new Date(timeElapsed);

  const recipeInfo = {
    id: recipeData.idMeal,
    type: 'food',
    nationality: recipeData.strArea,
    category: recipeData.strCategory,
    alcoholicOrNot: '',
    name: recipeData.strMeal,
    image: recipeData.strMealThumb,
  };

  const finishedRecipeInfo = {
    id: recipeData.idMeal,
    type: 'food',
    nationality: recipeData.strArea,
    category: recipeData.strCategory,
    alcoholicOrNot: '',
    name: recipeData.strMeal,
    image: recipeData.strMealThumb,
    doneDate: today,
    tags: recipeData.strTags ? recipeData.strTags.split(',') : [],
  };

  const handleFavorite = isHandleFavoriteFunction(
    recipeInfo, recipeId, favoriteRecipes, setFavoriteRecipes,
  );

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchFoodsId(recipeId);
      if (fetchApi.meals) {
        setRecipeData(fetchApi.meals[0]);
        setLoading(false);
      }
      await setFavoriteRecipes(localStorage.getItem('favoriteRecipes') !== null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);
    };
    updateData();
  }, []);

  useEffect(() => {
    const bringCheckedIngredients = async () => {
      const localStorageCheckeds = getCheckedsMeals(recipeId);
      setIsChecked(localStorageCheckeds);
    };
    bringCheckedIngredients();
  }, []);

  useEffect(() => {
    handleIngredientsMeasuresData(loading, recipeData, setIngredients, setMeasures);
  }, [recipeData]);

  const handleChange = handleChangeOut(isChecked, setIsChecked);

  const handleShare = async () => {
    await copy(`http://localhost:3000/foods/${recipeId}`);
    console.log(window.location.pathname);
    setLinkCopied(!linkCopied);
  };

  useEffect(() => {
    saveCheckedIngredients(recipeId, isChecked);
    setDisableFinished(
      Object.values(isChecked)
        .every((el) => el) && Object.values(isChecked).length === ingredients.length,
    );
  }, [isChecked]);

  const finishRecipe = () => {
    saveDoneRecipe(finishedRecipeInfo);
    history.push('/done-recipes');
  };

  return (
    <>
      <h1
        className="text-center bg-orange py-4 text-2xl font-bold border-b-4
        border-darkblue text-white"
        data-testid="recipe-title"
      >
        Food in Progress Page
      </h1>
      {
        !loading && (
          <>
            <img
              className="object-cover h-44 w-screen"
              alt="Foto da receita"
              data-testid="recipe-photo"
              src={ recipeData.strMealThumb }
            />
            <h2
              className="text-center my-5 mx-auto text-xl font-bold"
              data-testid="recipe-category"
            >
              {recipeData.strCategory}
            </h2>
            <ul className="text-right mr-5 text-xl">
              {
                ingredients.map((el, index) => (
                  <li
                    id={ `ingredient${index}` }
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    style={ checkStyle(isChecked, index) }
                  >
                    {`${el[1]} ${measures[index] ? measures[index][1] : ''}`}
                    <input
                      className="ml-3"
                      type="checkbox"
                      name={ `ingredient${index}` }
                      checked={ (
                        isChecked.find(
                          (e) => e === `ingredient${index}`,
                        )) !== undefined }
                      style={ checkBoxStyles(isChecked, index) }
                      onChange={ handleChange }
                    />
                  </li>
                ))
              }
            </ul>
            <h2
              data-testid="instructions"
              className="text-center my-5 mx-auto text-xl font-bold"
            >
              Instructions
            </h2>
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
                favoriteRecipes
              && (favoriteRecipes[0]
                ? (
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
                ))
              }
            </div>
            <div className="w-full flex justify-center mt-16 my-8">

              <button
                className="text-2xl mx-auto bg-darkblue rounded-xl text-white px-4 py-1
                disabled:opacity-20"
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ !disableFinished }
                onClick={ finishRecipe }
              >
                Done Recipe
              </button>
            </div>
          </>
        )
      }
    </>
  );
}

export default FoodInProgress;
