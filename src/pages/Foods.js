/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchFoods from '../services/fetchFoods';

export default function Foods() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  if (loading === false && searchResults.drinks && searchResults.drinks.length > 0) {
    setLoading(true);
  }

  const MAGIC_NUMBER = 12;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setSearchResults(await fetchFoods('name', ''));
      setLoading(false);
    };
    handleSearchFetch();
  }, []);

  return (
    <>
      <Header pageName="Foods" showSearchBar="true" showProfileImg="true" />
      <main>
        {
          !loading && (
            <RecipeCard meals={ searchResults.meals.slice(0, MAGIC_NUMBER) } />
          )
        }
      </main>
      <Footer />
    </>
  );
}
