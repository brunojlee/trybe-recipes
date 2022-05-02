import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header pageName="Explore" showProfileImg="true" />
      <section className="flex flex-col items-center h-full pt-48">
        <button
          className="font-bold bg-yellow font-3xl text-darkblue
            rounded-xl py-2 px-4 mt-4 opacity-90
          hover:opacity-100"
          type="button"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </button>
        <button
          className="font-bold bg-yellow font-3xl text-darkblue
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
