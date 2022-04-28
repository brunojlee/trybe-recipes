import React from 'react';
import DrinkRecipeCard from '../components/DrinkRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <>
      <Header pageName="Drinks" showSearchBar="true" showProfileImg="true" />
      <main>
        <DrinkRecipeCard />
      </main>
      <Footer />
    </>
  );
}
