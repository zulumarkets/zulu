import styled, { css, keyframes } from 'styled-components';
import { MAIN_COLORS } from 'constants/ui';
import { FlexDivRow } from 'styles/common';

export const WrapperAnimation = keyframes`
    0% {
        visibility: none;
        right: -255px;
        height: 50%;
    }
    50% {
        visibility: visible;
        right: 0px;
        height: 75%;
    }
    100% {
        visibility: visible;
        right: 0px;
        -webkit-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        -moz-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        height: 100%;
    }
`;

export const WrapperAnimationClose = keyframes`
    0% {
        visibility: visible;
        right: 0px;
        -webkit-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        -moz-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};
        height: 100%;
    }
    50% {
        visibility: visible;
        right: 0px;
        height: 75%;
    }
    100% {
        visibility: none;
        right: -255px;
        height: 50%;
    }
`;

const animationOpen = css`
    animation: ${WrapperAnimation} 0.5s linear;
`;

const animationClose = css`
    animation: ${WrapperAnimationClose} 0.5s linear;
`;

export const Wrapper = styled.div<{ show?: boolean | null }>`
    display: flex;
    flex-direction: column;
    width: 255px;
    height: 100%;
    position: fixed;
    top: 0;
    ${(_props) => (_props?.show == true ? 'right: 0;' : '')}
    ${(_props) => (_props?.show == false || _props?.show == null ? 'right: -255px;' : '')}
    ${(_props) => _props?.show === true && animationOpen};
    ${({ show }) => show === false && animationClose};
    background-color: ${(props) => props.theme.nav.background};
    justify-content: space-between;
    z-index: 3;
    ${(_props) => (_props?.show == true ? `-webkit-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};` : '')};
    ${(_props) => (_props?.show == true ? `-moz-box-shadow: ${MAIN_COLORS.SHADOWS.NAV_BAR};` : '')};
    ${(_props) => (_props?.show == true ? `${MAIN_COLORS.SHADOWS.NAV_BAR};` : '')};
    padding: 20px 10px;
`;

export const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    cursor: pointer;
    :hover {
        i {
            color: ${(props) => props.theme.nav.text.primary}!important;
        }
        color: ${(props) => props.theme.nav.text.primary} !important;
    }
`;

export const NavLabel = styled.span<{ active?: boolean }>`
    font-size: 16px;
    font-weight: ${(_props) => (_props?.active ? '600' : '400')};
    line-height: 120%;
    text-transform: uppercase;
`;

export const NavIcon = styled.i<{ active?: boolean }>`
    font-size: 25px;
    margin-right: 10px;
    color: ${(_props) => (_props?.active ? `${_props.theme.nav.text.primary}` : `${_props.theme.nav.text.secondary}`)};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Button = styled.button`
    width: 49%;
    border: 1.5px solid #5f6180;
    padding: 6px 0px;
    color: ${(props) => props.theme.nav.text.secondary};
    background: transparent;
    cursor: pointer;
`;

export const FooterContainer = styled(FlexDivRow)`
    align-items: center;
    justify-content: center;
`;

export const Network = styled(FlexDivRow)`
    align-items: center;
`;

export const NetworkIcon = styled.i`
    font-size: 20px;
    color: ${(props) => props.theme.nav.text.primary};
    margin-right: 5px;
`;

export const NetworkName = styled.span`
    font-size: 12px;
    color: ${(props) => props.theme.nav.text.secondary};
    font-weight: 600;
`;

export const HeaderContainer = styled(FlexDivRow)`
    justify-content: center;
`;

export const CloseIcon = styled.i.attrs({ className: 'icon icon--close' })`
    color: white;
    font-size: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;

export const WalletAddress = styled.span`
    font-weight: 600;
    font-size: 10px;
    line-height: 120%;
`;

export const WalletIcon = styled.i.attrs({ className: 'icon icon--wallet' })`
    color: white;
    font-size: 15px;
    margin-right: 6px;
`;

export const WalletAddressContainer = styled(FlexDivRow)`
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        i {
            color: ${(props) => props.theme.nav.text.primary} !important;
        }
        color: ${(props) => props.theme.nav.text.primary} !important;
    }
`;
