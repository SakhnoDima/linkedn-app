'use client';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import Button from './Button';

const LoginForm = () => {
    const [codeSent, setCodeSent] = useState(false);
    const [email, setEmail] = useState('');

    const initialValues = {
        email: '',
        code: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        code: Yup.string().when('codeSent', {
            is: true,
            then: Yup.string().required('Code is required'),
        }),
    });

    const handleSendCode = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setErrors({ email: errorResponse.message });
                setSubmitting(false);
                return;
            }

            setCodeSent(true);
            setEmail(values.email);
        } catch (error) {
            console.error(error.message);
            setErrors({ email: 'An unexpected error occurred' });
            setSubmitting(false);
        }
    };

    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email, code: values.code }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setErrors({ code: errorResponse.message });
                setSubmitting(false);
                return;
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error.message);
            setErrors({ code: 'An unexpected error occurred' });
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={codeSent ? handleLogin : handleSendCode}>
            {({ isSubmitting, errors }) => (
                <Form className="flex flex-col gap-[15px]">
                    {errors.server && <div className="text-red-500">{errors.server}</div>}
                    <div className="flex flex-col gap-2">
                        <Field name="email" type="email" placeholder="Email" as={Input} className="input-bordered" />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    {codeSent && (
                        <div className="flex flex-col gap-2">
                            <Field name="code" type="text" placeholder="Verification Code" as={Input} className="input-bordered" />
                            <ErrorMessage name="code" component="div" className="text-red-500" />
                        </div>
                    )}
                    <Button type="submit" className="btn-primary" disabled={isSubmitting}>
                        <p>{codeSent ? 'Login' : 'Send Code'}</p>
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
