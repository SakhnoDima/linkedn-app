"use client"

import { useState } from 'react';

import LoginForm from './components/logIn-form';
import Popup from './components/po-pup';

const Home = () => {
 const [isShowPopup, setIsShowPopup] = useState(false)
  return (
    <div>
      <LoginForm setIsShowPopup={setIsShowPopup}/>
       {isShowPopup ? < Popup/> : "" }
    </div>
  );
};

export default Home;
