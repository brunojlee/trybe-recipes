import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, showSearchBar, showProfileImg }) {
  const history = useHistory();
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const handleSearchBar = async () => {
    setSearchBarToggle(!searchBarToggle);
  };
  return (
    <>
      <header
        className="flex justify-between align-center px-8 py-3 bg-orange text-white"
      >
        {showProfileImg && (
          <button
            type="button"
            onClick={ () => { history.push('/profile'); } }
          >
            <img
              className="stroke-current"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="userIMG"
            />
          </button>
        )}
        <h2 className="text-md font-bold" data-testid="page-title">
          { pageName }
        </h2>
        {
          showSearchBar && (
            <button type="button" onClick={ handleSearchBar }>
              <img
                src={ searchIcon }
                alt="userIMG"
                data-testid="search-top-btn"
              />
            </button>)
        }
      </header>
      <div>
        {
          searchBarToggle && (
            <SearchBar />)
        }
      </div>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
  showSearchBar: PropTypes.string,
  showProfileImg: PropTypes.string,
}.isRequired;

export default Header;
