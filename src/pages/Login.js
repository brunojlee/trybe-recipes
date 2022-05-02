import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

import logoIcon from '../images/logoIcon.png';

function Login() {
  const history = useHistory();
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
    <div className="h-screen flex flex-col justify-center items-center bg-orange">
      <img
        className="w-50"
        src={ logoIcon }
        alt="logoapp"
      />
      <form className="mt-4 bg-orange flex flex-col items-center text-center">
        <label className="flex flex-col py-1" htmlFor="email">
          Email
          <input
            className="p-1 rounded-xl mt-2 w-60"
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="email"
            value={ userEmail }
            onChange={ (event) => handleEmail(event) }
          />
        </label>
        <label className="flex flex-col py-1" htmlFor="password">
          Senha
          <input
            className="p-1 rounded-xl mt-2 w-60"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ (event) => handlePassword(event) }
          />
        </label>
        <button
          className="bg-darkblue
          py-2 px-4 text-white rounded-xl mt-4 opacity-70 hover:opacity-100"
          disabled={ isButtonDisabled }
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
