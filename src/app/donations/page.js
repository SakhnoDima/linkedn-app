'use client';
import React, {useEffect, useState} from "react";
import axios from 'axios';
const CryptPaymentMethod = () => {

    useEffect(() => {
        const getCurrencyNetwork = async () => {
            try {
                const res = await axios.get('/api/get-currency-network');
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        }

        getCurrencyNetwork();
    }, [])

    return <>Crypt Payment Method</>
}

const FiatPaymentMethod = () => {

    return <>Fiat Payment Method</>
}

const ChoicePaymentMethod = ({paymentMethods, setPaymentMethods, setPaymentMethod}) => {
    const changeShow = (id) => {
        setPaymentMethods(paymentMethods.map(method =>
            method.id === id
                ? { ...method, isShow: true }
                : { ...method, isShow: false }

        ));
    }

    return <div className='flex gap-[14px]'>
        {paymentMethods.map((method) => {
            return (
                <div
                    className={`text-[18px] font-semibold border-[2px] p-[12px] rounded-[8px] ${method.isShow ? 'border-black' : ''}`}
                    key={method.id}
                    onClick={() => changeShow(method.id)}>
                    <img src={method.icon} alt={method.name} className={'pb-[12px]'}/>
                    {method.name}
                </div>
            )
        })}
    </div>
}

const Home = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        {id: 0, name: 'Cryptocurrency', type: 'crypt', isShow: true, icon: '/crypto-payment.png'},
        {id: 1, name: 'Fiat currency', type: 'fiat', isShow: false, icon: '/fiat-payment.png'}
    ])

    const [addressQR, setAddressQR] = useState()
    const [walletAddress, setWalletAddress] = useState()
    const [paymentMethod, setPaymentMethod] = useState('crypt')

    useEffect(() => {
        paymentMethods.map(method => {
            if (method.isShow) setPaymentMethod(method.type)
        })

    }, [paymentMethods]);

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
        <div className="pt-[10px]">
            <ChoicePaymentMethod paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} setPaymentMethod={setPaymentMethod}/>
            <div>
                {paymentMethod === 'crypt' ? <CryptPaymentMethod/> : <FiatPaymentMethod/>}
            </div>

        </div>
    );
};

export default Home;
