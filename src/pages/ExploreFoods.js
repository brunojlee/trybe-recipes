import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomFoods } from '../services/fetchRandomRecipe';
import RecipesContext from '../context/RecipesContext';

function ExploreFoods() {
  const history = useHistory();
  const [randomMeal, setRandomMeal] = useState('');

  const { setLoading } = useContext(RecipesContext);

  const handleSurprise = () => {
    history.push(`/foods/${randomMeal.idMeal}`);
  };

  useEffect(() => {
    const handleFetchCategory = async () => {
      const request = await fetchRandomFoods();
      setRandomMeal(request.meals[0]);
    };
    handleFetchCategory();
  }, []);

  return (
    <>
      <Header pageName="Explore Foods" showProfileImg="true" />
      <main>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            setLoading(true);
            history.push('foods/ingredients');
          } }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => { history.push('foods/nationalities'); } }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleSurprise() }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
