'use client'
import { useState } from 'react';

const LoginForm = ({setIsShowPopup}) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsShowPopup(true)
    console.log("login", login);
    console.log("pass", pass);
    const res = await fetch('/api/lambda-log-in', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pass, login}),
    })
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
