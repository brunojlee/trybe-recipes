import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          name="radios"
          value="ingredient"
          type="radio"
          /*  onClick={ handleSelectedSortOrd } */
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          data-testid="name-search-radio"
          name="radios"
          value="name"
          type="radio"
          /* onClick={ handleSelectedSortOrd } */
        />
      </label>
      <label htmlFor="DESC">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          name="radios"
          value="first-letter"
          type="radio"
          /* onClick={ handleSelectedSortOrd } */
        />
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </label>
    </form>
  );
}

export default SearchBar;
