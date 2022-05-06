import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente <App.js />', () => {
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
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    const emailInput = await screen.findByTestId('email-input');
    const passWordInput = await screen.findByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passWordInput, { target: { value: '123456' } });
    userEvent.click(loginButton);
    expect(window.location.href).toBe('http://localhost/');
  });
});
