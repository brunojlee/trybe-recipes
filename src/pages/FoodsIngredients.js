import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsIngredientsList } from '../services/fetchIngredientsList';
import backgroundImage from '../images/Intersect2.svg';

export default function FoodsIngredients() {
  const { loading, setLoading } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);

  const TWELVE = 12;

  useEffect(() => {
    const handleIngredientsCard = async () => {
      const mealsIngredientsList = await fetchMealsIngredientsList();
      const firstTwelveIngredients = (mealsIngredientsList.meals).slice(0, TWELVE);
      setIngredientsList(firstTwelveIngredients);
    };
    handleIngredientsCard();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header pageName="Explore Ingredients" showProfileImg="true" />
      <img
        src={ backgroundImage }
        alt="background"
        className="bottom-0 w-screen fixed bg-scroll -z-10"
      />
      <main className="mt-1 mb-20">
        {
          (!loading && ingredientsList.length > 0) && (
            ingredientsList.map((ingredient, index) => (

              <IngredientCard meals={ ingredient } index={ index } key={ index } />
            ))
          )
        }
      </main>
      <Footer />
    </>
  );
}
