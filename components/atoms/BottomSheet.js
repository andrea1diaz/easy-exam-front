import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import PropTypes from 'prop-types';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  z-index: ${props => (props.active ? "12" : "-1")};
  opacity: ${props => (props.active ? "1" : "0")};
  position: fixed;
  display: block;
  overflow: hidden;
  background-color: #222222aa;
  width: 100vw;
  height: 100vh;
  animation: ${fadeAnimation} 0.2s ease-in;
  top: 0;
  left: 0;
`;

const WrapperBackground = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;

const WrapLoaderCard = styled.div`
  bottom: ${props => (props.active ? "0" : "-200px")};
  transition: 0.5s;
  width: ${props => (props.isMobile ? "100%" : "400px")};
  background-color: #ffffff;
  position: fixed;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  animation: ${fadeAnimation} 0.2s ease-in;
  display: flex;
  margin-top: ${props => (props.isMobile ? "-50px" : "0")};
  ${props => {
    if (props.isMobile) {
      return css`
        left: 0;
      `;
    } else {
      return css`
        right: 0;
        margin-right: 18px;
      `;
    }
  }};
`;

const BottomSheet = (props) => {
  return (
    <Wrapper active={props.active}>
      <WrapperBackground onClick={props.onClose} />
      <WrapLoaderCard active={props.active} isMobile={props.isMobile}>
        {props.children}
      </WrapLoaderCard>
    </Wrapper>
  );
};

BottomSheet.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default BottomSheet;
