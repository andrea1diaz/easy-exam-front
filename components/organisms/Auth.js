import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Subscribe } from 'unstated';

import WaveOne from '../atoms/WaveOne';
import WaveTwo from '../atoms/WaveTwo';
import LoginCard from '../molecules/LoginCard';
import RegisterCard from '../molecules/RegisterCard';
import AuthContainer from '../../containers/authContainer';
import RecoveryPasswordDialog from '../molecules/RecoveryPasswordDialog';
import SuccessfulSpam from '../atoms/SuccessfulSpam';
import ErrorSpam from '../atoms/ErrorSpam';
import getErrorFromError from '../../utils/FabricError';
import Loading from '../atoms/Loading';

import {
	loginRequest,
	fastRegister,
} from '../../endpoints';

const Wrapper = styled.div`
	display: ${(props) => (props.opened ? 'block' : 'none')};
	@media (max-width: 1200px) {
			color: white;
	}
`;

const RECOVERY_ACCOUNT = 'recovery_account';
const MESSAGE_SUCCESSFULSPAM = 'message_successfulspam';

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			emailR: '',
			passwordR: '',
			loading: false,
			haveError: false,
			error: {},
			activeLoginView: true,
			recoveryPasswordDialogActive: false,
			currentStepExists: '',
		};
	}

	toogleLoading = () => {
    this.setState((s) => ({
        loading: !s.loading,
      }));
  };

	logIn = async () => {
		const data = { email: this.state.email.email, password: this.state.password.password };
		console.log('On login function');
		console.log(data);

		try {
			const resp = await loginRequest(data);
			console.log(resp.data.data);

			await this.authState.logIn(
				resp.data.data.user,
				resp.data.data.token.value,
			);

			this.props.onLoginSuccess({
				userData: resp.data.data.user,
				token: resp.data.data.token.value,
			});
		} catch (e) {
			const err = getErrorFromError(e);
			this.setState((s) => ({
					...s,
					haveError: false,
					error: err,
				}));

			if (this.props.onLoginFailed) {
				this.props.onLoginFailed(e);
			}
		} finally {}
	};

	register = async () => {
		const data = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
	  email: this.state.emailR.trim().toLowerCase(),
      password: this.state.passwordR,
      role: ['ROLE_STUDENT'],
		};
    console.log('Enter register');
    console.log(data);

		try {
			const r = await fastRegister(data);
			console.log(r.data.data);

			await this.authState.logIn(r.data.data.user, r.data.data.token.value);

			this.props.onLoginSuccess({
				userData: r.data.data.user,
				token: r.data.data.token.value,
			});
		} catch (e) {
			const err = getErrorFromError(e);
			this.setState((s) => ({
					...s,
					haveError: false,
					error: err,
				}));

			console.log(err);

			if (this.props.onLoginFailed) {
				this.props.onLoginFailed(e);
			}
		} finally {}
	};

	handleRecoverAccount = () => {
		this.setState({
			currentStepExists: RECOVERY_ACCOUNT,
		});
	};

	getCurrentViewUser = () => {
		switch (this.state.currentStepExists) {
			default:
				return null;

			case RECOVERY_ACCOUNT:
				return (
					<RecoveryPasswordDialog
						isMobile={this.props.isMobile}
						active
						onCancel={() => {
              this.setState((s) => ({ ...s, currentStepExists: '' }));
            }}
            onAccept={async (email) => {
              this.toogleLoading();
              try {
                await recoveryPassword(email);
              } catch (e) {
                const err = getErrorFromError(e);
                this.setState((s) => ({
                    ...s,
                    haveError: false,
                    error: err,
                  }));
                console.log(err);
              } finally {
                this.setState((s) => ({
                    ...s,
                    loading: false,
                    currentStepExists: '',
                  }));
              }
            }}
					/>
        );

      case MESSAGE_SUCCESSFULSPAM:
        return (
          <SuccessfulSpam
            isMobile={this.props.isMobile}
            active
            title="Revisa tu correo"
            message="Te hemos enviado un correo para que puedas recuperar tu contraseña."
            onAccept={() => {
              this.setState({
                currentStepExists: '',
              });
            }}
          />
        );
    }
  };

	render() {
		const { opened } = this.props;

		return (
			<Subscribe to={[AuthContainer]}>
				{(authState) => {
					this.authState = authState;

					return (
						<Wrapper opened={opened}>
						  <Loading active={this.props.loading} />
              <Loading active={this.state.loading} />

							<ErrorSpam
								isMobile={this.props.isMobile}
								active={this.state.haveError}
								onAccept={() => {
									this.setState((s) => ({ ...s, haveError: false }));
								}}
								title={
									this.state.error
										? this.state.error.title
										: 'Error, there is no error'
								}
								message={
									this.state.error
										? this.state.error.message
										: 'Dude lo hiciste'
								}
							/>
							<RecoveryPasswordDialog
								isMobile={this.props.isMobile}
								active={this.state.recoveryPasswordDialogActive}
								onCancel={() => {
									console.log('ON CANCEL');
									this.setState((s) => ({ ...s, recoveryPasswordDialogActive: false }));
								}}
								onAccept={async (email) => {
                  this.setState((s) => ({ ...s, loading: true }));
                  try {
                    await recoveryPassword(email);
                  } catch (e) {
                    const err = getErrorFromError(e);
                    this.setState((s) => ({
                        ...s,
                        haveError: false,
                        error: err,
                      }));
                    console.log(err);
                  } finally {
                    this.setState((s) => ({
                        ...s,
                        loading: false,
                        recoveryPasswordDialogActive: false,
                        currentStepExists: MESSAGE_SUCCESSFULSPAM,
                      }));
                  }
                }}
							/>
						{this.state.activeLoginView ? (
							<div>
								<WaveOne />
                <LoginCard
                  isMobile={this.props.isMobile}
                  onChangeFields={(fields) => {
                    this.setState((s) => ({
                        ...s,
                        email: fields.email,
                        password: fields.password,
                      }));
                  }}
                  onLogin={this.logIn}
                  goToRegister={() => {
                    this.setState((s) => ({ ...s, activeLoginView: false }));
                  }}
                  onCancel={this.props.onCancel}
                  onRecoveryPassword={() => {
                    this.setState((s) => ({
                        ...s,
                        recoveryPasswordDialogActive: true,
                      }));
                  }}
                />
							</div>
              ) : (
								<div>
								<WaveTwo />
                <RegisterCard
                  onChangeFields={(fields) => {
                    this.setState((s) => ({
                        ...s,
                        firstName: fields.firstName,
                        lastName: fields.lastName,
                        emailR: fields.email,
                        passwordR: fields.password,
                      }));
                  }}
                  onRegister={this.register}
                  goToLogin={() => {
                    this.setState((s) => ({ ...s, activeLoginView: true }));
                  }}
                  onCancel={this.props.onCancel}
                />
								</div>
              )}

              {this.getCurrentViewUser()}
      </Wrapper>
          );
        }}
   </Subscribe>
    );
  }
}

Auth.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFailed: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
};

export default Auth;
