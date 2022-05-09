import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Teste do componentes Footer ', () => {
  it('Será validado o Botão Drinks.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/foods');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(buttons[2]);
    });
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });
  it('Será validado o Botão Explore.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/foods');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(buttons[3]);
    });
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });
  it('Será validado o Botão Foods.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/drinks');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(buttons[4]);
    });
    expect(screen.getByText('Foods')).toBeInTheDocument();
  });
});
