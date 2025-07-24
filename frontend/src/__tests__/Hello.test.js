// src/__tests__/Hello.test.js
import { render, screen } from '@testing-library/react';
import Hello from '../Components/Hello';

test('renders hello world', () => {
  render(<Hello />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
