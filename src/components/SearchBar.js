import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import fetchDrinks from '../services/fetchDrinks';
import fetchFoods from '../services/fetchFoods';

function SearchBar() {
  const [pageLocation, setPageLocation] = useState('');
  const [radioSelected, setRadio] = useState('');
  const [searchBarInput, setSearchBarInput] = useState('');
  const { searchResults, setSearchResults } = useContext(RecipesContext);

  useEffect(() => {
    const checkPage = () => {
      const activeUrl = window.location.href;
      if (activeUrl.includes('/foods')) {
        setPageLocation('foods');
      } else {
        setPageLocation('drinks');
      }
    };
    checkPage();
  }, []);

  const handleSelectedRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleInputChange = ({ target }) => {
    setSearchBarInput(target.value);
  };

  const handleSearchFetch = async () => {
    if (pageLocation === 'foods') {
      setSearchResults(fetchFoods(radioSelected, searchBarInput));
      console.log(searchResults);
    }
    if (pageLocation === 'drinks') {
      setSearchResults(await fetchDrinks(radioSelected, searchBarInput));
      console.log(searchResults.meals);
    }
  };

  useEffect(() => {
    if (searchBarInput.length > 1 && radioSelected === 'first-letter') {
      // eslint-disable-next-line react-hooks/exhaustive-deps, no-alert
      alert('Your search must have only 1 (one) character');/*
      setSearchBarInput(''); */
    }
  }, [searchBarInput, radioSelected]);

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleInputChange }
        value={ searchBarInput }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="radios"
          value="ingredient"
          type="radio"
          onClick={ handleSelectedRadio }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="radios"
          value="name"
          type="radio"
          onClick={ handleSelectedRadio }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          name="radios"
          value="first-letter"
          type="radio"
          onClick={ handleSelectedRadio }
        />
        First Letter
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchFetch }
        >
          Search
        </button>
      </label>
    </form>
  );
}

export default SearchBar;
