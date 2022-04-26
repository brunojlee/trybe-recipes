import React from 'react';
import SearchBar from './SearchBar';

function Header() {
  return (
    <>
      <button
        data-testid="search-top-btn"
        type="button"
      >
        Eu sou uma lupa
      </button>
      <SearchBar />
    </>
  );
}

export default Header;
