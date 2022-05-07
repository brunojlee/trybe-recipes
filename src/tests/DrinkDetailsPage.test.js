import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 2000;
const aquamarineImgs = 9;

describe('Teste da página de detalhes de bebidas ', () => {
  it('Serão validados os componentes.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks/178319');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(aquamarineImgs);

    const favBtn = screen.getByTestId('favorite-btn');
    await act(async () => {
      fireEvent.click(favBtn);
    });
    const startBtn = screen.getByTestId('start-recipe-btn');
    await act(async () => {
      fireEvent.click(startBtn);
    });
    console.log(window.location.pathname);
    expect(window.location.pathname).toBe('/drinks/178319/in-progress');
  });
});
