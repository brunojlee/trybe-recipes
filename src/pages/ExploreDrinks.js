import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerIconDrink from '../images/explore2.svg';
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
      <main>
        <button
          className="font-bold bg-darkblue font-3xl text-white
            rounded-xl py-2 px-4 mt-4 opacity-90
            hover:opacity-100"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => { history.push('drinks/ingredients'); } }
        >
          By Ingredient
        </button>
        <button
          className="font-bold bg-darkblue font-3xl text-white
            rounded-xl py-2 px-4 mt-4 opacity-90
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

export default ExploreDrinks;
