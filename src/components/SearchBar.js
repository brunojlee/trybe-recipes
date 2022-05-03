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
        setLoading(false);
      }
      if (pageLocation === 'drinks') {
        setSearchResults(await fetchDrinks(radioSelected, searchBarInput));
        setLoading(false);
      }
    };
    handleSearchFetch();
  }, [resultClick]);

  useEffect(() => {
    if (searchBarInput.length > 1 && radioSelected === 'first-letter') {
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
    <form className="bg-grey1 border-b-4 border-darkblue text-white text-center">
      <input
        className="text-black mt-4 mb-2 py-1 px-2 rounded-xl border-2 border-darkblue"
        type="text"
        data-testid="search-input"
        onChange={ handleInputChange }
        value={ searchBarInput }
      />
      <div className="w-screen flex justify-evenly">
        <label
          className="font-bold text-black flex items-center "
          htmlFor="ingredient"
        >
          <input
            className="mr-2 checked:after:bg-black"
            data-testid="ingredient-search-radio"
            name="radios"
            value="ingredient"
            type="radio"
            onClick={ handleSelectedRadio }
          />
          Ingredient
        </label>
        <label
          className="font-bold text-black flex items-center"
          htmlFor="name"
        >
          <input
            className="mr-2"
            data-testid="name-search-radio"
            name="radios"
            value="name"
            type="radio"
            onClick={ handleSelectedRadio }
          />
          Name
        </label>
        <label
          className="font-bold text-black flex items-center"
          htmlFor="first-letter"
        >
          <input
            className="mr-2"
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
        className="font-bold bg-yellow font-3xl text-darkblue
        rounded-xl py-1 px-4 mb-2 opacity-90
        hover:opacity-100"
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
