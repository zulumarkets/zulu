import React from 'react';
import styled from 'styled-components';
import ROUTES from 'constants/routes';
import { ReactComponent as LogoIcon } from 'assets/images/overtime-logo.svg';
import SPAAnchor from 'components/SPAAnchor';
import { buildHref } from 'utils/routes';

const Logo: React.FC = () => (
    <Container>
        <SPAAnchor href={buildHref(ROUTES.Markets.Home)}>
            <StyledLogo />
        </SPAAnchor>
    </Container>
);

const Container = styled.div`
    @media (max-width: 767px) {
        margin-top: 25px;
        margin-bottom: 10px;
    }
`;

const StyledLogo = styled(LogoIcon)`
    fill: ${(props) => props.theme.textColor.primary};
    cursor: pointer;
    height: 35px;
`;

export default Logo;
