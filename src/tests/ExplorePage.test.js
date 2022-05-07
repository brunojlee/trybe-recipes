import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 500;

describe('Teste da página de explorar comidas ', () => {
  it('Serão validados os componentes Foods by Ingredient.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/explore');
    });
    const exploreFoodsBtn = screen.getByText(/explore foods/i);
    expect(exploreFoodsBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(exploreFoodsBtn);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(window.location.pathname).toBe('/explore/foods');
    const byIngredientsBtn = screen.getByText(/by ingredient/i);
    expect(byIngredientsBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(byIngredientsBtn);
    });
    expect(window.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('Serão validados os componentes Foods by Nationality.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/explore');
    });
    const exploreFoodsBtn = screen.getByText(/explore foods/i);
    await act(async () => {
      fireEvent.click(exploreFoodsBtn);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const byNationalityBtn = screen.getByText(/by nationality/i);
    expect(byNationalityBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(byNationalityBtn);
    });
    expect(window.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('Serão validados os componentes Foods Surprise Me.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/explore');
    });
    const exploreFoodsBtn = screen.getByText(/explore foods/i);
    await act(async () => {
      fireEvent.click(exploreFoodsBtn);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const surpriseBtn = screen.getByText(/surprise me/i);
    expect(surpriseBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(surpriseBtn);
    });
    expect(window.location.pathname).not.toBe('/explore/foods');
  });
});

describe('Teste da página de explorar bebidas ', () => {
  it('Serão validados os componentes Drinks by Ingredient.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/explore');
    });
    const exploreDrinksBtn = screen.getByText(/explore drinks/i);
    expect(exploreDrinksBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(exploreDrinksBtn);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(window.location.pathname).toBe('/explore/drinks');
    const byIngredientsBtn = screen.getByText(/by ingredient/i);
    expect(byIngredientsBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(byIngredientsBtn);
    });
    expect(window.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('Serão validados os componentes Drinks Surprise Me.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/explore/drinks');
    });
    const exploreDrinksBtn = screen.getByText(/explore drinks/i);
    await act(async () => {
      fireEvent.click(exploreDrinksBtn);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const surpriseBtn = screen.getByText(/surprise me/i);
    expect(surpriseBtn).toBeInTheDocument();/*
    await act(async () => {
      fireEvent.click(surpriseBtn);
    });
    expect(window.location.pathname).toBe('/drinks/undefined'); */
  });
});
