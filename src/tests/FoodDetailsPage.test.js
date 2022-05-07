import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';
import renderWithRouter from './Helpers/renderWithRouter';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 2000;
const arrabiataImgs = 9;
const recipe = '/foods/52771';
describe('Teste da página de detalhes de comidas ', () => {
  it('Serão validados os componentes.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push(recipe);
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getByText(/arrabiata/i)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(arrabiataImgs);

    const favBtn = screen.getByTestId('favorite-btn');
    await act(async () => {
      fireEvent.click(favBtn);
    });
    const startBtn = screen.getByTestId('start-recipe-btn');
    await act(async () => {
      fireEvent.click(startBtn);
    });
    expect(window.location.pathname).toBe('/foods/52771/in-progress');
  });
  it('Será validado o botão de voltar.', async () => {
    await act(async () => {
      renderWithRouter(<App />).history.push(recipe);
    });
    await act(async () => {
      await delay(timeDelay);
      fireEvent.click(screen.getAllByRole('button')[0]);
    });
    expect(window.location.pathname).not.toBe(recipe);
  });
});
