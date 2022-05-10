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
      <main className="flex flex-wrap w-screen justify-center h-24 items-center">
        <img
          className="w-60 mx-auto mt-5 mb-4"
          src={ ExplorerIconDrink }
          alt="Button who shows a wave"
        />
        <div className="flex flex-col mx-4 w-full">
          <button
            className="font-2xl font-semibold mt-4
            bg-darkblue text-white rounded-xl py-3 opacity-100
            hover:opacity-90"
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
            className="font-2xl font-semibold mt-2
            bg-darkblue text-white rounded-xl py-3 opacity-100
            hover:opacity-90"
            type="button"
            data-testid="explore-by-nationality"
            onClick={ () => { history.push('foods/nationalities'); } }
          >
            By Nationality
          </button>
          <button
            className="font-2xl font-semibold mt-2
            bg-darkblue text-white rounded-xl py-3 opacity-100
            hover:opacity-90"
            type="button"
            data-testid="explore-surprise"
            onClick={ () => handleSurprise() }
          >
            Surprise me!
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
