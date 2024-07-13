'use client';

import axios from 'axios';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import Input from './input';
import Button from './button';




const LinkedinSignUpForm = () => {
    const { data: session } = useSession();
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
          
 
        try {
            const linkedinAuthorization = await axios.post('/api/lambda-authorize', {
                pass,
                login,
                userId: session.user.id
              }, {
                headers: {
                  'Content-Type': 'application/json'
                },
                timeout: 600000 
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

export default LinkedinSignUpForm;
