import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 1000;

describe('Teste da página de detalhes de comidas ', () => {
  it('Será validado redirecionamento.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods/53060/in-progress');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    await act(async () => {
      fireEvent.click(finishBtn);
    });
    expect(window.location.pathname).toBe('/done-recipes');
  });
  it('Serão validados os componentes.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods/53060/in-progress');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getByText(/instruções/i)).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn');
    await act(async () => {
      fireEvent.click(favBtn);
    });
    const ingredients = screen.getAllByRole('checkbox');
    await act(async () => {
      fireEvent.click(ingredients[0]);
      fireEvent.click(ingredients[1]);
      fireEvent.click(ingredients[2]);
      fireEvent.click(ingredients[3]);
      fireEvent.click(ingredients[4]);
      fireEvent.click(ingredients[5]);
    });
    const textDecoration = 'text-decoration';
    expect(ingredients[0].style[0]).toBe(textDecoration);
    expect(ingredients[1].style[0]).toBe(textDecoration);
    expect(ingredients[2].style[0]).toBe(textDecoration);
    expect(ingredients[3].style[0]).toBe(textDecoration);
    expect(ingredients[4].style[0]).toBe(textDecoration);
    expect(ingredients[5].style[0]).toBe(textDecoration);
  });
});
