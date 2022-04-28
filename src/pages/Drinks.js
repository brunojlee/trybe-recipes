import React, { useContext, useState } from 'react';
import DrinkRecipeCard from '../components/DrinkRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const [showCards, setShowCards] = useState(false);
  const { searchResults } = useContext(RecipesContext);

  if (showCards === false && searchResults.drinks && searchResults.drinks.length > 0) {
    setShowCards(true);
  }
  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main>
        {showCards && (<DrinkRecipeCard />) }
      </main>
      <Footer />
    </>
  );
}
