import React from 'react';
import styled from 'styled-components';

import EthereumLogo from 'assets/images/ethereum-logo.png';
import TagSwapLogo from 'assets/images/bitcoin.png';

import Logo from 'components/Logo';

const StyledEthereumLogo = styled.img<{ size: string }>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
    border-radius: 24px;
`;

export default function CurrencyLogo({
    currency,
    size = '24px',
    style,
}: {
    currency?: string;
    size?: string;
    style?: React.CSSProperties;
}) {
    if (currency === 'ETH') {
        return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />;
    }
    return <StyledEthereumLogo src={TagSwapLogo} size={size} style={style} />;
}
