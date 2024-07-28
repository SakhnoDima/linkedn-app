import React from "react";

export const ChoicePaymentMethod = ({paymentMethods, setPaymentMethods, setPaymentMethod}) => {
    const changeShow = (id) => {
        setPaymentMethods(paymentMethods.map(method =>
            method.id === id
                ? {...method, isShow: true}
                : {...method, isShow: false}
        ));
    }

    return <div className='flex gap-[14px]'>
        {paymentMethods.map((method) => {
            return (
                <div
                    className={`text-[18px] w-[50%] cursor-pointer font-semibold border-[2px] p-[12px] rounded-[8px] ${method.isShow ? 'border-black shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)]' : ''}`}
                    key={method.id}
                    onClick={() => changeShow(method.id)}>
                    <img src={method.icon} alt={method.name} className={'pb-[12px]'}/>
                    {method.name}
                </div>
            )
        })}
    </div>
}