/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCardNationality from '../components/RecipeCardNationality';
import RecipesContext from '../context/RecipesContext';
import {
  fetchFilterMealsByArea, fetchMealsAreas,
} from '../services/fetchMealsAreas';

export default function FoodsNationalities() {
  const { searchResults,
    setSearchResults,
    loading,
    setLoading } = useContext(RecipesContext);

  const [mealsCategory, setMealsCategory] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const TWELVE = 12;
  const choices = 27;

  useEffect(() => {
    const handleSearchFetch = async () => {
      await setMealsCategory(await fetchMealsAreas());
      setCategorySelected('All');
    };
    handleSearchFetch();
  }, []);

  useEffect(() => {
    const handleFetchCategory = async () => {
      if (categorySelected) {
        const filterMealsByCategory = await fetchFilterMealsByArea(categorySelected);
        await setSearchResults(filterMealsByCategory);
        setLoading(false);
      }
    };
    handleFetchCategory();
  }, [categorySelected]);

  const handleCategory = ({ target }) => {
    setLoading(true);
    setCategorySelected(target.value);
  };

  return (
    <>
      <Header
        pageName="Explore Nationalities"
        showSearchBar="true"
        showProfileImg="true"
      />
      <main className="mt-1 mb-20">
        {
          !loading && (
            <>
              <div className="flex flex-wrap w-screen justify-center h-24 items-center">
                <select
                  className="w-full shadow mx-4 p-2 text-lg rounded-lg"
                  value={ categorySelected }
                  data-testid="explore-by-nationality-dropdown"
                  name="areaFilter"
                  required
                  onChange={ handleCategory }
                >
                  <option
                    data-testid="All-option"
                  >
                    All
                  </option>
                  {mealsCategory.meals
                && mealsCategory.meals.slice(0, choices).map((option, index) => (
                  <option
                    key={ index }
                    data-testid={ `${option.strArea}-option` }
                  >
                    {option.strArea}
                  </option>
                ))}
                </select>
              </div>
              <RecipeCardNationality
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
