import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const [showCards, setShowCards] = useState(false);
  const { searchResults } = useContext(RecipesContext);

  if (showCards === false && searchResults.drinks && searchResults.drinks.length > 0) {
    setShowCards(true);
  }
  const MAGIC_NUMBER = 12;

  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main>
        {
          showCards && (
            <RecipeCard drinks={ searchResults.drinks.slice(0, MAGIC_NUMBER) } />
          )
        }
      </main>
      <Footer />
    </>
  );
}
