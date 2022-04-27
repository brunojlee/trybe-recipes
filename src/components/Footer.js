import React from 'react';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => { history.push('/explore'); } }
      >
        Explore
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => { history.push('/foods'); } }
      >
        Foods
      </button>
    </footer>
  );
}

export default Footer;
