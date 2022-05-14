/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import backgroundImage from '../images/Intersect2.svg';

const getLocalStorageOut = localStorage.getItem('favoriteRecipes')
  ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setLoading, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(data);
    const getLocalStorage = getLocalStorageOut;
    setFavoriteRecipes(getLocalStorage);
  }, []);

  const handleShare = async (type, recipeId) => {
    await copy(`http://localhost:3000/${type}s/${recipeId}`);
    setLinkCopied(!linkCopied);
  };

  const handleCategoryChange = ({ target }) => {
    setSelectedCategory(target.value);
  };

  const handleFavorite = async ({ target }) => {
    const filteredRecipes = favoriteRecipes
      .filter((recipe) => recipe.id !== target.name);
    localStorage.setItem('favoriteRecipes', [JSON.stringify(filteredRecipes)]);
    setFavoriteRecipes(filteredRecipes);
    document.getElementById(`Receita-${target.name}`).innerText = '';
  };

  const pushToDetails = ({ target }) => {
    setLoading(true);
    history.push(target.name);
  };
  return (
    <>
      <Header pageName="Favorite Recipes" showProfileImg="true" />
      <img
        src={ backgroundImage }
        alt="background"
        className="bottom-0 w-screen fixed bg-scroll -z-10"
      />
      <div className="grid grid-cols-3 gap-1 mx-2 mt-3 mb-3">
        <button
          className="font-semibold bg-darkblue text-white py-2 px-4 rounded"
          data-testid="filter-by-all-btn"
          type="button"
          value="all"
          onClick={ handleCategoryChange }
        >
          All
        </button>
        <button
          className="font-semibold bg-darkblue text-white py-2 px-4 rounded"
          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ handleCategoryChange }
        >
          Food
        </button>
        <button
          className="font-semibold bg-darkblue text-white py-2 px-4 rounded"
          data-testid="filter-by-drink-btn"
          type="button"
          value="drink"
          onClick={ handleCategoryChange }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          recipes && recipes
            .filter(
              (recipe) => (
                selectedCategory !== 'all' ? recipe.type === selectedCategory : recipe),
            )
            .map((recipe, index) => (
              <div
                key={ index }
                id={ `Receita-${recipe.id}` }
                className="flex mx-2 mt-3
                  rounded-xl shadow-md bg-white"
              >
                <button
                  type="button"
                  onClick={ pushToDetails }
                  className="flex rounded-xl shadow-md w-80"
                >
                  <img
                    className="rounded-l-xl"
                    alt="Card Receita"
                    name={ `./${recipe.type}s/${recipe.id}` }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                  />
                </button>
                <div className="flex flex-col w-full text-center">
                  <h3
                    className="text-start mx-2 text-l mt-3"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {
                      recipe.type === 'food'
                        ? `${recipe.nationality} - ${recipe.category}`
                        : recipe.alcoholicOrNot
                    }
                  </h3>
                  <button
                    data-testid={ `${index}-horizontal-name` }
                    type="button"
                    onClick={ pushToDetails }
                    name={ `./${recipe.type}s/${recipe.id}` }
                    className="font-bold text-start mx-2 text-xl mt-3"
                  >
                    {recipe.name}
                  </button>
                  <div
                    className="grid grid-cols-2 gap-1 mx-2 mt-3 h-16"
                  >
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ ShareIcon }
                      onClick={ () => handleShare(recipe.type, recipe.id) }
                      className="mx-auto"
                    >
                      {
                        linkCopied
                          ? 'Link copied!' : <img src={ ShareIcon } alt="Share" />
                      }
                    </button>
                    <button
                      className="mx-auto"
                      type="button"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      onClick={ handleFavorite }
                    >
                      <img
                        name={ recipe.id }
                        src={ blackHeartIcon }
                        alt="isFavorite"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </>
  );
}
