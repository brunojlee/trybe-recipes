import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 1000;

describe('Teste o componente <App.js />', () => {
  it('Será validada a existência dos botões de Done Recipes, Favorite Recipes e Logout.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />).history.push('/profile');
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
      expect(doneRecipesBtn).toBeInTheDocument();

      const favoriteRecipesBtn = screen
        .getByRole('button', { name: /favorite recipes/i });
      expect(favoriteRecipesBtn).toBeInTheDocument();

      const LogoutBtn = screen.getByRole('button', { name: /logout/i });
      expect(LogoutBtn).toBeInTheDocument();
    });

  it('Será validada a existência do email da pessoa usuária na tela.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />).history.push('../');
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const loginButton = screen.getByTestId('login-submit-btn');
      await act(async () => {
        await delay(timeDelay);
        await userEvent.type(emailInput, 'teste@teste.com');
        await userEvent.type(passwordInput, '12345678');
        fireEvent.click(loginButton);
        fireEvent.click(screen.getAllByRole('button')[0]);
      });
      expect(screen.getByText('teste@teste.com')).toBeInTheDocument();
    });

  it('Será validada a funcionalidade do botão Done Recipes.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />).history.push('/profile');
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
      await act(async () => {
        fireEvent.click(doneRecipesBtn);
      });
      expect(screen.getByText('Done Recipes')).toBeInTheDocument();
    });

  it('Será validada a funcionalidade do botão Favorite Recipes.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />).history.push('../profile');
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const favoriteRecipesBtn = screen
        .getByRole('button', { name: /favorite recipes/i });
      await act(async () => {
        fireEvent.click(favoriteRecipesBtn);
      });
      expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
      /*
      const LogoutBtn = screen.getByRole('button', { name: /logout/i }); */
    });

  it('Será validada a funcionalidade do botão logout.',
    async () => {
      await act(async () => {
        renderWithBrowser(<App />).history.push('../profile');
      });
      await act(async () => {
        await delay(timeDelay);
      });
      const LogoutBtn = screen.getByRole('button', { name: /logout/i });
      await act(async () => {
        fireEvent.click(LogoutBtn);
      });
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
});
