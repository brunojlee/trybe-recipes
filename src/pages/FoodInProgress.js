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
import formatDate from '../helpers/formatDate';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodsId from '../services/fetchFoodsId';
import { saveCheckedIngredients, saveDoneRecipe } from '../services/localStorage';

function FoodInProgress() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.hash.match(regexNumbers)[0];
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

  const today = formatDate();

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
    console.log(window.location.hash);
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
    <div>
      {
        !loading && (
          <>
            <img
              className="object-cover h-44 w-screen"
              alt="Foto da receita"
              data-testid="recipe-photo"
              src={ recipeData.strMealThumb }
            />
            <div className="grid grid-cols-2 gap-2 h-28">
              <div className="flex flex-column justify-center">
                {/* <ButtonPrevious /> */}
                <h2
                  className="text-3xl font-bold ml-3"
                  data-testid="recipe-title"
                >
                  {recipeData.strMeal}
                </h2>
                <p
                  className="text-l ml-3"
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
            </div>
            <h1 className="text-3xl font-medium mx-3 mb-3 mt-4">Instructions</h1>
            <div className="bg-grey1 flex flex-col mx-4 h-full rounded-xl mb-4">
              <p
                data-testid="instructions"
                className="mt-3 mx-4 text-justify mb-3"
              >
                {recipeData.strInstructions}
              </p>
            </div>
            <div className="flex flex-col mx-4 h-full mb-5">
              <button
                className="font-bold bg-darkblue text-white
                rounded-xl py-3 opacity-100
                hover:opacity-90
                disabled:opacity-50"
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
    </div>
  );
}

export default FoodInProgress;
