'use client';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';

const SignUpForm = ({ setIsShowPopup, setUserLogin }) => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUserLogin(login);

        try {
            const savingUser = await fetch('/api/save-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pass, login }),
            });

            if (!savingUser.ok) {
                const errorResponse = await savingUser.json();
                throw new Error(errorResponse.message || 'Something went wrong');
            }
            const { userId } = await savingUser.json();
            console.log('User saved');
            setIsShowPopup(true);

            const linkedinAuthorization = await fetch('/api/lambda-authorize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pass, login, userId }),
            });

            if (!linkedinAuthorization.ok) {
                const errorResponse = await linkedinAuthorization.json();
                throw new Error(errorResponse.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
            <Input name="login" type="text" placeholder="Linkedin login" value={login} onChange={(e) => setLogin(e.target.value)} className="input-bordered" />
            <Input name="pass" type="password" placeholder="Linkedin password" value={pass} onChange={(e) => setPass(e.target.value)} className="input-bordered" />
            <Button type="submit" className="btn-primary">
                <p>Send</p>
            </Button>
        </form>
    );
};

export default SignUpForm;
