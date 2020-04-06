import React from 'react';
import { render, getAllByLabelText, getByDisplayValue } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});


test('do login', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
