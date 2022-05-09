/* eslint-disable react-hooks/exhaustive-deps */
import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

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

      <div className="flex flex-wrap w-screen justify-center h-24 items-center">
        <button
          className="mx-2 bg-darkblue text-white py-1 px-4 rounded"

      <div>
        <button

          data-testid="filter-by-all-btn"
          type="button"
          value="all"
          onClick={ handleCategoryChange }
        >
          All
        </button>
        <button

          className="mx-2 bg-darkblue text-white py-1 px-4 rounded"

          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ handleCategoryChange }
        >
          Food
        </button>
        <button

          className="mx-2 bg-darkblue text-white py-1 px-4 rounded"

          data-testid="filter-by-drink-btn"
          type="button"
          value="drink"
          onClick={ handleCategoryChange }
        >
          Drinks
        </button>

        <div>
          {
            recipes && recipes
              .filter(
                (recipe) => (
                  selectedCategory !== 'all' ? recipe.type === selectedCategory : recipe),
              )
              .map((recipe, index) => (
                <div key={ index } id={ `Receita-${recipe.id}` }>
                  <button
                    type="button"
                    onClick={ pushToDetails }
                  >
                    <img
                      alt="Card Receita"
                      name={ `./${recipe.type}s/${recipe.id}` }
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                    />
                  </button>
                  <div>
                    <h3
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
                    >
                      {recipe.name}
                    </button>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ ShareIcon }
                      onClick={ () => handleShare(recipe.type, recipe.id) }
                    >
                      {
                        linkCopied
                          ? 'Link copied!' : <img src={ ShareIcon } alt="Share" />
                      }
                    </button>
                    <button
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
              ))
          }
        </div>
      </div>
    </>
  );
}
