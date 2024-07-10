import login from '../login';
import { createMocks } from 'node-mocks-http';

describe('/api/auth/login', () => {
    it('logs in with the correct code', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
                code: '123456',
            },
        });

        await login(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toEqual(JSON.stringify({ message: 'Login successful' }));
    });

    it('returns an error with an incorrect code', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
                code: '000000',
            },
        });

        await login(req, res);

        expect(res._getStatusCode()).toBe(401);
        expect(res._getData()).toEqual(JSON.stringify({ message: 'Invalid code' }));
    });
});
