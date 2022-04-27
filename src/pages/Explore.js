import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header />
      <section>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </button>
        <button
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
