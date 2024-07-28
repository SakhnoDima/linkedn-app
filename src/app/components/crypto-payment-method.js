import React, {useEffect, useState} from "react";
import axios from "axios";
import {CoinDropdown, NetworkDropdown} from "@/app/components/coin-dropdown";
import {DepositAddress} from "@/app/components/deposit-address";


export const CryptPaymentMethod = () => {
    const [selectedCoin, setSelectedCoin] = useState('')
    const [selectedNetwork, setSelectedNetwork] = useState('')
    const [coinNetworks, setCoinNetworks] = useState([])

    useEffect(() => {
        const getCurrencyNetwork = async () => {
            try {
                const res = await axios.get('/api/get-currency-network', {
                    params: {
                        coin: selectedCoin,
                    },
                });
                setCoinNetworks(res.data.currencyInfo.networkList)
            } catch (error) {
                console.error('Error fetching wallet address:', error);
            }
        }

        if (selectedCoin) {
            getCurrencyNetwork();
        }
    }, [selectedCoin])

    return <div>
        <CoinDropdown selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} setSelectedNetwork={setSelectedNetwork}/>
        <NetworkDropdown selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} coinNetworks={coinNetworks} selectedCoin={selectedCoin}/>
        <DepositAddress selectedCoin={selectedCoin} selectedNetwork={selectedNetwork}/>
    </div>
}