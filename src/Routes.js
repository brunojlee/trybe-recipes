import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import imports from './imports';

const {
  Login,
  Profile,
  DoneRecipes,
  Drinks,
  DrinksIngredients,
  Explore,
  ExploreFoods,
  ExploreDrinks,
  FavoriteRecipes,
  Foods,
  FoodsIngredients,
  FoodsNationalities,
  FoodDetails,
  DrinkDetails,
  FoodInProgress,
  DrinkInProgress,
} = imports;

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" to={ Login } />
      <Route path="/foods" to={ Foods } />
      <Route path="/drinks" to={ Drinks } />
      <Route path="/foods/:id" to={ FoodDetails } />
      <Route path="/drinks/:id" to={ DrinkDetails } />
      <Route path="/foods/:id/in-progress" to={ FoodInProgress } />
      <Route path="/drinks/:id/in-progress" to={ DrinkInProgress } />
      <Route path="/explore" to={ Explore } />
      <Route path="/explore/foods" to={ ExploreFoods } />
      <Route path="/explore/drinks" to={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" to={ FoodsIngredients } />
      <Route path="/explore/drinks/ingredients" to={ DrinksIngredients } />
      <Route path="/explore/foods/nationalities" to={ FoodsNationalities } />
      <Route path="/profile" to={ Profile } />
      <Route path="/done-recipes" to={ DoneRecipes } />
      <Route path="/favorite-recipes" to={ FavoriteRecipes } />
    </Switch>
  </Router>
);

export default Routes;
