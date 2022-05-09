import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExplorerIcon from '../images/explore.svg';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header pageName="Explore" showProfileImg="true" />
      <section className="flex flex-col items-center h-full pt-48">
        <div>
          <img
            className="object-cover h-44"
            src={ ExplorerIcon }
            alt="logo app"
          />
        </div>
        <button
          className="font-bold bg-darkblue font-3xl text-white
            rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
          type="button"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </button>
        <button
          className="font-bold bg-darkblue font-3xl text-white
            rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => { history.push('/explore/drinks'); } }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </>
  );
}
