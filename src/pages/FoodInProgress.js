import React from 'react';

function FoodInProgress() {
  return (
    <>
      <h1 data-testid="recipe-title">
        Food in Progress Page
      </h1>
      <img
        src={ recipe.strMealThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
      />

      <div>
        <h3>Ingredients</h3>
      </div>

      <h2 data-testid="instructions">Instruções</h2>

      <button
        type="button"
        data-testid="share-btn"
        // onClick={}
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
        // onClick={}
      >
        Favoritar
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        // onClick={}
      >
        Finalizar receita
      </button>

    </>
  );
}

export default FoodInProgress;
