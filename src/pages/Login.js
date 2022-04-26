import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const {
    isButtonDisabled,
    setIsButtonDisabled,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(RecipesContext);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    validateButton();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
    const minPasswordLength = 6;
    // const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (password.length > minPasswordLength) {
      setIsButtonDisabled(false);
    }
    setIsButtonDisabled(true);
  }, [email, password]);

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="email"
          value={ email }
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
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
