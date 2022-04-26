import React from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider() {
  return (
    <RecipesContext.Provider>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
