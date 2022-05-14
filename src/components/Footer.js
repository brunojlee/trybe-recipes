import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  const history = useHistory();
  const { setLoading } = useContext(RecipesContext);

  return (
    <footer
      data-testid="footer"
      className={
        `flex justify-between w-screen px-8 py-3 bg-orange ${styles['footer-container']}`
      }
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          setLoading(true);
          history.push('/drinks');
        } }
        src={ DrinkIcon }
      >
        <img src={ DrinkIcon } alt="Drink" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => {
          setLoading(true);
          history.push('/explore');
        } }
        src={ ExploreIcon }
      >
        <img src={ ExploreIcon } alt="Explore" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => {
          setLoading(true);
          history.push('/foods');
        } }
        src={ MealIcon }
      >
        <img src={ MealIcon } alt="Food" />
      </button>
    </footer>
  );
}

export default Footer;
