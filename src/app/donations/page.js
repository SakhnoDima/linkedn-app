'use client';
import {useEffect, useState} from "react";
import axios from 'axios';

const Home = () => {
    const [addressQR, setAddressQR] = useState()
    const [walletAddress, setWalletAddress] = useState()

    useEffect(() => {
        const getWalletAddress = async () => {
            try {
                const res = await axios.get('/api/binance-wallet-address');
                // console.log(res.data);
                setAddressQR(res.data.qrCode)
                setWalletAddress(res.data.address)
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        }

        getWalletAddress();
    }, []);


    return (
        <div>
            <h1>Donations page</h1>
            <div>address: {walletAddress}</div>
            <img src={addressQR} alt={'address QR'}/>
        </div>
    );
};

export default Home;
