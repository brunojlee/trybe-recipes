import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchDrinksId from '../services/fetchDrinksId';

function DrinkInProgress() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);

  const {
    loading,
    setLoading,
    ingredients,
    measures,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchDrinksId(recipeId);
      if (fetchApi.drinks) {
        setRecipeData([fetchApi.drinks[0]]);
        setLoading(false);
      }
    };
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 data-testid="recipe-title">
        Food in Progress Page
      </h1>
      {
        !loading && console.log(recipeData)
      }
      <img
        /* src={ recipe.strMealThumb } */
        alt="Foto da receita"
        data-testid="recipe-photo"
      />
      <div>
        {
          !loading && <h2 data-testid="recipe-category">{recipeData[0].strAlcoholic}</h2>
        }
        <ul>
          {
            ingredients.map((el, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                {`${el[1]} ${measures[index][1]}`}
              </li>
            ))
          }
        </ul>
      </div>

      <h2 data-testid="instructions">Instruções</h2>

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar receita
      </button>

    </>
  );
}

export default DrinkInProgress;
