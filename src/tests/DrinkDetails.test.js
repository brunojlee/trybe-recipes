import { /* fireEvent,  */ screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithBrowser from './Helpers/renderWithBrowser';

it('Será validado a SearchBar na página de receitas de Drinks.', async () => {
  await act(async () => {
    renderWithBrowser(<App />).history.push('/drinks/178319');
  });

  expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
});
