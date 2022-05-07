import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Será validada a existência dos botões de Done Recipes, Favorite Recipes e Logout.',
    async () => {
      renderWithRouter(<App />).history.push('/profile');

      const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
      expect(doneRecipesBtn).toBeInTheDocument();

      const favoriteRecipesBtn = screen
        .getByRole('button', { name: /favorite recipes/i });
      expect(favoriteRecipesBtn).toBeInTheDocument();

      const LogoutBtn = screen.getByRole('button', { name: /logout/i });
      expect(LogoutBtn).toBeInTheDocument();
    });
/*
  it('Será validada a existência do email da pessoa usuária na tela.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />);
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const emailInput = screen.getByText(/email/i);
      expect(emailInput).toBeInTheDocument();
      const passwordText = screen.getByText(/senha/i);
      expect(passwordText).toBeInTheDocument();
      const loginButton = await screen.findByTestId('login-submit-btn');
      expect(loginButton).toBeInTheDocument();
      userEvent.type(emailInput, 'eduardo@trybe.com');
      userEvent.type(passwordInput, '12345678');
      userEvent.click(loginButton);

      const email = screen.getByRole('heading', { name: /eduardo@trybe\.com/i });
      expect(email).toBeInTheDocument();
    }); */
});
