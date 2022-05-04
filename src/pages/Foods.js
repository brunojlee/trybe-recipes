/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import { fetchFilterMealByCategory, fetchMealsCategory } from '../services/fetchCategory';
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
  const [categorySelected, setCategorySelected] = useState('All');

  // if (loading === false && searchResults.m && searchResults.m.length > 0) {
  //   setLoading(true);
  // }

  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const handleSearchFetch = async () => {
      setSearchResults(await fetchFoods('name', ''));
      setMealsCategory(await fetchMealsCategory());
      setLoading(false);
    };
    handleSearchFetch();
  }, []);

  // useEffect(() => {
  //   const handleFetchCategory = async () => {
  //     setLoading(true);
  //     if (categorySelected !== 'All') {
  //       const teste = await fetchFilterMealByCategory(categorySelected);
  //       setSearchResults(teste);
  //       setLoading(false);
  //       console.log(teste);
  //     } if (categorySelected === 'All') {
  //       const teste = await fetchFoods('ingredient', '');
  //       setSearchResults(teste);
  //       console.log(teste);
  //     }
  //   };
  //   handleFetchCategory();
  //   // setLoading(false);
  // }, [categorySelected]);

  useEffect(() => {
    if (categorySelected !== 'All') {
      const handleFetchCategory = async () => {
        const teste = await fetchFilterMealByCategory(categorySelected);
        setSearchResults(teste);
        setLoading(false);
        console.log(teste);
      };
      handleFetchCategory();
    }
    if (categorySelected === 'All') {
      const handleFetchCategory = async () => {
        const teste = await fetchFoods('ingredient', '');
        setSearchResults(teste);
        console.log(teste.meals);
        // setLoading(false);
      };
      handleFetchCategory();
    }
    // setLoading(false);
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
                {mealsCategory.meals.slice(0, FIVE).map((category, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `${category.strCategory}-category-filter` }
                    onClick={ () => handleCategory(category.strCategory) }
                  >
                    {category.strCategory}
                  </button>
                ))}
              </div>
              <RecipeCard meals={ searchResults.meals.slice(0, TWELVE) } />
            </>
          )
        }
      </main>
      <Footer />
    </>
  );
}
