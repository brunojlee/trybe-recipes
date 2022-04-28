import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Profile() {
  const history = useHistory();
  const { userEmail } = useContext(RecipesContext);

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header pageName="Profile" showProfileImg="true" />
      <span data-testid="profile-email">
        {userEmail}
      </span>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => { clearLocalStorage(); } }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
