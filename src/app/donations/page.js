'use client';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {CryptPaymentMethod} from "@/app/components/crypto-payment-method";
import {FiatPaymentMethod} from "@/app/components/fiat-payment-method";
import {ChoicePaymentMethod} from "@/app/components/choice-payment-method";

const Donations = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        {id: 0, name: 'Cryptocurrency', type: 'crypt', isShow: true, icon: '/crypto-payment.png'},
        {id: 1, name: 'Fiat currency', type: 'fiat', isShow: false, icon: '/fiat-payment.png'}
    ])

    const [paymentMethod, setPaymentMethod] = useState('crypt')

    useEffect(() => {
        paymentMethods.map(method => {
            if (method.isShow) setPaymentMethod(method.type)
        })
    }, [paymentMethods]);

    return (
        <div className="pt-[10px] w-[500px]">
            <ChoicePaymentMethod paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} setPaymentMethod={setPaymentMethod}/>
            {paymentMethod === 'crypt' ? <CryptPaymentMethod/> : <FiatPaymentMethod/>}
        </div>
    );
};

export default Donations;
