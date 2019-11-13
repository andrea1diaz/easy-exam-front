import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

import { REGISTER_MODE } from '../../utils/constants';
import {
	validateEmail,
	validatePassword,
	validateFirstName,
} from '../../validators';

const Wrapper = styled.div`
	position absolute;
	left: 15%;
	top 21%;
	font-weight: bold;
	width: 28%;

	@media (max-width: 1200px) {
		left: 33%;
		right: auto;
		color white;
		font-weight: 500;
		width: 40%
	}
`;

const InputWrapper = styled.div`
	padding: 0 0 45px 0;
`;

const ButtonWrapper = styled.div`
	padding: 10px 0 0 0;
`;

const Title = styled.div`
	font-size: 45px;
	padding: 0 0 50px 0;

	@media (max-width: 1200px) {
		font-size: 25px;
	}
`;

const LogIn = styled.div`
	color: #969696;
	text-align: left;
	padding: 11px 0 0 5px;
	font-size: 14px;
	
	@media (max-width: 1200px) {
			color: white;
		}
`;

class RegisterCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: REGISTER_MODE,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			inputsValidated: [false, false, false, false, false],
			continueAvailable: false,
			registerFields: {},
		};
	}

	handleRegister = () => {
		const { inputsValidated } = this.state;
		const { onRegister } = this.props;

		const auxContinueAvailable = inputsValidated.reduce(
			(prev, cur) => prev && cur,
		);
		console.log('entraa', auxContinueAvailable);
		if (auxContinueAvailable) {
			onRegister();
		}
	};

	render() {
		const {
			onChangeFields,
			} = this.props;

		const {
			inputsValidated,
			firstName,
			lastName,
			email,
			password,
			} = this.state;

		return (
			<Wrapper>
				<Title>Create Account </Title>
				<InputWrapper>
					<Input
						name="firstName"
						type="text"
						value={this.state.firstName}
						placeholder="First Name"
						validator={(v) => {
                    const r = validateFirstName(v);
                    const auxInputsValidated = inputsValidated;
                    auxInputsValidated[1] = r === undefined;
                    this.setState((s) => ({ ...s, inputsValidated: auxInputsValidated }));
                    return r !== undefined;
                  }}
						onChange={async (v) => {
                    await this.setState((s) => ({ ...s, firstName: v }));
                    onChangeFields({
                      firstName,
					  lastName,
                      email,
                      password,
                    });
                  }}
					/>
				</InputWrapper>
				<InputWrapper>
					<Input
						name="lastName"
						type="text"
						value={this.state.lastName}
						placeholder="Last Name"
						validator={(v) => {
                    const r = validateFirstName(v);
                    const auxInputsValidated = inputsValidated;
                    auxInputsValidated[1] = r === undefined;
                    this.setState((s) => ({ ...s, inputsValidated: auxInputsValidated }));
                    return r !== undefined;
                  }}
						onChange={async (v) => {
                    await this.setState((s) => ({ ...s, lastName: v }));
                    onChangeFields({
                      firstName,
					  lastName,
                      email,
                      password,
                    });
                  }}
					/>
				</InputWrapper>
				<InputWrapper>
					<Input
						name="email"
						type="email"
						value={this.state.email}
						placeholder="email"
						onChange={async (v) => {
							await this.setState((s) => ({ ...s, email: v }));
							this.props.onChangeFields({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								email: this.state.email,
								password: this.state.password,
							});
						}}
						validator={(v) => {
							const r = validateEmail(v);
							const auxInputsValidated = this.state.inputsValidated;
							auxInputsValidated[3] = r === undefined;
							this.setState((s) => ({ ...s, inputsValidated: auxInputsValidated }));
							return r !== undefined;
						}}
					/>
				</InputWrapper>
				<InputWrapper>
					<Input
						type="password"
						name="password"
						placeholder="password"
						value={this.state.password}
						onChange={(v) => {
							this.setState((s) => ({ ...s, password: v }));
							this.props.onChangeFields({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								email: this.state.email,
								password: this.state.password,
							});
						}}
						validator={(v) => {
							const r = validatePassword(v);
							const auxInputsValidated = this.state.inputsValidated;
							auxInputsValidated[4] = r === undefined;
							this.setState((s) => ({ ...s, inputsValidated: auxInputsValidated }));
							return r !== undefined;
						}}
						onEnterPressed={(final) => {
							if (this.props.onRegister) {
								this.props.onRegister(final);
							}
						}}
					/>
				</InputWrapper>
				<ButtonWrapper>
					<Button
						onClick={this.props.onRegister}
						color="#FEC85D"
						fontColor="#FFFFFF"
						style={{ padding: '18px 36%' }}
					>
						REGISTER
					</Button>
					<LogIn onClick={this.props.goToLogin}>
						Already have an account?
						<span style={{ color: '#FEC85D' }}> Log In </span>
					</LogIn>
				</ButtonWrapper>
			</Wrapper>
		);
	}
}

RegisterCard.defaultProps = {
	onChangeFields: () => {},
};

RegisterCard.propTypes = {
	isMobile: PropTypes.bool,
	onChangeFields: PropTypes.func,
	onRegister: PropTypes.func,
	goToLogin: PropTypes.func,
};

export default RegisterCard;
