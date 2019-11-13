import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Input from '../atoms/Input'
import Button from '../atoms/Button'

import { LOGIN_MODE } from '../../utils/constants'
import { validateEmail, validatePassword } from '../../validators'

const Wrapper = styled.div`
	position: absolute;
	right: 15%;
	top: 29%;
	font-weight: bold;
	@media (max-width: 1200px) {
		left: 33%;
		right: auto;
		color: white;
		font-weight: 500;
  }
`

const InputWrapper = styled.div`
	 padding: 0 0 45px 0;
`

const ButtonWrapper = styled.div`
	padding: 10px 0 0 0;
`

const Title = styled.div`
	font-size: 45px;
	padding: 0 0 50px 0;
	@media (max-width: 1200px) {
		font-size: 25px;
	}
`

const ForgotPassword = styled.div`
	color: #969696;
	text-align: right;
	padding: 7px 11px 0 0;
	@media (max-width: 1200px) {
			color: white;
		}
`

const SignUp = styled.div`
	color: #969696;
	text-align: left;
	padding: 11px 0 0 5px;
	font-size: 14px;
	
	@media (max-width: 1200px) {
			color: white;
		}
`

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: LOGIN_MODE,
			email: '',
			password: '',
			registerields: {},
		};
	}

	render() {
		const {
			isMobile, onChangeFields, onLogin,
			onRecoveryPassword, goToRegister,
		} = this.props;
		const { email, password } = this.state;

		return (
			<Wrapper isMobile={isMobile}>
				<Title>Welcome back </Title>
				<InputWrapper>
					<Input
						name="email"
						type="email"
						value={email}
						placeholder="email"
						validator={v => {
                    const r = validateEmail(v);
                    this.setState(s => {
                      return { ...s, continueAvailable: r === undefined };
                    });
                    return r !== undefined;
                  }}
						onChange={async v => {
										await this.setState(s => {
											return { ...s, email: v };
										});
										onChangeFields({
											email: { email },
											password: { password },
										});
						}}
					/>
				</InputWrapper>
				<InputWrapper>
					<Input
						name="pasword"
						type="password"
						value={password}
						placeholder="password"
						validator={v => {
                    const r = validatePassword(v);
                    this.setState(s => {
                      return { ...s, continueAvailable: r === undefined };
                    });
                    return r !== undefined;
                  }}
						onChange={async v => {
										await this.setState(s => {
											return { ...s, password: v };
										});
										onChangeFields({
											email: { email },
											password: { password },
										});
						}}
						onEnterPressed={final => {
							if (onLogin) {
								onLogin(final);
							}
						}}
					/>
					<ForgotPassword onClick={onRecoveryPassword}>
							Forgot your password?
          </ForgotPassword>
        </InputWrapper>
        <ButtonWrapper>
          <Button
            onClick={onLogin}
            color='#FD7576'
            fontColor='#FFFFFF'
          >
						LOGIN
          </Button>
          <SignUp onClick={goToRegister}>
							Don’t have an account?
            <span css={css`color: #FD7576`}> Sign Up </span>
          </SignUp>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

LoginCard.defaultProps = {
  onChangeFields: () => {},
  isMobile: false
}

LoginCard.propTypes = {
	isMobile: PropTypes.bool,
	onChangeFields: PropTypes.func,
	onRecoveryPassword: PropTypes.func,
	onLogin: PropTypes.func,
	goToRegister: PropTypes.func,
};

export default LoginCard
