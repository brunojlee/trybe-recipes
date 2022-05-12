import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileImage from '../images/profile3.svg';

export default function Profile() {
  const history = useHistory();
  const userEmail = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : { email: '' };

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <section className="text-center">
      <Header pageName="Profile" showProfileImg="true" />
      <div className="flex flex-col items-center w-70 mt-4">
        <img
          className="w-3/5"
          src={ ProfileImage }
          alt="Profile figure"
        />
        <h2
          className="w-full mx-auto font-semibold text-2xl py-3"
          data-testid="profile-email"
        >
          {userEmail.email}
        </h2>
      </div>
      <div className="flex flex-col mx-4 h-full">
        <button
          className="font-bold
          bg-darkblue text-white rounded-xl py-3 opacity-100
          hover:opacity-90"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          className="font-bold mt-2
          bg-darkblue text-white rounded-xl py-3 opacity-100
          hover:opacity-90"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          className="font-bold mt-2
          bg-darkblue text-white rounded-xl py-3 opacity-100
          hover:opacity-90"
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
