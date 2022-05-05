import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, showSearchBar, showProfileImg }) {
  const history = useHistory();
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  const { loading, setLoading } = useContext(RecipesContext);
  const handleSearchBar = () => {
    setLoading(!loading);
    setSearchBarToggle(!searchBarToggle);
  };
  return (
    <>
      <header
        className="flex justify-between px-8 py-6 bg-orange
        border-b-4 border-darkblue"
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
        <h2 className="text-2xl font-bold" data-testid="page-title">
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
  pageName: PropTypes.string.isRequired,
  showSearchBar: PropTypes.string.isRequired,
  showProfileImg: PropTypes.string.isRequired,
};

export default Header;
