import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'react-feather';

import Row, { RowBetween } from 'components/Row';
import useDarkMode from 'hooks/useIsDarkMode';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
    top: 0;
    position: absolute;
    z-index: 2;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const HeaderElement = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.a`
    display: flex;
    text-decoration: none;
    align-items: center;
    pointer-events: auto;
    :hover {
        cursor: pointer;
    }
`;

const TitleText = styled(Row)`
    width: fit-content;
    color: ${({ theme }) => theme.primary1};
    font-weight: bold;
    letter-spacing: 3px;
    font-size: 20px;
    white-space: nowrap;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const Header: React.FC = () => {
    const { darkMode, handleToggle } = useDarkMode();

    const handleThemeChange = (e: MouseEvent) => {
        e.preventDefault();
        handleToggle();
    };
    return (
        <Container>
            <HeaderContainer>
                <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
                    <HeaderElement>
                        <Title href=".">
                            <TitleText>🔀 TagSwap</TitleText>
                        </Title>
                    </HeaderElement>
                    <HeaderElement>
                        <Title>
                            {darkMode ? (
                                <Sun onClick={handleThemeChange} color={'orange'} />
                            ) : (
                                <Moon onClick={handleThemeChange} color="red" />
                            )}
                        </Title>
                    </HeaderElement>
                </RowBetween>
            </HeaderContainer>
        </Container>
    );
};
export default Header;
