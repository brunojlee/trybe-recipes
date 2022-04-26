import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Senha"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
