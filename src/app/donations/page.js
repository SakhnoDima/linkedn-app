'use client';
import {useEffect, useState} from "react";
import axios from 'axios';


const CryptPaymentMethod = () => {

    return <>Crypt Payment Method</>
}

const FiatPaymentMethod = () => {

    return <>Fiat Payment Method</>
}

const PaymentMethod = ({name}) => {

    return <div>
        {name}
    </div>
}

const ChoicePaymentMethod = () => {

    return <div className='flex'>
      <PaymentMethod name={'Crypto'}/>
      <PaymentMethod name={'Fiat'}/>
    </div>
}

const Home = () => {
    const [addressQR, setAddressQR] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [paymentMethod, setPaymentMethod] = useState('crypt')

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
        <div className="border border-black pt-[10px]">
            <ChoicePaymentMethod/>
            <div>
                {paymentMethod === 'crypt' ? <CryptPaymentMethod/> : <FiatPaymentMethod/>}
            </div>
        </div>
    );
};

export default Home;
