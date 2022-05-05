import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';
import fetchIngredientsImage from '../services/fetchIngredientsImage';

function IngredientCard({ drinks, meals }) {
  // const history = useHistory();

  // const { loading, setLoading } = useContext(RecipesContext);

  const [ingredientImage, setIngredientImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleIngredientsCard = async () => {
      // setIngredientImage(await fetchIngredientsImage(meals.strIngredient));
      console.log(meals.strIngredient);
      if (meals.strIngredient) {
        const teste = await fetchIngredientsImage(meals.strIngredient);
        console.log(teste);
        setIngredientImage(teste);
      }
    };
    handleIngredientsCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setLoading(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ingredientImage]);

  if (!loading && drinks && drinks.length > 0) {
    return (
      <div>
        {
          (!loading && drinks && drinks.length > 0) && (
            drinks.map((recipe, index) => (
              <div data-testid={ `${index}-ingredient-card` } key={ index }>
                <img
                  className="rounded-l"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strDrinkThumb }
                  alt="Drink"
                  style={ { maxWidth: '40%' } }
                />
                <div className="w-full text-center">
                  <h2
                    className="text-2xl text-darkblue"
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe.strDrink }
                  </h2>
                </div>
              </div>
            ))
          )
        }

      </div>
    );
  }
  return (
    <div>
      {
        (!loading && meals && meals.length > 0) && (
          meals.map((recipe, index) => (
            <div data-testid={ `${index}-ingredient-card` } key={ index }>
              <img
                className="rounded-l"
                data-testid={ `${index}-card-img` }
                src={ ingredientImage }
                alt="Meal"
                style={ { maxWidth: '40%' } }
              />
              <div className="w-full text-center">
                <h2
                  className="text-2xl text-darkblue"
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strIngredient }
                </h2>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

IngredientCard.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.any),
  meals: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientCard;
