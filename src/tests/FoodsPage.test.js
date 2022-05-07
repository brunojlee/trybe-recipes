import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 1200;
const btnCount = 23;
const imgCount = 17;

describe('Teste da página inicial de comidas ', () => {
  it('Serão validados os componentes.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(btnCount);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(imgCount);
  });
  it('Serão validados o filtro Beef.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const beefBtn = screen.getByText('Beef');
    expect(beefBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(beefBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/beef and mustard pie/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Breakfast.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const breakfastBtn = screen.getByText('Breakfast');
    expect(breakfastBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(breakfastBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/breakfast potatoes/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Chicken.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const chickenBtn = screen.getByText('Chicken');
    expect(chickenBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(chickenBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/ayam percik/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Dessert.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const dessertBtn = screen.getByText('Dessert');
    expect(dessertBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(dessertBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/apam balik/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Goat.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/foods');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const goatBtn = screen.getByText('Goat');
    expect(goatBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(goatBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/roasted goat/i)).toBeInTheDocument();
  });
});
