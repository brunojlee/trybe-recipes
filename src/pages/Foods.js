import React, { useContext, useState } from 'react';
import FoodRecipeCard from '../components/FoodRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Foods() {
  const [showCard, setShowCard] = useState(false);
  const { searchResults } = useContext(RecipesContext);

  if (showCard === false && searchResults.meals && searchResults.meals.length > 0) {
    setShowCard(true);
  }
  return (
    <>
      <Header pageName="Foods" showSearchBar="true" showProfileImg="true" />
      <main>
        {showCard && (<FoodRecipeCard />) }
      </main>
      <Footer />
    </>
  );
}
