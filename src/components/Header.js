import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, showSearchBar, showProfileImg }) {
  const history = useHistory();
  const [searchBarToggle, setSearchBarToggle] = React.useState(false);
  return (
    <header className="w-full flex items-evenly py-6">
      {showProfileImg && (
        <button
          type="button"
          onClick={ () => { history.push('/profile'); } }
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="userIMG" />
        </button>
      )}
      <h2 data-testid="page-title">
        { pageName }
      </h2>
      {
        showSearchBar && (
          <button type="button" onClick={ () => setSearchBarToggle(!searchBarToggle) }>
            <img
              src={ searchIcon }
              alt="userIMG"
              data-testid="search-top-btn"
            />
          </button>)
      }
      {searchBarToggle && (
        <SearchBar />)}
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  showSearchBar: PropTypes.string.isRequired,
  showProfileImg: PropTypes.string.isRequired,
};

export default Header;
