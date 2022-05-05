/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import {
  fetchDrinksCategory, fetchFilterDrinksByCategory,
} from '../services/fetchCategory';

export default function Drinks() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  const [drinksCategory, setDrinksCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState('All');

  if (loading === false && searchResults.meals && searchResults.meals.length > 0) {
    setLoading(true);
  }

  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setDrinksCategory(await fetchDrinksCategory());
    };
    handleSearchFetch();
  }, []);
  useEffect(() => {
    const handleFetchCategory = async () => {
      setLoading(true);
      console.log(categorySelected);
      if (categorySelected) {
        const teste = await fetchFilterDrinksByCategory(categorySelected);
        setSearchResults(teste);
        setLoading(false);
        console.log(teste);
      }
    };
    handleFetchCategory();
    // setLoading(false);
  }, [categorySelected]);

  const handleCategory = async (category) => {
    await setCategorySelected(category);
  };

  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main className="mt-1 mb-20">
        {
          !loading && (
            <>
              <div>
                <button
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => handleCategory('All') }
                >
                  All
                </button>
                {drinksCategory.drinks.slice(0, FIVE).map((category, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `${category.strCategory}-category-filter` }
                    onClick={ () => handleCategory(
                      category.strCategory === categorySelected
                        ? 'All' : category.strCategory,
                    ) }
                  >
                    {category.strCategory}
                  </button>
                ))}
              </div>
              <RecipeCard drinks={ searchResults.drinks.slice(0, TWELVE) } />
            </>
          )
        }
      </main>
      <Footer />
    </>
  );
}
