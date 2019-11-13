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

import {
	loginRequest,
	fastRegister,
} from '../../endpoints';

const Wrapper = styled.div`
	display: ${props => (props.opened ? 'block' : 'none')};
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
			haveError: false,
			error: {},
			activeLoginView: true,
			recoveryPasswordDialogActive: false,
			currentStepExists: '',
		};
	}

	logIn = async () => {
		const data = { login: this.state.email.email, password: this.state.password.password };
		console.log('On login function');
		console.log(data);

		try {
			const resp = await loginRequest(data);
			console.log(resp.data.data);

			await this.authState.logIn (
				resp.data.data.user,
				resp.data.data.token.value,
			);

			this.props.onLoginSuccess ({
				userData: resp.data.data.user,
				token: resp.data.dara.token.value,
			});
		} catch (e) {
			const err = getErrorFromError(e);
			this.setState(s => {
				return {
					...s,
					haveError: true,
					error: err,
				};
			});

			if (this.props.onLoginFailed) {
				this.props.onLoginFailed (e);
			}
		} finally {}
	};

	register = async () => {
		const data = {
			firstName: this.state.firstName.trim(),
			lastName: this.state.lastName.trim(),
			email: this.state.emailR.trim().toLowerCase(),
			password: this.state.passwordR,
		};

		try {
			const r = await fastRegister(data);
			console.log(r.data.data);

			await this.authState.logIn(r.data.data.user, r.data.data.token.value);

			this.props.onLoginSuccess ({
				userData: r.data.data.user,
				token: r.data.data.token.value,
			});
		} catch (e) {
			const err = getErrorFromError (e);
			this.setState (s => {
				return {
					...s,
					haveError: true,
					error: err,
				};
			});

			console.log(err);
			
			if (this.props.onLoginFailed) {
				this.props.onLoginFailed (e);
			}
		} finally {}
	};

	handleRecoverAccount = () => {
		this.setState ({
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
						active={true}
						onCancel={() => {
              this.setState(s => {
                return { ...s, currentStepExists: '' };
              });
            }}
            onAccept={async email => {
              this.toogleLoading();
              try {
                await recoveryPassword(email);
              } catch (e) {
                const err = getErrorFromError(e);
                this.setState(s => {
                  return {
                    ...s,
                    haveError: true,
                    error: err
                  };
                });
                console.log(err);
              } finally {
                this.setState(s => {
                  return {
                    ...s,
                    loading: false,
                    currentStepExists: '',
                  };
                });
              }
            }}
          />
        );

      case MESSAGE_SUCCESSFULSPAM:
        return (
          <SuccessfulSpam
            isMobile={this.props.isMobile}
            active={true}
            title={"Revisa tu correo"}
            message={
              "Te hemos enviado un correo para que puedas recuperar tu contraseña."
            }
            onAccept={() => {
              this.setState({
                currentStepExists: ""
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
							<ErrorSpam
								isMobile={this.props.isMobile}
								active={this.state.haveError}
								onAccept={() => {
									this.setState(s => {
										return { ...s, haveError: false };
									});
								}}
								title={
									this.state.error
										? this.state.error.title
										: 'Error, there is no error'
								}
								message={
									this.state.error
										? this.state.error.message
										: 'what?'
								}
							/>
							<RecoveryPasswordDialog
								isMobile={this.props.isMobile}
								active={this.state.recoveryPasswordDialogActive}
								onCancel={() => {
									console.log('ON CANCEL');
									this.setState (s => {
										return { ...s, recoveryPasswordDialogActive: false };
									});
								}}
								onAccept={async email => {
                  this.setState(s => {
                    return { ...s, loading: true };
                  });
                  try {
                    await recoveryPassword(email);
                  } catch (e) {
                    const err = getErrorFromError(e);
                    this.setState(s => {
                      return {
                        ...s,
                        haveError: true,
                        error: err
                      };
                    });
                    console.log(err);
                  } finally {
                    this.setState(s => {
                      return {
                        ...s,
                        loading: false,
                        recoveryPasswordDialogActive: false,
                        currentStepExists: MESSAGE_SUCCESSFULSPAM
                      };
                    });
                  }
                }}
              />
						{this.state.activeLoginView ? (
							<div>
								<WaveOne />
                <LoginCard
                  isMobile={this.props.isMobile}
                  onChangeFields={fields => {
                    this.setState(s => {
                      return {
                        ...s,
                        email: fields.email,
                        password: fields.password
                      };
                    });
                  }}
                  onLogin={this.logIn}
                  goToRegister={() => {
                    this.setState(s => {
                      return { ...s, activeLoginView: false };
                    });
                  }}
                  onCancel={this.props.onCancel}
                  onRecoveryPassword={() => {
                    this.setState(s => {
                      return {
                        ...s,
                        recoveryPasswordDialogActive: true
                      };
                    });
                  }}
                />
							</div>
              ) : (
								<div>
								<WaveTwo />
                <RegisterCard
                  onChangeFields={fields => {
                    this.setState(s => {
                      return {
                        ...s,
                        firstName: fields.firstName,
                        lastName: fields.lastName,
                        emailR: fields.email,
                        passwordR: fields.password
                      };
                    });
                  }}
                  onRegister={this.register}
                  goToLogin={() => {
                    this.setState(s => {
                      return { ...s, activeLoginView: true };
                    });
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
  onForgotPassword: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
  asPath: PropTypes.string
};

export default Auth;
