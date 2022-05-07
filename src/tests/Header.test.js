import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Teste dos componentes Header', () => {
  it('Será validada a existência botões.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/foods');
    });
    const CINCO = 5;
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(CINCO);
  });
  it('Será validado o botão Profile.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/foods');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(buttons[0]);
    });
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
