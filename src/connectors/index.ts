import { Connectors } from 'web3-react';

const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 2, 3] });

const MetaMaskConnector = { MetaMask };

export { MetaMaskConnector };
