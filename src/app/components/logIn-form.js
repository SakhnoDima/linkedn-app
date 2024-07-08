'use client'
import { useState } from 'react';

const LoginForm = ({setIsShowPopup, setUserLogin }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

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
     
      setIsShowPopup(true)
      
      const linkedinAuthorization = await fetch('/api/lambda-authorize', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pass, login, userId }),
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
