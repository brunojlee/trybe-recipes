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
  const { searchResults, setSearchResults, setLoading } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const checkPage = async () => {
      await setLoading(true);
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
    setLoading(true);
    setRadio(target.value);
  };

  const handleInputChange = ({ target }) => {
    setLoading(true);
    setSearchBarInput(target.value);
  };

  useEffect(() => {
    setLoading(true);
    const handleSearchFetch = async () => {
      await setLoading(true);
      if (pageLocation === 'foods') {
        await setSearchResults(await fetchFoods(radioSelected, searchBarInput));
        setLoading(false);
      }
      if (pageLocation === 'drinks') {
        await setSearchResults(await fetchDrinks(radioSelected, searchBarInput));
        setLoading(false);
      }
    };
    handleSearchFetch();
  }, [resultClick]);

  useEffect(() => {
    if (searchBarInput.length > 1 && radioSelected === 'first-letter') {
      setLoading(true);
      global.alert('Your search must have only 1 (one) character');
    }
  }, [searchBarInput, radioSelected]);

  useEffect(() => {
    if (searchResults.meals && searchResults.meals.length === 1) {
      setLoading(true);
      history.push(`./${pageLocation}/${searchResults.meals[0].idMeal}`);
    }
    if (searchResults.drinks && searchResults.drinks.length === 1) {
      setLoading(true);
      history.push(`./${pageLocation}/${searchResults.drinks[0].idDrink}`);
    }
    if (searchResults.meals === null) {
      setLoading(true);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (searchResults.drinks === null) {
      setLoading(true);
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [searchResults]);

  return (
    <form className="bg-orange text-center">
      <div
        className="flex flex-col mx-3 mb-3"
      >
        <input
          className="placeholder: pl-[16px]
          rounded-md  h-10
          focus:outline-none"
          placeholder="Search for a recipe..."
          type="text"
          data-testid="search-input"
          onChange={ handleInputChange }
          value={ searchBarInput }
        />
      </div>
      <div className="flex justify-evenly mx-2">
        <label
          className="font-medium form-check-label text-white ml-3"
          htmlFor="ingredient"
        >
          <input
            className="form-check-input rounded-full h-4 w-4 accent-orange"
            data-testid="ingredient-search-radio"
            name="radios"
            value="ingredient"
            type="radio"
            onClick={ handleSelectedRadio }
          />
          Ingredient
        </label>
        <label
          className="font-medium form-check-label text-white ml-4"
          htmlFor="name"
        >
          <input
            className="form-check-input rounded-full h-4 w-4 accent-orange"
            data-testid="name-search-radio"
            name="radios"
            value="name"
            type="radio"
            onClick={ handleSelectedRadio }
          />
          Name
        </label>
        <label
          className="font-medium form-check-label text-white ml-4"
          htmlFor="first-letter"
        >
          <input
            className="form-check-input rounded-full h-4 w-4 accent-orange"
            data-testid="first-letter-search-radio"
            name="radios"
            value="first-letter"
            type="radio"
            onClick={ handleSelectedRadio }
          />
          First Letter
        </label>
      </div>
      <button
        className="font-bold bg-white text-black
        rounded-md py-2 px-5 mt-3 mb-3 opacity-100
        hover:opacity-90"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          setLoading(true);
          setResultClick(!resultClick);
        } }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
