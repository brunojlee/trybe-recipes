/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import {
  fetchFilterMealsByCategory,
  fetchMealsCategory,
} from '../services/fetchCategory';
import fetchFoods from '../services/fetchFoods';

if (!localStorage.getItem('inProgressRecipes')) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
}

export default function Foods() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  const [mealsCategory, setMealsCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const watchUrl = localStorage.getItem('ingredient')
    ? localStorage.getItem('ingredient') : '';
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setMealsCategory(await fetchMealsCategory());
      if (watchUrl.length > 0) {
        await setSearchResults(await fetchFoods('ingredient', watchUrl));
        localStorage.setItem('ingredient', '');
        setLoading(false);
      } else {
        setCategorySelected('All');
      }
    };
    handleSearchFetch();
  }, []);

  useEffect(() => {
    const handleFetchCategory = async () => {
      if (categorySelected) {
        const filterMealsByCategory = await fetchFilterMealsByCategory(categorySelected);
        await setSearchResults(filterMealsByCategory);
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
      <Header pageName="Foods" showSearchBar="true" showProfileImg="true" />
      <main className="mt-1 mb-20">
        {
          !loading && (
            <>
              <div className="flex flex-wrap w-screen justify-center h-24 items-center">
                <button
                  className="mx-2 bg-darkblue text-white py-1 px-4 rounded"
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => {
                    handleCategory('All');
                    setLoading(false);
                  } }
                >
                  All
                </button>
                {mealsCategory.meals
                && mealsCategory.meals.slice(0, FIVE).map((category, index) => (
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
                meals={ searchResults.meals
                  ? searchResults.meals.slice(0, TWELVE) : '' }
              />
            </>
          )
        }
      </main>
      <Footer />
    </>
  );
}
