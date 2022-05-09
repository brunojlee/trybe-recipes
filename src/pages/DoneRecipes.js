import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setLoading } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(data);
  }, []);

  const handleShare = async (type, recipeId) => {
    await copy(`http://localhost:3000/${type}s/${recipeId}`);
    setLinkCopied(!linkCopied);
  };

  const handleCategoryChange = ({ target }) => {
    console.log(target.value);
    setSelectedCategory(target.value);
  };

  const pushToDetails = ({ target }) => {
    setLoading(true);
    history.push(target.name);
  };

  return (
    <>
      <Header pageName="Done Recipes" showProfileImg="true" />
      <div className="grid grid-cols-3 gap-2 mx-2 mt-3 mb-2">
        <button
          className="bg-darkblue text-white rounded font-semibold
          h-10 text-center"
          data-testid="filter-by-all-btn"
          type="button"
          value="all"
          onClick={ handleCategoryChange }
        >
          All
        </button>
        <button
          className="bg-darkblue text-white rounded font-semibold
          h-10 text-center"
          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ handleCategoryChange }
        >
          Food
        </button>
        <button
          className="bg-darkblue text-white rounded font-semibold
          h-10 text-center"
          data-testid="filter-by-drink-btn"
          type="button"
          value="drink"
          onClick={ handleCategoryChange }
        >
          Drinks
        </button>

        <div>
          {
            doneRecipes && doneRecipes
              .filter(
                (recipe) => (
                  selectedCategory !== 'all' ? recipe.type === selectedCategory : recipe),
              )
              .map((recipe, index) => (
                <div key={ index }>
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
                    <p data-testid={ `${index}-horizontal-done-date` }>
                      {recipe.doneDate}

                    </p>
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
                    <div>
                      {recipe.tags.map((tag, i) => (
                        <span
                          key={ i }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </span>))}
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </>
  );
}
