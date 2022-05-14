import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerIconDrink from '../images/explore3.svg';
import { fetchRandomDrinks } from '../services/fetchRandomRecipe';

function ExploreDrinks() {
  const history = useHistory();
  const [randomDrinks, setRandomDrinks] = useState('');

  // const { loading, setLoading } = useContext(RecipesContext);

  const handleSurprise = () => {
    // setLoading(true);
    history.push(`/drinks/${randomDrinks.idDrink}`);
  };

  useEffect(() => {
    const handleFetchCategory = async () => {
      const request = await fetchRandomDrinks();
      setRandomDrinks(request.drinks[0]);
    };
    handleFetchCategory();
  }, []);

  return (
    <>
      <Header pageName="Explore Drinks" showProfileImg="true" />
      <main className="flex flex-wrap w-screen justify-center h-24 items-center">
        <img
          className="w-4/5 mx-auto mt-5 mb-5"
          src={ ExplorerIconDrink }
          alt="logo app"
        />
        <div className="flex flex-col mx-4 w-full">

          <button
            className="font-2xl font-semibold mt-5
            bg-darkblue text-white rounded-xl py-3 opacity-100
            hover:opacity-90"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => { history.push('drinks/ingredients'); } }
          >
            By Ingredient
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

export default ExploreDrinks;
