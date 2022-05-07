import { fireEvent, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 1500;
const btnCount = 23;
const imgCount = 17;

describe('Teste da página inicial de comidas ', () => {
  it('Serão validados os componentes.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(btnCount);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(imgCount);
  });

  it('Serão validados o filtro Ordinary Drink.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const ordDrinkfBtn = screen.getByText('Ordinary Drink');
    expect(ordDrinkfBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(ordDrinkfBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/410 gone/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Cocktail.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const cocktailBtn = screen.getByText('Cocktail');
    expect(cocktailBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(cocktailBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/747 drink/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Shake.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const shakeBtn = screen.getByText('Shake');
    expect(shakeBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(shakeBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/avalanche/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Other/Unknown.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const otUnkBtn = screen.getByText('Other/Unknown');
    expect(otUnkBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(otUnkBtn);
      await delay(timeDelay);
    });
    expect(screen.getByText(/gg/i)).toBeInTheDocument();
  });

  it('Serão validados o filtro Cocoa.', async () => {
    await act(async () => {
      renderWithBrowser(<App />).history.push('/drinks');
    });
    await act(async () => {
      await delay(timeDelay);
    });
    const cocoaBtn = screen.getByText('Cocoa');
    expect(cocoaBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(cocoaBtn);
      await delay(timeDelay);
    });

    const drink = screen.getByText(/chocolate drink/i);
    expect(drink).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(drink);
      await delay(timeDelay);
    });
    expect(screen.getAllByText(/chocolate/i)[0]).toBeInTheDocument();
  });
});
