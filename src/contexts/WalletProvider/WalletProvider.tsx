import React, { createContext, useState, useEffect } from 'react';

import { useWeb3Context } from 'web3-react';

export interface IWalletContext {
    isConnected: boolean;
    isLoading: boolean;
    isError: boolean;
    isWeb3Available: boolean;
    message: string | null;
    context: any;
}

const InitialWalletState = {
    isConnected: false,
    isLoading: true,
    isError: false,
    isWeb3Available: false,
    message: '',
    context: {},
};
export const WalletContext = createContext<IWalletContext>({
    ...InitialWalletState,
});

const WalletProvider: React.FC = ({ children }) => {
    const context: any = useWeb3Context();
    console.log(context);
    const [state, setState] = useState({
        ...InitialWalletState,
    });
    const handleWalletChange = () => {
        console.log('Wallet Connection is aletered');
        if (!context.active && !context.error) {
            // loading
            setState((state) => ({
                ...InitialWalletState,
                isLoading: true,
                isWeb3Available: true,
            }));
        } else if (context.error) {
            //error
            console.log(context.error.code);
            setState((state) => ({
                ...InitialWalletState,
                isError: true,
                isWeb3Available: context.error.code === 'NO_WEB3' ? false : true,
                message:
                    context.error.code === 'ETHEREUM_ACCESS_DENIED'
                        ? 'Ethereum Access Denied! Please refresh the page and try again!'
                        : '',
            }));
        } else {
            // Initialize rest of the contract information in this context
            context.library.eth.defaultAccount = context.account;

            setState((state) => ({
                ...InitialWalletState,
                isError: false,
                isLoading: false,
                isWeb3Available: true,
                message: null,
                isConnected: true,
                context,
            }));
        }
    };
    useEffect(() => {
        // context.unsetConnector();
        // context.setConnector('MetaMask');
    }, []);
    useEffect(() => {
        handleWalletChange();
        // context.setFirstValidConnector(['MetaMask']);
    }, [context]);

    return <WalletContext.Provider value={state}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
