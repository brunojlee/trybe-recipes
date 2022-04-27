import React, { useEffect } from 'react';
import fetchDrinks from '../services/fetchDrinks';
import fetchFoods from '../services/fetchFoods';

function SearchBar() {
  const apiFilter = async (radio, value) => {
    const activeUrl = window.location.href;
    if (activeUrl.includes('/foods')) {
      try {
        const data = await fetchFoods({ radio, value,
        });
        return data;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const data = await fetchDrinks();
        return data;
      } catch (error) {
        return error;
      }
    }
  };

  useEffect(() => { }, []);
  const consoleTexto = () => {
    console.log(apiFilter());
  };

  const handleSelectedSortOrd = () => {
    apiFilter('ingredient', 'chicken_breast');
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="radios"
          value="ingredient"
          type="radio"
          onClick={ handleSelectedSortOrd }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="radios"
          value="name"
          type="radio"
          /* onClick={ handleSelectedSortOrd } */
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          name="radios"
          value="first-letter"
          type="radio"
          /* onClick={ handleSelectedSortOrd } */
        />
        First Letter
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ consoleTexto }
        >
          Search
        </button>
      </label>
    </form>
  );
}

export default SearchBar;
