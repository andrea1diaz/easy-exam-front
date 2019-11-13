import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import Button from './Button';

import * as AnimationData from '../../lottie/WarningSign';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  top: 0;
  left: 0;
  background-color: #222222aa;
  width: 100%;
  height: 100%;
  position: fixed;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  align-content: center;
  animation: ${fadeAnimation} 0.2s ease-in;
  z-index: 129;
  display: ${props => (!props.active ? "none" : "flex")};
`;

const MessageCard = styled.div`
  padding: 20px;
  background: white; // #f6f7f9;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  max-height: 85%;
  min-width: 250px;
  max-width: ${props => (props.isMobile ? "95vw" : "50vw")};
  font-size: 1em;
  animation: ${fadeAnimation} 0.4s ease-in;
  z-index: 14;
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.3em;
  color: #4a4a4a;
  margin-top: 8px;
  margin-bottom: 20px;

  position: relative;
  width: 100%;
  ${props => {
    if (props.activeEllipsis) {
      return css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    }
  }}
`;
const Message = styled.div`
  font-size: 1em;
  color: #4a4a4a;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  ${props => {
    if (props.activeEllipsis) {
      return css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    }
  }}
`;

const defaultOptions = {
  loop: false,
  autoplay: true,
  AnimationData: AnimationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const ErrorSpam = props => {
  return (
    <Wrapper active={props.active}>
      <MessageCard isMobile={props.isMobile}>
        <div style={{ textAlign: "center" }}>
          <Lottie
            options={defaultOptions}
            height={200}
            width={380}
            isStopped={!props.active}
            // isPaused={!props.active}
          />
        </div>
        <Title activeEllipsis={props.activeEllipsis}>{props.title || ""}</Title>
        <Message activeEllipsis={props.activeEllipsis}>{props.message}</Message>
        <div style={{ width: "100%" }}>
          <Button
            backgroundColor={"#01E19F"}
            size={"medium"}
            onClick={props.onAccept}
            expanded
          >
            Aceptar
          </Button>
        </div>
      </MessageCard>
    </Wrapper>
  );
};

ErrorSpam.propTypes = {
  active: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onAccept: PropTypes.func.isRequired,
  activeEllipsis: PropTypes.bool
};

export default ErrorSpam;




