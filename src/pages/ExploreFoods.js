import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import ExplorerIconDrink from '../images/explore2.svg';
import { fetchRandomFoods } from '../services/fetchRandomRecipe';

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
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
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
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => { history.push('foods/nationalities'); } }
        >
          By Nationality
        </button>
        <button
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleSurprise() }
        >
          Surprise me!
        </button>
        <img
          className="wy-50"
          src={ ExplorerIconDrink }
          alt="logo app"
        />
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
