import { useEffect, useRef, useContext } from 'react';
import { IWalletContext, WalletContext } from 'contexts/WalletProvider/';
import { useWeb3Context } from 'web3-react';
import { AbstractConnectorArguments } from '@web3-react/types';

export default function useWalletInfo() {
    const walletInfo = useContext<IWalletContext>(WalletContext);
    const context: any = useWeb3Context();
    const handleInitializeWallet = () => {
        // context.unSetConnector();
        if (!walletInfo.isConnected && walletInfo.isLoading && walletInfo.isWeb3Available) {
            console.log('Unsetting the connector');
            context.unsetConnector();
        }
        context.setConnector('MetaMask');
    };
    return {
        walletInfo,
        handleInitializeWallet,
    };
}
