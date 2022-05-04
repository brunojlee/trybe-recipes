/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchFoodsId from '../services/fetchFoodsId';
import { getCheckedIngredients, saveCheckedIngredients } from '../services/localStorage';

function handleChangeOut(isChecked, setIsChecked) {
  return ({ target }) => {
    const { name } = target;
    const filter = isChecked.filter((el) => el !== name);
    const updateCheckedIngredients = () => {
      if (target.checked) {
        setIsChecked(() => ([
          ...filter, name,
        ]));
      } else {
        setIsChecked(() => ([
          ...filter,
        ]));
      }
    };
    updateCheckedIngredients();
  };
}
function checkBoxStyles(isChecked, index) {
  return isChecked.find((el) => el === `ingredient${index}`)
    ? { textDecoration: 'none solid rgb(0,0,0)' }
    : { textDecoration: 'line-through solid rgb(0,0,0)' };
}
function getCheckeds(recipeId) {
  return getCheckedIngredients(recipeId)
    ? getCheckedIngredients(recipeId) : [];
}
function handleIngredientsMeasuresData(loading, recipeData, setIngredients, setMeasures) {
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
}
function checkStyle(isChecked, index) {
  return isChecked.find((el) => el === `ingredient${index}`)
    ? { textDecoration: 'line-through solid rgb(0,0,0)' }
    : { textDecoration: 'none solid rgb(0,0,0)' };
}
function isHandleFavoriteFunction(recipeInfo, recipeId,
  favoriteRecipes, setFavoriteRecipes) {
  return () => {
    if (favoriteRecipes.find((recipe) => recipe.id === recipeId)) {
      const filteredRecipes = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
      localStorage.setItem('favoriteRecipes', [JSON.stringify(filteredRecipes)]);
      setFavoriteRecipes(filteredRecipes);
    } else {
      const getLocalStorage = localStorage.key('favoriteRecipes') === null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      localStorage.setItem('favoriteRecipes', [JSON.stringify([...getLocalStorage,
        recipeInfo])]);
      setFavoriteRecipes([...favoriteRecipes, recipeInfo]);
    }
  };
}

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
      const localStorageCheckeds = getCheckeds(recipeId);
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

  return (
    <>
      <h1
        className="text-center bg-orange py-4 text-2xl font-bold border-b-4
        border-darkblue"
        data-testid="recipe-title"
      >
        Food in Progress Page
      </h1>
      {
        !loading && (
          <>
            <img
              alt="Foto da receita"
              data-testid="recipe-photo"
              src={ recipeData.strMealThumb }
            />
            <div>
              <h2 data-testid="recipe-category">{recipeData.strAlcoholic}</h2>
              <ul>
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
            <h2 data-testid="instructions">Instruções</h2>
            <div className="flex flex-row mx-auto justify-center m-4">
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
                favoriteRecipes
                && (favoriteRecipes[0]
                  ? (
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
                  ))
              }
            </div>
            <button
              className="bg-darkblue rounded-xl text-white px-2 py-1 disabled:opacity-20"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ !disableFinished }
              onClick={ () => history.push('/done-recipes') }
            >
              Finalizar receita
            </button>
          </>
        )
      }
    </>
  );
}

export default FoodInProgress;
