import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredientsList } from '../services/fetchIngredientsList';

export default function FoodsIngredients() {
  const { loading, setLoading } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsNames, setIngredientsNames] = useState([]);

  const TWELVE = 12;

  useEffect(() => {
    const handleIngredientsCard = async () => {
      const mealsIngredientsList = await fetchMealsIngredientsList();
      const firstTwelveIngredients = (mealsIngredientsList.meals).slice(0, TWELVE);
      setIngredientsList(firstTwelveIngredients);
      const teste = firstTwelveIngredients
        .map((ingredient) => ingredient.strIngredient);
      setIngredientsNames(teste);
    };
    handleIngredientsCard();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(ingredientsNames);

  return (
    <>
      <Header pageName="Explore Ingredients" showProfileImg="true" />
      <main>
        {
          (!loading && ingredientsList.length > 0) && (
            ingredientsList.map((ingredient, index) => (

              <IngredientCard meals={ ingredient } key={ index } />
            ))
          )
        }
      </main>
      <Footer />
    </>
  );
}
