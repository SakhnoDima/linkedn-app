// const Home = () => {
//   return (
//     <div>
//       <h1>Home page</h1>
//     </div>
//   );
// };
//
// export default Home;

'use client';

import {useEffect} from "react";
import axios from 'axios';


const Home = () => {

    useEffect(() => {
        const getWalletAddress = async () => {
            console.log('start');

            try {
                const res = await axios.get('/api/binance-wallet-address');
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        }

        getWalletAddress();
    }, []);



  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
