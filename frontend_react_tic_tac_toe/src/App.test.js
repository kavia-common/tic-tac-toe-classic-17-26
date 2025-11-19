import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial status for next player', () => {
  render(<App />);
  const statusEl = screen.getByText(/Next player: X/i);
  expect(statusEl).toBeInTheDocument();
});
