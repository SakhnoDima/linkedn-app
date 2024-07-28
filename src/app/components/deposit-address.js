import {useEffect, useState} from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa6";


export const DepositAddress = ({selectedCoin, selectedNetwork}) => {
    const [addressQR, setAddressQR] = useState()
    const [walletAddress, setWalletAddress] = useState()

    useEffect(() => {
        const getWalletAddress = async () => {
            try {
                const res = await axios.get('/api/binance-wallet-address', {
                    params: {
                        coin: selectedCoin,
                        network: selectedNetwork
                    },
                });
                setAddressQR(res.data.qrCode)
                setWalletAddress(res.data.address)
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        }

        if (selectedCoin && selectedNetwork) {
            getWalletAddress();
        }
    }, [selectedCoin, selectedNetwork]);


    return <div className={'pt-[14px]'}>
        <h3 className={'text-[20px] font-medium pb-[14px]'}>3. Deposit Address</h3>
        {(selectedNetwork && walletAddress) && (
            <div className={'flex shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)] items-center pr-[8px]'}>
                <img src={addressQR} alt={'addressQR'}/>
                <div className={'break-all flex flex-col gap-[6px] pt-[8px] pb-[8px]'}>
                    <div>
                        Address
                    </div>
                    <div className={'font-medium'}>
                        {walletAddress}
                    </div>
                    <button className="btn w-[100px]" onClick={() => navigator.clipboard.writeText(walletAddress)}>
                        <FaRegCopy/>
                        Copy
                    </button>
                </div>
            </div>
        )}


    </div>
}