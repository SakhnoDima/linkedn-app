"use client"

import { useState } from 'react';

import LoginForm from './components/logIn-form';
import Popup from './components/pop-up';

const Home = () => {
 const [isShowPopup, setIsShowPopup] = useState(false)
 const [userLogin, setUserLogin] = useState("")
  return (
    <div>
      <LoginForm setIsShowPopup={setIsShowPopup} setUserLogin={setUserLogin}/>
       {isShowPopup ? < Popup userLogin={userLogin} /> : "" }
    </div>
  );
};

export default Home;
