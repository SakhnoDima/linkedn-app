import {useState} from "react";
import {RiArrowDropDownLine} from "react-icons/ri";

export const CoinDropdown = ({selectedCoin, setSelectedCoin, setSelectedNetwork}) => {
    const [isActive, setIsActive] = useState(false)
    const coins = [
        {id: 0, name: 'USDT', fullName: 'TetherUS'},
        {id: 1, name: 'ETH', fullName: 'Ethereum'},
        {id: 2, name: 'BNB', fullName: 'BNB'},
        {id: 3, name: 'SOL', fullName: 'Solana'},
        {id: 4, name: 'USDC', fullName: 'USD coin'},
    ]

    return <div className={'relative select-none pt-[24px]'}>
        <h3 className={'text-[20px] font-medium pb-[14px]'}>1. Select Coin</h3>
        <div
            className={`px-5 py-4 bg-white shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)] font-bold flex items-center justify-between cursor-pointer  ${selectedCoin ? 'text-[#1f2937]' : 'text-[#8d96a0]'}`}
            onClick={() => setIsActive(!isActive)}>{selectedCoin ? selectedCoin : 'Select a coin'}<RiArrowDropDownLine
            size={'24px'}/></div>

        {isActive && (
            <div
                className={'absolute z-10 top-[110%] left-0 p-4 bg-white shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)] font-medium text-gray-800 w-full'}>
                {coins.map(coin => (
                    <div className={'p-2 cursor-pointer hover:bg-gray-200'}
                         key={coin.id}
                         onClick={() => {
                             setSelectedCoin(coin.name)
                             setIsActive(false)
                             setSelectedNetwork('')
                         }}>
                        {coin.name}
                    </div>
                ))}

            </div>
        )}
    </div>
}

export const NetworkDropdown = ({coinNetworks, selectedNetwork, setSelectedNetwork, selectedCoin}) => {
    const [isActive, setIsActive] = useState(false)


    return <div className={'relative select-none pt-[14px]'}>
        <h3 className={'text-[20px] font-medium pb-[14px]'}>2. Select Network</h3>
        <div
            className={`px-5 py-4 bg-white shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)] font-bold  flex items-center justify-between ${selectedCoin ? 'text-[#1f2937] cursor-pointer' : 'cursor-not-allowed text-[#8d96a0]'}`}
            onClick={() => {
                selectedCoin && setIsActive(!isActive)
            }}>
            {selectedNetwork ? selectedNetwork : 'Select a network'}
            <RiArrowDropDownLine size={'24px'}/>
        </div>

        {isActive && (
            <div
                className={'absolute z-10 top-[110%] left-0 p-4 max-h-[340px] overflow-y-scroll bg-white shadow-[3px_3px_16px_6px_rgba(0,0,0,0.06)] font-medium text-gray-800 w-full'}>
                {coinNetworks.map((network, index) => (
                    <div className={'p-2 cursor-pointer hover:bg-gray-200'}
                         key={index}
                         onClick={() => {
                             setSelectedNetwork(network.network)
                             setIsActive(false)
                         }}>
                        <div>
                            {network.network}
                        </div>
                        <div>
                            {network.name}
                        </div>
                    </div>
                ))}

            </div>
        )}
    </div>
}

