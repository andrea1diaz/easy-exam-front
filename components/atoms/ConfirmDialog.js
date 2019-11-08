import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  background-color: #222222aa;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  //display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  animation: ${fadeAnimation} 0.2s ease-in;
  z-index: 122;
  display: ${props => (!props.active ? "none" : "flex")};
`;

const LoaderCard = styled.div`
  padding: 20px 20px 0 20px;
  background: #f6f7f9;
  display: flex;
  flex-flow: column;
  font-family: "SFProDisplay", sans-serif;
  font-size: 1em;
  animation: ${fadeAnimation} 0.4s ease-in;
  border-radius: 10px;
  position: absolute;
`;

const Title = styled.div`
  font-family: "SFProDisplay", sans-serif;
  font-size: 1.6em;
  color: #4a4a4a;
`;

const Description = styled.div`
  font-family: "SFProDisplay", sans-serif;
  font-size: 0.92em;
  color: #646464;
  padding: 8px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 15px;
`;

const Option = styled.div`
  flex: 1;
  background-color: ${props => props.bgColor + "44"};
  border-bottom-right-radius: ${props => (props.right ? "10px" : "")};
  border-bottom-left-radius: ${props => (props.left ? "10px" : "")};
  padding: 10px 8px;
  text-align: center;
  font-family: "SFProDisplay", sans-serif;
  font-size: 0.9em;
  transition: 0.4s;
  text-transform: uppercase;
  color: #4a4a4a;
  :hover {
    cursor: pointer;
    background-color: ${props => props.bgColor + "FF"};
    color: #222222;
  }
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ConfirmDialog = props => {
  return (
    <Wrapper active={props.active}>
      <Background onClick={props.onCancel} />
      <LoaderCard>
        <Title> {props.title} </Title>
        <Description>{props.description}</Description>
        {props.children}
        <OptionsWrapper>
          <Option bgColor={"#E6ECF3"} left onClick={props.onCancel}>
            {props.leftMessage}
          </Option>
          <Option bgColor={"#E6ECF3"} right onClick={props.onAccept}>
            {props.rightMessage}
          </Option>
        </OptionsWrapper>
      </LoaderCard>
    </Wrapper>
  );
};

ConfirmDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  leftMessage: PropTypes.string,
  rightMessage: PropTypes.string,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  leftMessage: 'Cancelar',
  rightMessage: 'Salir',
};

export default ConfirmDialog;
