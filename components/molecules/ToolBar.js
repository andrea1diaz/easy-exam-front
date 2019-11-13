import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Wrapper = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  font-size: 1.1em;
  font-weight: 300;
  letter-spacing: 0.5px;
  transition: 0.3s;
  ${props => {
    if (props.withShadow) {
      return css`
        -webkit-box-shadow: 0px 3px 43px -9px rgba(0, 0, 0, 0.5);
        -moz-box-shadow: 0px 3px 43px -9px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 3px 43px -9px rgba(0, 0, 0, 0.5);
      `;
    }
  }};
`;

const WrapperPadding = styled.div`
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 10px 10px;
  ${props => {
    if (props.continueLayout) {
      return css`
        padding: 10px 10px;
      `;
    }
  }};
`;

const WrapperLeft = styled.div`
  display: flex;
  align-items: center;
  /* flex: 2; */
`;

const Title = styled.div`
  cursor: pointer;
  font-weight: 400;
  font-size: 1.1em;
`;

const ActiveIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const Extra = styled.div`
  flex: 3;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ToolBar = (props) => {
  return (
    <Wrapper
      hidden={props.hidden}
      backgroundColor={props.backgroundColor}
      withShadow={props.withShadow}
    >
      <WrapperPadding continueLayout={props.continueLayout}>
        <WrapperLeft>
          {props.activeIcon ? (
            <ActiveIcon>{props.activeIcon}</ActiveIcon>
          ) : null}
          <div onClick={props.onTapTitle}>
            {props.title ? (
                <Title>{props.title}</Title>
            ) : null}
          </div>
        </WrapperLeft>
        <Extra>{props.children}</Extra>
      </WrapperPadding>
    </Wrapper>
  );
};

ToolBar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  activeIcon: PropTypes.element,
  onTapTitle: PropTypes.func,
  children: PropTypes.element,
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
  continueLayout: PropTypes.bool,
  withShadow: PropTypes.bool
};

ToolBar.defaultProps = {
  title: 'EasyExam',
};
export default ToolBar;

