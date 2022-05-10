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
    <section className="bg-grey2 h-full mb-6">
      <Header pageName="Done Recipes" showProfileImg="true" />
      <div className="grid grid-cols-3 gap-2 mx-2 mt-3 mb-6">
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
      </div>
      <div className="grid grid-cols-1 gap-4">
        {
          doneRecipes && doneRecipes
            .filter(
              (recipe) => (
                selectedCategory !== 'all' ? recipe.type === selectedCategory : recipe),
            )
            .map((recipe, index) => (
              <div
                key={ index }
                className="grid grid-cols-2 mx-2 rounded-xl bg-white shadow"
              >
                <button
                  type="button"
                  onClick={ pushToDetails }
                >
                  <img
                    className="rounded-l-xl"
                    alt="Card Receita"
                    name={ `./${recipe.type}s/${recipe.id}` }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                  />
                </button>
                <div
                  className="px-2 flex flex-col w-full justify-around text-center"
                >
                  <div className="w-full flex flex-row justify-around">
                    <h3
                      className="text-grey3 text-tiny"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {
                        recipe.type === 'food'
                          ? `${recipe.nationality} - ${recipe.category}`
                          : recipe.alcoholicOrNot
                      }

                    </h3>
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ ShareIcon }
                      onClick={ () => handleShare(recipe.type, recipe.id) }
                    >
                      {
                        linkCopied
                          ? 'Link copied!'
                          : <img className="w-4 mx-auto" src={ ShareIcon } alt="Share" />
                      }
                    </button>
                  </div>
                  <button
                    className="text-lg font-bold"
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
                  <div className="flex flex-wrap justify-center">
                    {recipe.tags.map((tag, i) => (
                      <span
                        className="bg-yellow2 rounded-full text-tiny m-1 p-1"
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
    </section>
  );
}
