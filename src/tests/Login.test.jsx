import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Auth/Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText('Login to EduAI')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});