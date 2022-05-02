import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchFoodsId from '../services/fetchFoodsId';
import { getCheckedIngredients } from '../services/localStorage';
import './FoodInProgress.css';

function FoodInProgress() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const {
    loading,
    setLoading,
    ingredients,
    measures,
    setIngredients,
    setMeasures,
  } = useContext(RecipesContext);

  useEffect(() => {
    const updateData = async () => {
      getCheckedIngredients(recipeId);
      const fetchApi = await fetchFoodsId(recipeId);
      if (fetchApi.meals) {
        setRecipeData(fetchApi.meals[0]);
        setLoading(false);
      }
    };
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  const handleChange = ({ target }) => {
    const { name } = target;
    setIsChecked((prevSelection) => ({
      ...prevSelection, [name]: target.checked,
    }));
    document.getElementById(
      name,
    ).classList.toggle('done');
  };

  return (
    <>
      <h1 data-testid="recipe-title">
        Food in Progress Page
      </h1>
      <img
        /* src={ recipe.strMealThumb } */
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
