/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import {
  fetchDrinksCategory,
  fetchFilterDrinksByCategory,
} from '../services/fetchCategory';
import fetchDrinks from '../services/fetchDrinks';

if (!localStorage.getItem('inProgressRecipes')) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
}

export default function Drinks() {
  const regexIngredient = /([a-z])\w+/;
  const ingredientExplorer = window.location.search.match(regexIngredient) !== null
    ? window.location.search.match(regexIngredient)[0]
    : '';
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  const [drinksCategory, setDrinksCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState('All');
  const [watchUrl] = useState(window.location.search);
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setDrinksCategory(await fetchDrinksCategory());
      if (watchUrl === `?INGREDIENT=${ingredientExplorer}`) {
        await setSearchResults(await fetchDrinks('ingredient', ingredientExplorer));
      }
    };
    handleSearchFetch();
  }, []);

  useEffect(() => {
    const handleFetchCategory = async () => {
      if (categorySelected) {
        const filterDrinksByCategory = await
        fetchFilterDrinksByCategory(categorySelected);
        await setSearchResults(filterDrinksByCategory);
        setLoading(false);
      }
    };
    handleFetchCategory();
  }, [categorySelected]);

  const handleCategory = (category) => {
    setLoading(true);
    setCategorySelected(category);
  };

  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main className="mt-1 mb-20">
        {
          !loading && (
            <>
              <div className="flex flex-wrap w-screen justify-center h-24 items-center">
                <button
                  className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => handleCategory('All') }
                >
                  All
                </button>
                {drinksCategory.drinks
                && drinksCategory.drinks.slice(0, FIVE).map((category, index) => (
                  <button
                    className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
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
              <RecipeCard
                drinks={ searchResults.drinks
                  ? searchResults.drinks.slice(0, TWELVE) : '' }
              />
            </>
          )
        }
      </main>
      <Footer />
    </>
  );
}
