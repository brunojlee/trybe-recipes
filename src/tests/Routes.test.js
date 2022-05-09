import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const timeDelay = 200;

describe('Teste das Rotas', () => {
  it('Foods.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/foods');
    });
    expect(screen.getByText('Foods')).toBeInTheDocument();
    await act(async () => {
      await delay(timeDelay);
    });
  });
  it('Drinks.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/drinks');
    });
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });
  it('Explore.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/explore');
    });
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });
  it('Explore Foods.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/explore/foods');
    });
    expect(screen.getByText('Explore Foods')).toBeInTheDocument();
  });
  it('Explore Drinks.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/explore/drinks');
    });
    expect(screen.getByText('Explore Drinks')).toBeInTheDocument();
  });
  it('Profile.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/profile');
    });
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
  it('Done Recipes.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/done-recipes');
    });
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
  it('Favorite Recipes.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/favorite-recipes');
    });
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });
  it('Not Found.', async () => {
    await act(async () => {
      await renderWithBrowser(<App />).history.push('/claudio');
    });
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
