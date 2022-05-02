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
    <section className="text-center h-screen">
      <Header pageName="Profile" showProfileImg="true" />
      <h2
        className="w-full mx-auto font-bold text-2xl py-8 border-b-2 border-darkblue"
        data-testid="profile-email"
      >
        {userEmail}
      </h2>
      <div className="flex flex-col pt-24 justify-center my-auto items-center">
        <button
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
            hover:opacity-100"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
            hover:opacity-100"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          className="font-2xl bg-darkblue text-white rounded-xl py-2 px-4 mt-4 opacity-90
            hover:opacity-100"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { clearLocalStorage(); } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </section>
  );
}
