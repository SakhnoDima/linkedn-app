'use client';
import LoginForm from '../components/LoginForm';

const SignInPage = () => {
    return (
        <div className="w-[450px] mx-auto mt-[200px] text-lg font-medium">
            <h2 className="mb-3 text-center">Sign In</h2>
            <LoginForm />
        </div>
    );
};

export default SignInPage;
