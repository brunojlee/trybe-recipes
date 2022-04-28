import React from 'react';
import FoodRecipeCard from '../components/FoodRecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Foods() {
  return (
    <>
      <Header pageName="Foods" showSearchBar="true" showProfileImg="true" />
      <main>
        <FoodRecipeCard />
      </main>
      <Footer />
    </>
  );
}
