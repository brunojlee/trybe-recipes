/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchDrinks from '../services/fetchDrinks';
import fetchFoods from '../services/fetchFoods';

function SearchBar() {
  const [pageLocation, setPageLocation] = useState('');
  const [radioSelected, setRadio] = useState('');
  const [searchBarInput, setSearchBarInput] = useState('');
  const [resultClick, setResultClick] = useState(false);
  const { searchResults, setSearchResults } = useContext(RecipesContext);
  const history = useHistory();

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

  useEffect(() => {
    const handleSearchFetch = async () => {
      if (pageLocation === 'foods') {
        setSearchResults(await fetchFoods(radioSelected, searchBarInput));
      }
      if (pageLocation === 'drinks') {
        setSearchResults(await fetchDrinks(radioSelected, searchBarInput));
      }
    };
    handleSearchFetch();
  }, [resultClick]);

  useEffect(() => {
    if (searchBarInput.length > 1 && radioSelected === 'first-letter') {
      alert('Your search must have only 1 (one) character');/*
      setSearchBarInput(''); */
    }
  }, [searchBarInput, radioSelected]);

  useEffect(() => {
    if (searchResults.meals && searchResults.meals.length === 1) {
      history.push(`./${pageLocation}/${searchResults.meals[0].idMeal}`);
    }
    if (searchResults.drinks && searchResults.drinks.length === 1) {
      history.push(`./${pageLocation}/${searchResults.drinks[0].idDrink}`);
    }
  }, [searchResults]);

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
          onClick={ () => setResultClick(!resultClick) }
        >
          Search
        </button>
      </label>
    </form>
  );
}

export default SearchBar;
