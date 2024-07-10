import sendCode from '../send-code';
import { createMocks } from 'node-mocks-http';

jest.mock('nodemailer', () => ({
    createTransport: () => ({
        sendMail: jest.fn().mockResolvedValue(true),
    }),
}));

describe('/api/auth/send-code', () => {
    it('sends a verification code', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
            },
        });

        await sendCode(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toEqual(JSON.stringify({ message: 'Code sent successfully' }));
    });

    it('returns an error if sending fails', async () => {
        jest.requireMock('nodemailer').createTransport().sendMail.mockRejectedValueOnce(new Error('Failed to send'));

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
            },
        });

        await sendCode(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(res._getData()).toEqual(JSON.stringify({ message: 'Failed to send code' }));
    });
});
