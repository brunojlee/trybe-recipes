/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchDrinksId from '../services/fetchDrinksId';
import { getCheckedIngredients, saveCheckedIngredients } from '../services/localStorage';
import './FoodInProgress.css';

function DrinkInProgress() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);

  const {
    loading,
    setLoading,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
    isChecked,
    setIsChecked,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      getCheckedIngredients();
      const fetchApi = await fetchDrinksId(recipeId);
      if (fetchApi.drinks) {
        setRecipeData(fetchApi.drinks[0]);
        setLoading(false);
      }
    };
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      const fetchIngredients = () => {
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
      };
      fetchIngredients();
    }
  }, [recipeData]);

  useEffect(() => {
    saveCheckedIngredients(recipeId, isChecked);
  }, [isChecked]);

  const handleChange = ({ target }) => {
    const { name } = target;
    setIsChecked((prevSelection) => ({
      ...prevSelection, [name]: target.checked,
    }));
    document.getElementById(
      name,
    ).classList.toggle('done');
    console.log(isChecked);
  };

  return (
    <>
      <h1 data-testid="recipe-title">
        Drink in Progress Page
      </h1>
      <img
        /* src={ recipe.strMealThumb } */
        alt="Foto da receita"
        data-testid="recipe-photo"
        src={ recipeData.strDrinkThumb }
      />
      <div>
        <h2 data-testid="recipe-category">{recipeData.strAlcoholic}</h2>
        <ul>
          {
            ingredients.map((el, index) => (
              <li
                className="ingredient"
                id={ `ingredient${index}` }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                {`${el[1]} ${measures[index][1]}`}
                <input
                  type="checkbox"
                  name={ `ingredient${index}` }
                  checked={ isChecked[`ingredient${index}`]
                    ? isChecked[`ingredient${index}`] : false }
                  onChange={ handleChange }
                />
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
