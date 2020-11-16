import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navigation bar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Store Front End/i);
  expect(linkElement).toBeInTheDocument();
});
