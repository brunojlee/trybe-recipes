import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import logoIcon from '../images/logo.svg';

function LoginCard() {
  const history = useHistory();
  const {
    isButtonDisabled,
    setIsButtonDisabled,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    setLoading,
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
    // localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    setLoading(true);
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
    <div className="flex flex-col justify-center items-center mx-4 my-4">
      <img
        className="w-full"
        src={ logoIcon }
        alt="logo app"
      />
      <form className="mt-5 flex flex-col items-center text-center">
        <label className="flex flex-col" htmlFor="email">
          <input
            className="placeholder: pl-[16px]
            rounded-xl mt-2 w-64 h-14
            focus:outline-none focus:ring-orange focus:ring-2
            "
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            value={ userEmail }
            onChange={ (event) => handleEmail(event) }
          />
        </label>
        <label className="flex flex-col" htmlFor="password">
          <input
            className="placeholder: pl-[16px]
            rounded-xl w-64 h-14
            focus:outline-none focus:ring-orange focus:ring-2
            "
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ (event) => handlePassword(event) }
          />
        </label>
        <button
          className="bg-orange disabled:opacity-50
          py-3 px-24 text-white rounded-xl mt-2 opacity-100 hover:opacity-90
          font-bold"
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

export default LoginCard;
