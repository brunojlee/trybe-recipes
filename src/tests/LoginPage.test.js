import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste a página de Login', () => {
  it('Será validada a existência dos inputs, seus controles e botão.', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const emailText = screen.getByText(/email/i);
    expect(emailText).toBeInTheDocument();
    const passwordText = screen.getByText(/senha/i);
    expect(passwordText).toBeInTheDocument();
    const loginButton = await screen.findByTestId('login-submit-btn');
    expect(loginButton).toBeInTheDocument();
    const emailInput = await screen.findByTestId('email-input');
    const passWordInput = await screen.findByTestId('password-input');
    userEvent.type(emailInput, 'teste@teste.com');
    expect(loginButton).toBeDisabled();
    userEvent.type(passWordInput, '12345678');
    userEvent.click(loginButton);
    expect(loginButton).toBeEnabled();
  });
  it('Será validada a troca de página.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });
});
