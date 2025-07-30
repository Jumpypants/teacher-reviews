import { render } from '@testing-library/react';
import App from './App';

test('renders SchoolScope app without crashing', () => {
  render(<App />);
  // Just check that the app renders without crashing
  expect(document.body).toBeInTheDocument();
});
