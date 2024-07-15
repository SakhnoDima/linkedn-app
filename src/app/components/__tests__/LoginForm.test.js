import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../login-form';

jest.mock('next/router', () => require('next-router-mock'));

describe('LoginForm', () => {
    it('renders the login form', () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });

    it('sends verification code on email submit', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Code sent successfully' }));

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Send Code'));

        await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/auth/send-code', expect.anything()));
        expect(screen.getByPlaceholderText('Verification Code')).toBeInTheDocument();
    });

    it('submits the verification code', async () => {
        fetch.mockResponses([JSON.stringify({ message: 'Code sent successfully' }), { status: 200 }], [JSON.stringify({ user: { name: 'Test User' } }), { status: 200 }]);

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Send Code'));

        await waitFor(() => screen.getByPlaceholderText('Verification Code'));

        fireEvent.change(screen.getByPlaceholderText('Verification Code'), { target: { value: '123456' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.anything()));
    });
});
