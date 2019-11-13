import React from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
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
  top: 0;
  left: 0;
  background-color: #222222aa;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
  align-content: center;
  animation: ${fadeAnimation} 0.2s ease-in;
  z-index: 13;
  display: ${props => (!props.active ? 'none' : 'flex')};
`;

const MessageCard = styled.div`
  background: white;
  display: flex;
  flex-flow: column;
  max-width: ${props => (!props.isMobile ? '50vw' : '95vw')};
  font-size: 16px;
  animation: ${fadeAnimation} 0.4s ease-in;
  z-index: 14;
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.2em;
  color: #4a4a4a;
  padding: 15px 10px;
  margin-bottom: 15px;
  position: relative;
  text-align: center;
  width: 100%;
`;

const Message = styled.div`
  font-size: 1em;
  color: #4a4a4a;
  padding: 15px 20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
`;

const OptionsContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
`;

const FirstOption = styled.div`
  display: flex;
  width: 50%;
  padding: 15px 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #dfdfdf;
  border-right: 1px solid #b9b9b9;
  ${props => {
    if (props.color) {
      return css`
        background-color: #4968e4;
        color: white;
      `;
    }
  }}
`;

const SecondOption = styled.div`
  display: flex;
  width: 50%;
  padding: 15px 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #dfdfdf;
  ${props => {
    if (props.color) {
      return css`
        background-color: #4968e4;
        color: white;
      `;
    }
  }}
`;

const MessageWithTwoOptions = props => {
  console.log('isMobile', props.isMobile);
  return (
    <Wrapper active={props.active} style={props.style}>
      <MessageCard isMobile={props.isMobile}>
        <Title>{props.title}</Title>
        {props.message && <Message>{props.message}</Message>}
        <OptionsContainer>
          <FirstOption
            color={props.firstOptionColor}
            onClick={props.firstOptionClick}
          >
            {props.firstOptionText}
          </FirstOption>
          <SecondOption
            color={props.secondOptionColor}
            onClick={props.secondOptionClick}
          >
            {props.secondOptionText}
          </SecondOption>
        </OptionsContainer>
      </MessageCard>
    </Wrapper>
  );
};

MessageWithTwoOptions.propTypes = {
  style: PropTypes.object,
  active: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
  ]),
  firstOptionText: PropTypes.string,
  secondOptionText: PropTypes.string,
  firstOptionClick: PropTypes.func,
  secondOptionClick: PropTypes.func,
  firstOptionColor: PropTypes.bool,
  secondOptionColor: PropTypes.bool,
};

export default MessageWithTwoOptions;
