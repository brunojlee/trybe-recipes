/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchDrinks from '../services/fetchDrinks';

if (!localStorage.getItem('inProgressRecipes')) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
}

export default function Drinks() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  if (loading === false && searchResults.meals && searchResults.meals.length > 0) {
    setLoading(true);
  }

  const MAGIC_NUMBER = 12;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setSearchResults(await fetchDrinks('name', ''));
      setLoading(false);
    };
    handleSearchFetch();
  }, []);

  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main className="mt-1 mb-20">
        {
          !loading && (
            <RecipeCard drinks={ searchResults.drinks.slice(0, MAGIC_NUMBER) } />
          )
        }
      </main>
      <Footer />
    </>
  );
}
