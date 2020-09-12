import React, { useContext, useState, useEffect } from 'react';
import { ArrowDown } from 'react-feather';
import { ThemeContext } from 'styled-components';
import { ButtonError, ButtonLight, ButtonPrimary, ButtonConfirmed } from 'components/Button';
import { AutoColumn } from 'components/Column';
import ConfirmSwapModal from 'components/Modal/ConfirmSwapModal';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import BigNumber from 'bignumber.js';
import { AutoRow } from 'components/Row';
import { ArrowWrapper, BottomGrouping, Wrapper } from 'components/Modal/components/styleds';
import { LinkStyledButton, TYPE } from 'theme';
import AppBody from './components/AppBody';
import Loader from 'components/Loader';
import useWalletInfo from 'hooks/useWalletInfo';

interface ISwapCalculator {
    from: string | null;
    to: string | null;
    tagBalance: string;
    ethBalance: string;
    isEthBalanceLoading: boolean;
    isTagBalanceLoading: boolean;
    fromEthToTag: boolean;
    isSuccessModalVisible: boolean;
}

export default function Swap() {
    const { walletInfo, handleInitializeWallet } = useWalletInfo();
    // const walletInfo = useContext(WalletContext);
    console.log({ walletInfo });
    const [state, setState] = useState<ISwapCalculator>({
        from: '',
        to: '',
        tagBalance: '',
        ethBalance: '',
        isEthBalanceLoading: false,
        isTagBalanceLoading: false,
        fromEthToTag: false,
        isSuccessModalVisible: false,
    });

    const theme = useContext(ThemeContext);
    const handleInputChange = (name: string, val: string) => {
        setState((state) => ({
            ...state,
            [name]: val,
        }));
    };
    const handleSwap = () => {
        setState((state) => ({
            ...state,
            fromEthToTag: !state.fromEthToTag,
            from: '',
            to: '',
        }));
    };
    const handleGetWalletBalances = async () => {
        setState((state) => ({
            ...state,
            isEthBalanceLoading: true,
        }));
        const _ethBalance = await walletInfo.context.library.eth.getBalance(walletInfo.context.account);
        const ethBalance: BigNumber = new BigNumber(_ethBalance);

        setState((state) => ({
            ...state,
            isEthBalanceLoading: false,
            ethBalance: ethBalance.dividedBy(new BigNumber(10).pow(18)).toFixed(4),
        }));
    };
    useEffect(() => {
        if (walletInfo.isConnected) {
            handleGetWalletBalances();
        }
    }, [walletInfo.isConnected]);
    return (
        <>
            <AppBody>
                <Wrapper id="swap-page">
                    <ConfirmSwapModal
                        isOpen={false}
                        trade={undefined}
                        originalTrade={undefined}
                        onAcceptChanges={() => {}}
                        attemptingTxn={false}
                        txHash={undefined}
                        recipient={'bla'}
                        allowedSlippage={1}
                        onConfirm={() => false}
                        swapErrorMessage={undefined}
                        onDismiss={() => false}
                    />
                    <AutoColumn gap={'md'}>
                        <CurrencyInputPanel
                            label={'From '}
                            value={state.from}
                            balance={state.ethBalance}
                            disabled={false}
                            currency={state.fromEthToTag ? 'ETH' : 'TAGME'}
                            onUserInput={(val) => {
                                handleInputChange('from', val);
                            }}
                            id="swap-currency-input"
                        />
                        <>
                            <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                                <ArrowWrapper clickable={true}>
                                    <ArrowDown size="16" color={theme.primary1} onClick={handleSwap} />
                                </ArrowWrapper>
                            </AutoRow>
                        </>
                        <CurrencyInputPanel
                            balance={state.ethBalance}
                            label={'To (estimated)'}
                            value={state.to}
                            disabled={true}
                            currency={state.fromEthToTag ? 'TAGME' : 'ETH'}
                            onUserInput={(val) => {
                                handleInputChange('to', val);
                            }}
                            id="swap-currency-input"
                        />
                    </AutoColumn>
                    <BottomGrouping>
                        {!walletInfo.isWeb3Available ? (
                            <ButtonError
                                onClick={() => {
                                    alert(
                                        'Your Browser is not compatible to use Web3 yet. Please install a compatible wallet.',
                                    );
                                }}
                            >
                                Web3 Not Supported
                            </ButtonError>
                        ) : (
                            <>
                                {!walletInfo.isConnected ? (
                                    <ButtonLight
                                        onClick={() => {
                                            handleInitializeWallet();
                                            // alert('Connecting wallet');
                                        }}
                                    >
                                        Connect Wallet
                                    </ButtonLight>
                                ) : (
                                    <>
                                        {parseFloat(state.from) > 0 && parseFloat(state.to) > 0 ? (
                                            <ButtonPrimary
                                                onClick={() => {
                                                    // alert('Connecting wallet');
                                                }}
                                            >
                                                SWAP
                                            </ButtonPrimary>
                                        ) : (
                                            <ButtonLight
                                                onClick={() => {
                                                    alert('Please enter valid values.');
                                                    // alert('Connecting wallet');
                                                }}
                                            >
                                                SWAP
                                            </ButtonLight>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </BottomGrouping>
                </Wrapper>
            </AppBody>
        </>
    );
}
