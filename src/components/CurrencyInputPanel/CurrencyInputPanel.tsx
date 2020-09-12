import React, { useState, useContext, useCallback } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { darken } from 'polished';
import BigNumber from 'bignumber.js';
// import { useCurrencyBalance } from '../../state/wallet/hooks';
import CurrencyLogo from '../CurrencyLogo';
import { RowBetween } from '../Row';
import { TYPE } from 'theme';
import { Input as NumericalInput } from '../NumericalInput';
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg';

const InputRow = styled.div<{ selected: boolean }>`
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
    padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`;

const CurrencySelect = styled.button<{}>`
    align-items: center;
    height: 2.2rem;
    font-size: 20px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.primary1};
    color: ${({ theme }) => theme.white};
    border-radius: 12px;
    box-shadow: ${'0px 6px 10px rgba(0, 0, 0, 0.075)'};
    outline: none;
    cursor: pointer;
    user-select: none;
    border: none;
    padding: 0 0.5rem;
    :focus,
    :hover {
        background-color: ${({ theme }) => darken(0.05, theme.primary1)};
    }
`;

const LabelRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
    color: ${({ theme }) => theme.text1};
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.75rem 1rem 0 1rem;
    span:hover {
        cursor: pointer;
        color: ${({ theme }) => darken(0.2, theme.text2)};
    }
`;

const Aligner = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
    margin: 0 0.25rem 0 0.5rem;
    height: 35%;
    path {
        stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
        stroke-width: 1.5px;
    }
`;

const InputPanel = styled.div<{ hideInput?: boolean }>`
    ${({ theme }) => theme.flexColumnNoWrap}
    position: relative;
    border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
    background-color: ${({ theme }) => theme.bg2};
    z-index: 1;
`;

const Container = styled.div<{ hideInput: boolean }>`
    border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
    border: 1px solid ${({ theme }) => theme.bg2};
    background-color: ${({ theme }) => theme.bg1};
`;

const StyledTokenName = styled.span<{ active?: boolean }>`
    ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
    font-size:  ${({ active }) => (active ? '20px' : '16px')};
`;

const StyledBalanceMax = styled.button`
    height: 28px;
    background-color: ${({ theme }) => theme.primary5};
    border: 1px solid ${({ theme }) => theme.primary5};
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.primaryText1};
    :hover {
        border: 1px solid ${({ theme }) => theme.primary1};
    }
    :focus {
        border: 1px solid ${({ theme }) => theme.primary1};
        outline: none;
    }
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`;

interface CurrencyInputPanelProps {
    value: string;
    onUserInput: (value: string) => void;
    label?: string;
    currency?: string;
    balance?: string | BigNumber;
    disabled?: boolean;
    id: string;
}

export default function CurrencyInputPanel({
    value,
    onUserInput,
    label = 'Input',
    disabled,
    balance,
    currency,
    id,
}: CurrencyInputPanelProps) {
    // const { t } = useTranslation();

    // const [modalOpen, setModalOpen] = useState(false);
    // const { account } = useActiveWeb3React();
    // const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
    const theme = useContext(ThemeContext);

    // const handleDismissSearch = useCallback(() => {
    //     setModalOpen(false);
    // }, [setModalOpen]);

    return (
        <InputPanel id={id}>
            <Container hideInput={false}>
                <LabelRow>
                    <RowBetween>
                        <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                            {label}
                        </TYPE.body>

                        {balance && (
                            <TYPE.body
                                onClick={() => {}}
                                color={theme.text2}
                                fontWeight={500}
                                fontSize={14}
                                style={{ display: 'inline', cursor: 'pointer' }}
                            >
                                Balance: {balance}
                            </TYPE.body>
                        )}
                    </RowBetween>
                </LabelRow>
                <InputRow style={{}} selected={false}>
                    <>
                        <NumericalInput
                            disabled={disabled}
                            className="token-amount-input"
                            value={value}
                            onUserInput={(val) => {
                                onUserInput(val);
                            }}
                        />
                    </>
                    <CurrencySelect
                        className="open-currency-select-button"
                        onClick={() => {
                            alert('ok');
                        }}
                    >
                        <Aligner>
                            <CurrencyLogo currency={currency} size={'24px'} />
                            <StyledTokenName className="token-symbol-container" active={true}>
                                {currency}
                            </StyledTokenName>
                            {/* {!disableCurrencySelect && <StyledDropDown selected={!!currency} />} */}
                        </Aligner>
                    </CurrencySelect>
                </InputRow>
            </Container>
        </InputPanel>
    );
}
