/* eslint-disable no-magic-numbers */
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 2000;
describe('Teste do componentes SearchBar ', () => {
  it('Será validado o Botão SearchBar.', async () => {
    await act(async () => {
      renderWithRouter(<App />).history.push('/foods');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      userEvent.click(buttons[1]);
    });
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('First Letter')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });
    act(() => {
      fireEvent.click(screen.getByText('All'));
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getAllByRole('radio').length).toBe(3);
    expect(screen.getAllByRole('button').length).toBe(24);
  });
});
