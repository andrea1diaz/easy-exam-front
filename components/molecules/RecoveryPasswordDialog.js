import React from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";

import Input from "../atoms/Input";
import { validateEmail } from "../../validators/index";

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
  width: 100vw;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: center;
  align-content: center;
  animation: ${fadeAnimation} 0.2s ease-in;
  z-index: 11;
  display: ${props => (!props.active ? "none" : "flex")};
`;

const WrapperBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const RecoveryCard = styled.div`
  padding: 20px 20px 0 20px;
  background: #f6f7f9;
  display: flex;
  flex-flow: column;
  font-size: 1em;
  animation: ${fadeAnimation} 0.4s ease-in;
  z-index: 12;
  border-radius: 10px;
  max-width: 412px;
  ${props => {
    if (props.isMobile) {
      return css`
        max-width: 90vw;
      `;
    } else {
      return css`
        max-width: 70vw;
      `;
    }
  }}
`;

const Title = styled.div`
  font-size: 1.3em;
  color: #4a4a4a;
  text-align: center;
`;

const Description = styled.div`
  font-size: 0.95em;
  color: #646464;
  padding: 8px;
  margin: 15px 0;
`;

const OptionsWrapper = styled.div`
  display: flex;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 25px;
`;

const Option = styled.div`
  flex: 1;
  background-color: ${props => props.bgColor + "44"};
  border-bottom-right-radius: ${props => (props.right ? "10px" : "")};
  border-bottom-left-radius: ${props => (props.left ? "10px" : "")};
  padding: 15px 8px;
  text-align: center;
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

class RecoveryPasswordDialog extends React.Component {
  state = {
    email: "",
    inputsErrors: [false],
    inputsAreValid: [false]
  };

  handleChangeEmail = e => {
    let value = e;
    this.setState({
      email: value
    });
  };

  render() {
    return (
      <Wrapper active={this.props.active}>
        <WrapperBackground onClick={this.props.onCancel} />
        <RecoveryCard isMobile={this.props.isMobile}>
          <Title> Recupera tu contraseña </Title>
          <Description>
            Ingresa tu email y te enviaremos un enlace con el que podrás
            recuperar tu contraseña.
          </Description>
          <div>
            <Input
              value={this.state.email}
              onChange={this.handleChangeEmail}
              errorMessage={
                this.state.inputsErrors[0] ? "Ingresa un email válido" : ""
              }
              type={"email"}
              validator={v => {
                let resp = validateEmail(v);
                let newInputsValid = this.state.inputsAreValid;
                let newInputsErrors = this.state.inputsErrors;
                newInputsValid[0] = resp === undefined;
                newInputsErrors[0] = resp !== undefined;
                this.setState({
                  inputsAreValid: newInputsValid,
                  inputsErrors: newInputsErrors
                });
              }}
              onEnterPressed={() => this.props.onAccept(this.state.email)}
            />
          </div>
          <OptionsWrapper>
            <Option bgColor={"#E6ECF3"} left onClick={this.props.onCancel}>
              {this.props.leftMessage || "Cancelar"}
            </Option>
            <Option
              bgColor={"#E6ECF3"}
              right
              onClick={() => this.props.onAccept(this.state.email)}
            >
              {this.props.rightMessage || "Continuar"}
            </Option>
          </OptionsWrapper>
        </RecoveryCard>
      </Wrapper>
    );
  }
}

RecoveryPasswordDialog.propTypes = {
  active: PropTypes.bool,
  isMobile: PropTypes.bool,
  onAccept: PropTypes.func,
  leftMessage: PropTypes.string,
  rightMessage: PropTypes.string,
  onCancel: PropTypes.func
};

export default RecoveryPasswordDialog;
