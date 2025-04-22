import { render, screen, fireEvent } from '@testing-library/react';
import QueryInput from '../components/QueryInput';

describe('QueryInput Component', () => {
  test('renders text input and buttons', () => {
    render(<QueryInput query="" setQuery={() => {}} onSubmit={() => {}} loading={false} />);
    expect(screen.getByPlaceholderText('Ask your question...')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Speak')).toBeInTheDocument();
  });
});