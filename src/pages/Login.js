import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function Login({ history }) {
  const {
    isButtonDisabled,
    setIsButtonDisabled,
    userEmail,
    setUserEmail,
    password,
    setPassword,
  } = useContext(RecipesContext);

  const handleEmail = ({ target: { value } }) => {
    setUserEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
    history.push('/foods');
  };

  useEffect(() => {
    const validateButton = async () => {
      const minPasswordLength = 6;
      const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (password.length > minPasswordLength && userEmail.match(emailFormatRegex)) {
        await setIsButtonDisabled(false);
      } else {
        await setIsButtonDisabled(true);
      }
    };
    validateButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, password]);

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="email"
          value={ userEmail }
          onChange={ (event) => handleEmail(event) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ (event) => handlePassword(event) }
        />
      </label>
      <button
        disabled={ isButtonDisabled }
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => handleClick() }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Login;
