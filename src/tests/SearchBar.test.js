import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 1000;
const buttonId = 'exec-search-btn';
const FIRSTLETTER = 'First Letter';

describe('Teste do componentes SearchBar ', () => {
  it('Será validado a SearchBar na página de receitas de comidas.', async () => {
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
    expect(screen.getByText(FIRSTLETTER)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });
    act(() => {
      fireEvent.click(screen.getByText('All'));
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const THREE = 3;
    const TWENTYFOUR = 24;
    const radioButtons = screen.getAllByRole('radio');
    const searchInput = screen.getAllByRole('textbox');
    const searchButton = screen.getByTestId(buttonId);
    expect(radioButtons.length).toBe(THREE);
    expect(screen.getAllByRole('button').length).toBe(TWENTYFOUR);
    expect(screen.getAllByText(/corba/i)[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(radioButtons[0]);
      userEvent.type(searchInput[0], 'water');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getByText(/beef/i)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(radioButtons[1]);
      userEvent.type(searchInput[0], 'aeeeeeeeeee');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    await act(async () => {
      fireEvent.click(radioButtons[2]);
      userEvent.type(searchInput[0], 'ae');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
  });

  it('Será validado a SearchBar na página de receitas de Drinks.', async () => {
    await act(async () => {
      renderWithRouter(<App />).history.push('/drinks');
    });

    const buttons = screen.getAllByRole('button');
    await act(async () => {
      userEvent.click(buttons[1]);
    });
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText(FIRSTLETTER)).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });
    act(() => {
      fireEvent.click(screen.getByText('All'));
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const THREE = 3;
    const radioButtons = screen.getAllByRole('radio');
    const searchInput = screen.getAllByRole('textbox');
    const searchButton = screen.getByTestId(buttonId);
    expect(radioButtons.length).toBe(THREE);
    expect(screen.getAllByText(/gg/i)[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(radioButtons[1]);
      userEvent.type(searchInput[0], 'adam');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getAllByText(/adam/i)[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(radioButtons[1]);
      userEvent.type(searchInput[0], 'aeeeeeeeee');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    await act(async () => {
      fireEvent.click(radioButtons[2]);
      userEvent.type(searchInput[0], 'ea');
      fireEvent.click(searchButton);
    });
    await act(async () => {
      await delay(timeDelay);
    });
  });

  it('Será validado a SearchBar na página de receitas de Drinks.', async () => {
    await act(async () => {
      renderWithRouter(<App />).history.push('/drinks');
    });
    const buttons = screen.getAllByRole('button');
    await act(async () => {
      userEvent.click(buttons[1]);
    });
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Ingredient')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText(FIRSTLETTER)).toBeInTheDocument();

    const radioButtons = screen.getAllByRole('radio');
    const searchInput = screen.getAllByRole('textbox');
    const searchButton = screen.getByTestId(buttonId);
    const three = 3;
    expect(radioButtons.length).toBe(three);
    await act(async () => {
      fireEvent.click(radioButtons[1]);
      await userEvent.type(searchInput[0], 'Aquamarine');
      fireEvent.click(searchButton);
    });
  });
});
