import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      className={ `${styles['footer-container']}` }
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
        src={ DrinkIcon }
      >
        <img src={ DrinkIcon } alt="Drink" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => { history.push('/explore'); } }
        src={ ExploreIcon }
      >
        <img src={ ExploreIcon } alt="Drink" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => { history.push('/foods'); } }
        src={ MealIcon }
      >
        <img src={ MealIcon } alt="Drink" />
      </button>
    </footer>
  );
}

export default Footer;
