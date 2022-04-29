import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  return (
    <>
      <Header pageName="Done Recipes" showProfileImg="true" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>

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
