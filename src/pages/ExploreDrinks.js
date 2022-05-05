import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => { history.push('drinks/ingredients'); } }
        >
          By Ingredient
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

export default ExploreDrinks;
