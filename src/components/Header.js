import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName }) {
  return (
    <header>
      <img src={ profileIcon } alt="userIMG" />
      <h2>
        { pageName }
      </h2>
      <button type="button">
        <img
          src={ searchIcon }
          alt="userIMG"
          data-testid="search-top-btn"
        />
      </button>
      <SearchBar />
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
