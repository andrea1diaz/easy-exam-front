import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import Router from 'next/router';

const textInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

const BaseBar = styled.div`
  position: fixed;
  padding: 0 18px;
  border-radius: 50px;

  height: 50px;
  background-color: #ffffff;
  display: flex;
  -webkit-box-shadow: 0 2px 60px 0px RGBA(86, 96, 128, 0.4);
  -moz-box-shadow: 0 2px 60px 0px RGBA(86, 96, 128, 0.4);
  box-shadow: 0 2px 60px 0px RGBA(86, 96, 128, 0.4);
  ${props => {
    if (props.small) {
      return css`
        width: 400px;
        bottom: 0;
        /* :0: ; */
        right: 0;
        /* left: 0; */
        margin-right: 12px;
        margin-bottom: 12px;
      `;
    } else {
      return css`
        width: 90vw;
        bottom: 0;
        margin-bottom: 12px;
      `;
    }
  }};
`;

const OptionWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  flex-flow: column;
  align-content: center;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const IconPart = styled.div`
  transition: 0.3s;
  ${props => {
    if (props.isSelected) {
      return css`
        transform: scale(1.02);
      `;
    } else {
      return css`
        transform: scale(1);
      `;
    }
  }};
`;

const NamePart = styled.div`
  transition: 0.3s;
  font-size: 0.65em;
  color: #6c63ff;
  ${props => {
    if (props.isSelected) {
      return css`
        animation: ${textInAnimation} ease-in;
        display: block;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }};
`;


class BottomBarMol extends Component {
  static defaultProps = {
    options: [],
    defaultSelected: "/",
    activeColor: "#6C63FF",
    deactivateColor: "#BABFCD"
  };

  state = {
    currentSelected: this.props.defaultSelected
  };

  onOptionClick = i => {
    this.setState(s => {
      return { ...s, currentSelected: i };
    });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BaseBar small={this.props.small}>
          {this.props.options.map((opt, i) => {
            if (opt.to) {
              Router.prefetch(opt.to);
            }
            const isSelected = this.state.currentSelected === opt.to;
            if (opt.to === undefined && opt.options) {
              // TODO: Menu
              // TODO: PLEASE, IMPROVE THIS BEHAVIOR BECAUSE THE ALGORITHM NEEDS A LOT OF CPU USAGE
            }
            return (
              <OptionWrapper
                key={i}
                onClick={() => {
                  if (opt.to) {
                    this.onOptionClick(opt.to);
                    Router.push(opt.to, opt.to);
                  } else {
                    if (opt.action) {
                      this.props.onActionCalled(opt);
                    } else if (opt.options) {
                      this.props.onOpenSubMenu(opt);
                    }
                  }
                }}
              >
                <IconPart isSelected={isSelected}>
                  {React.cloneElement(opt.icon, {
                    color: isSelected
                      ? this.props.activeColor
                      : this.props.deactivateColor
                  })}
                </IconPart>
                <NamePart isSelected={isSelected}>{opt.name}</NamePart>
              </OptionWrapper>
            );
          })}
        </BaseBar>
      </div>
    );
  }
}

BottomBarMol.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  defaultSelected: PropTypes.string,
  activeColor: PropTypes.string,
  deactivateColor: PropTypes.string,
  small: PropTypes.bool,
  onActionCalled: PropTypes.func,
  onOpenSubMenu: PropTypes.func,
};

export default BottomBarMol;
