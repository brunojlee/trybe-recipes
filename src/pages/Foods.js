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

if (!localStorage.getItem('inProgressRecipes')) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
}

export default function Foods() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  const [mealsCategory, setMealsCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState('All');

  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setMealsCategory(await fetchMealsCategory());
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
              <div>
                <button
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => handleCategory('All') }
                >
                  All
                </button>
                {mealsCategory.meals
                && mealsCategory.meals.slice(0, FIVE).map((category, index) => (
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
