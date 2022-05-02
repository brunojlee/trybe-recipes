import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

export default function Foods() {
  const [showCards, setShowCards] = useState(false);
  const { searchResults } = useContext(RecipesContext);

  if (showCards === false && searchResults.meals && searchResults.meals.length > 0) {
    setShowCards(true);
  }
  const MAGIC_NUMBER = 12;

  return (
    <>
      <Header pageName="Foods" showSearchBar="true" showProfileImg="true" />
      <main>
        {
          showCards && (
            <RecipeCard meals={ searchResults.meals.slice(0, MAGIC_NUMBER) } />
          )
        }
      </main>
      <Footer />
    </>
  );
}
