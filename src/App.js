import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import RecipesProvider from './context/RecipesProvider';
import Routes from './Routes';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
