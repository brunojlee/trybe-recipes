import React, { useEffect, useState } from 'react';
import fetchFoodsId from '../services/fetchFoodsId';

function FoodDetails() {
  const regexNumbers = /([0-9])\w+/;
  const recipeId = window.location.pathname.match(regexNumbers)[0];
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const updateData = async () => {
      const fetchApi = await fetchFoodsId(recipeId);
      if (fetchApi.meals) {
        setRecipeData(fetchApi.meals[0]);
      }
    };
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(recipeData);
  return (
    <h1>
      Food Details Page
    </h1>
  );
}

export default FoodDetails;
