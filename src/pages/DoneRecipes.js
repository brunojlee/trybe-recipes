import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const index = 0;
  return (
    <>
      <Header pageName="Done Recipes" showProfileImg="true" />
      <div>
        <div className="flex flex-wrap w-screen justify-center h-24 items-center">
          <button
            className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
            data-testid="filter-by-all-btn"
            type="button"
          >
            All
          </button>
          <button
            className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
            data-testid="filter-by-food-btn"
            type="button"
          >
            Food
          </button>
          <button
            className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </button>
        </div>

        <div>
          <img
            alt="Card Receita"
            data-testid={ `${index}-horizontal-image` }
          />

          <span
            data-testid={ `${index}-horizontal-top-text` }
          />
          <span
            data-testid={ `${index}-horizontal-name` }
          />

          <span
            data-testid={ `${index}-horizontal-done-date` }
          />
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Imagem de compartilhamento"
          />
        </div>
      </div>
    </>
  );
}
