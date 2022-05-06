import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do componentes SearchBar ', () => {
  it('Será validado o Botão SearchBar.', async () => {
    await act(async () => {
      await renderWithRouter(<App />).history.push('/foods');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(buttons[1]);
    });
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('First Letter')).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(screen.getByText('Search'));
    });
    const searchBarButtons = screen.getAllByRole('button');
    searchBarButtons.forEach((e) => console.log(e.children[0].innerHTML));
  });
});
