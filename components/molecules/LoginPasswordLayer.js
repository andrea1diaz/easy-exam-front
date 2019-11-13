import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { validatePassword } from '../../validators';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const TextLostPassword = styled.div`
  font-size: 0.8em;
  color: #41a0ff;
  text-align: right;
  margin-bottom: 20px;
  cursor: pointer;
`;

class LoginPasswordLayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			continueAvailable: false,
		};
	}

  render() {
    return (
      <div>
        <div>
          <Input
            value={this.props.password}
            onChange={this.props.onPasswordChange}
            name="password"
            type="password"
            validator={v => {
              const r = validatePassword(v);
              this.setState(s => {
                return { ...s, continueAvailable: r === undefined };
              });
              return r !== undefined;
            }}
            errorMessage="Ingresa tu contraseña"
            placeholder="•••••••••••"
            onEnterPressed={final => {
              if (this.props.onContinue) {
                this.props.onContinue(final);
              }
            }}
          />
          <TextLostPassword onClick={this.props.lostPassword}>
            ¿Olvidaste tu contraseña?
          </TextLostPassword>
          <div style={{ marginTop: '40px' }}>
            <Button
              expanded
              onClick={this.props.onContinue}
              disabled={!this.state.continueAvailable}
            >
              INGRESAR
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

LoginPasswordLayer.propTypes = {
  password: PropTypes.string,
  onPasswordChange: PropTypes.func,
  onContinue: PropTypes.func,
  lostPassword: PropTypes.func,
};

export default LoginPasswordLayer;
