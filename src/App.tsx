import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Web3Provider from 'web3-react';
import Web3 from 'web3';

import { MetaMaskConnector } from 'connectors';
import ThemeProvider, { ThemedGlobalStyle, FixedGlobalStyle } from 'theme';
import DarkModeProvider from 'contexts/DarkMode';
import WalletProvider from 'contexts/WalletProvider';
import Home from 'views/Home';

import Header from 'components/Header';

const HeaderWrapper = styled.div`
    ${({ theme }) => theme.flexRowNoWrap}
    width: 100%;
    justify-content: space-between;
`;
const AppWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    overflow-x: hidden;
`;
const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 160px;
    align-items: center;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};
    z-index: 1;
`;

const Marginer = styled.div`
    margin-top: 5rem;
`;

const Providers: React.FC = ({ children }) => {
    return (
        <DarkModeProvider>
            <FixedGlobalStyle />
            <ThemeProvider>
                <ThemedGlobalStyle />
                <Web3Provider connectors={MetaMaskConnector} web3Api={Web3} libraryName={'web3.js'}>
                    <WalletProvider>{children}</WalletProvider>
                </Web3Provider>
            </ThemeProvider>
            ;
        </DarkModeProvider>
    );
};

function App() {
    return (
        <Providers>
            <Router>
                <AppWrapper>
                    <HeaderWrapper>
                        <Header />
                    </HeaderWrapper>
                    <BodyWrapper>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                        </Switch>
                    </BodyWrapper>
                </AppWrapper>
            </Router>
        </Providers>
    );
}

export default App;
