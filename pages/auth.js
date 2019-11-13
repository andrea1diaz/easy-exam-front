import React, { Component } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import MediaQuery from 'react-responsive';
import { Subscribe } from 'unstated';
import dynamic from 'next/dynamic';

import {
  fastRegister,
  loginRequest,
  recoveryPassword,
	getIfUserExistsByEmail,
} from '../../endpoints';
import { getPathnameOfLastLocation } from '../utils/LastLocation';
import Loading from '../components/atoms/Loading';
import { validateEmail } from '../../validators';
import ErrorSpam from '../components/atoms/ErrorSpam';
import getErrorFromError from '../utils/FabricError';
import LoginPasswordLayer from '../components/molecules/LoginPasswordLayer';
import MessageWithTwoOptions from '../components/atoms/MessageWithTwoOptions';
import RecoveryPasswordDialog from '../components/molecules/RecoveryPasswordDialog';
import SuccessfulSpam from '../components/atoms/SuccessfulSpam';
import AuthContainer from '../../containers/authContainer';
import Button from '../components/atoms/Button';
import LoginCard from '../components/molecules/LoginCard';
import RegisterCard from '../components/molecules/RegisterCard';

const INTRODUCING_USERNAME = 'username';
const REGISTER = 'register';
const INTRODUCING_PASSWORD = 'password';
const LOGIN = 'login';
const LOGGED_USER = 'session_exist';
const RECOVERY_PASSWORD = 'recovery_password';
const GET_IDENTIFICATION = 'get_identification';
const SIMPLE_LOGIN = 'simple_login';
const MESSAGE_SUCCESS_RECOVERY_PASSWORD = 'message_success_recovery_password';

const BasicLayout = dynamic(
  () => import('../components/templates/BasicLayout'),
  {
    ssr: false,
    loading: () => null,
  },
);

const Scaffold = styled.div`
  padding: 16px;
  height: 100%;
  width: 100vw;
  vertical-align: middle;
  text-align: center;
  align-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  //width: 86%;
  margin: auto;
  padding-bottom: 70px;
`;

const Title = styled.div`
  font-family: 'SFProDisplay', sans-serif;
  font-size: 1.3em;
  font-weight: 300;
  color: #333;
  text-align: center;
  width: 100%;
  margin: 15px 0;
`;

class AuthLoginRegister extends Component {
  static async getInitialProps({ query, pathname }) {
    return {
      id: query.id,
      pathname,
      urlCode: query.code,
    };
  }

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			currentStep: INTRODUCING_USERNAME,
			loading: false,
			haveError: false,
			error: { title: 'Ocurrio un error', message: '' },
			continueAvailable: false,
			currentStepRegisterDni: '',
			existsUserByDni: false,
			emailsUserByDni: [],
			simpleLogin: {
				username: '',
				password: '',
			},
			toRegisterBySocial: {
				typeIdentification: 'dni',
				identification: '',
				socialAccountToken: '',
				messageSendEmailToJoinAccount: '',
			},
			toRegister: {
				typeIdentification: 'dni',
				identification: '',
				firstName: '',
				lastName: '',
				newPassword: '',
				email: '',
			},
			userInfo: {},
			facebookMode: false,
			googleMode: false,
			activeTermsAndConditionsView: false,
			activePrivacyPoliciesView: false,
		};
	}

  logIn = async (data) => {
    try {
      this.setState(s => {
        return { ...s, loading: true };
      });
      const resp = await loginRequest(data);

      await this.authState.logIn(
        resp.data.data.user,
        resp.data.data.token.value,
      );
      // TODO: Below line needs some tests...
      let lastLocation = getPathnameOfLastLocation();
      if (lastLocation === '/auth') {
        lastLocation = '/';
      }
      Router.push(lastLocation);
    } catch (e) {
      const err = getErrorFromError(e);
      this.setState(s => {
        return {
          ...s,
          loading: false,
          haveError: true,
          error: err
        };
      });
      console.log(e);
    } finally {
      this.setState(s => {
        return { ...s, loading: false };
      });
    }
  };

  genericContinue = async () => {
		const {
			currentStep,
			username,
			password,
			toRegister,
		} = this.state;

    if (currentStep === INTRODUCING_USERNAME) {
      const res = validateEmail(username);
      if (res !== undefined) {
        return;
      }

      try {
        this.setState(s => {
          return { ...s, loading: true };
        });
        const r = await getIfUserExistsByEmail(username);
        this.setState(s => {
          return { ...s, loading: false };
        });
        if (r.data.data) {
          // User exist
          this.setState(s => {
            return {
              ...s,
              currentStep: INTRODUCING_PASSWORD,
              userInfo: r.data.data.user
            };
          });
        } else {
          this.setState(s => {
            return { ...s, currentStep: REGISTER };
          });
        }
      } catch (e) {
        this.setState(s => {
          return { ...s, loading: false };
        });
        console.log(e);
      }
    } else if (currentStep === INTRODUCING_PASSWORD) {
      this.logIn({
        login: username,
        password,
      });
    } else if (currentStep === REGISTER) {
      const data = {
        identification_type: toRegister.typeIdentification,
        identification_value: toRegister.identification.trim(),
        first_name: toRegister.firstName.trim(),
        last_name: toRegister.lastName.trim(),
        email: toRegister.email.trim().toLowerCase(),
        password: toRegister.newPassword,
      };

      try {
        this.setState(s => {
          return { ...s, loading: true };
        });
        const r = await fastRegister(data);

        await this.authState.logIn(r.data.data.user, r.data.data.token.value);
        // TODO: Below line needs some tests...
        let lastLocation = getPathnameOfLastLocation();
        if (lastLocation === '/auth') {
          lastLocation = '/';
        }
        Router.push(lastLocation);

        this.setState(s => {
          return { ...s, loading: false };
        });
      } catch (e) {
        this.setState(s => {
          return {
            ...s,
            loading: false,
            haveError: true,
            error: getErrorFromError(e)
          };
        });
        console.log(e);
      }
    }
  };

  toogleLoading = () => {
    this.setState(s => {
      return {
        loading: !s.loading
      };
    });
  };

  verifyUserExistsByDNI = () => {
		const { toRegister } = this.state;

		const val = toRegister.identification;
    if (val.length >= 8) {
      this.setState(
        {
          currentStepRegisterDni: '',
          loading: true
        },
        () => {
          const data = {
            type: toRegister.typeIdentification,
            value: toRegister.identification,
          };
        },
      );
    }
  };

  onBlurIdentification = () => {
		const { toRegister } = this.state;

    if (toRegister.identification.length >= 8) {
      this.verifyUserExistsByDNI();
    }
  };

  getCurrentTitle = () => {
		const { currentStep } = this.state;

    switch (currentStep) {
      case INTRODUCING_USERNAME:
        return 'Welcome! Log in';
      case REGISTER:
        return 'Welcome! Sign up.';
      // case INTRODUCING_PASSWORD:
      //   return `Hola ${this.state.userInfo.first_name}, ingresa tu contraseña`;
      // case LOGIN:
      //   return '';
			default:
				return null;
    }
  };

  getCurrentLayer = (isMobile) => {
		const {
			username,
			password,
			userInfo,
			toRegister,
			currentStep,
		} = this.state;

    switch (currentStep) {
			default:
				return null;

      case INTRODUCING_USERNAME:
        return (
          <LoginCard
            isMobile={isMobile}
            onChangeFields={fields => {
              this.setState(s => {
                return {
                  ...s,
                  username: fields.email,
                  password: fields.password
                };
              });
            }}
            onLogin={() => {
              this.logIn({
                login: username,
                password,
              });
            }}
            goToRegister={() => {
              this.setState(s => {
                return { ...s, currentStep: REGISTER };
              });
            }}
            onRecoveryPassword={() => {
              this.setState({
                currentStepRegisterDni: RECOVERY_PASSWORD
              });
            }}
          />
        );

      case REGISTER:
        return (
          <RegisterCard
            firstName={toRegister.firstName}
            lastName={toRegister.lastName}
            email={toRegister.email}
            password={toRegister.newPassword}
            isMobile={isMobile}
            onChangeFields={fields => {
              this.setState(s => {
                return {
                  ...s,
                  toRegister: {
                    ...s.toRegister,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    newPassword: fields.password,
                    email: fields.email,
                  },
                };
              });
            }}
            goToLogin={() => {
              this.setState(s => {
                return { ...s, currentStep: INTRODUCING_USERNAME };
              });
            }}
            onRegister={this.genericContinue}
            onTermsAndConditions={() => {
              this.setState(s => {
                return { ...s, activeTermsAndConditionsView: true };
              });
            }}
          />
        );

      case INTRODUCING_PASSWORD:
        if (userInfo === {} || userInfo === undefined) {
          this.setState(s => {
            return { ...s, currentStep: INTRODUCING_USERNAME };
          });

          return null;
        }
        return (
          <LoginPasswordLayer
            password={password}
            lostPassword={() => {
              this.setState({
                currentStepRegisterDni: RECOVERY_PASSWORD,
              });
            }}
            onPasswordChange={v => this.setState(s => {
							return {
								...s,
                password: v,
              };
            })
            }
            onContinue={this.genericContinue}
          />
        );

      case LOGIN:
        return <div>abc</div>;
    }
  };

  onBack = () => {
		const { currentStep } = this.state;

    switch (currentStep) {
			default:
				return <div>abc</div>;

      case INTRODUCING_PASSWORD:
        this.setState(s => {
          return { ...s, currentStep: INTRODUCING_USERNAME };
        });
        break;

      case REGISTER:
        this.setState(s => {
          return { ...s, currentStep: INTRODUCING_USERNAME };
        });
        break;
    }
  };


  handleRecoverAccount = () => {
    this.setState({
      currentStepRegisterDni: RECOVERY_PASSWORD,
    });
  };


  render() {
		const {
			loading,
			haveError,
			error,
		} = this.state;
		
		const {
			pathname,
		} = this.props;

    return (
      <Subscribe to={[AuthContainer]}>
        {(authState) => {
          this.authState = authState;
          return (
            <MediaQuery maxWidth={720}>
              {isMobile => {
                this.isMobile = isMobile;
                return (
                  <div>
                    <Loading active={loading} />
                    <ErrorSpam
                      isMobile={isMobile}
                      active={haveError}
                      onAccept={() => {
                        Router.push('/auth');
                        this.setState(s => {
                          return { ...s, haveError: false };
                        });
                      }}
                      title={error.title || 'Error, no hay error'}
                      message={error.message || 'Paw paw paw paw paw'}
                    />
                    <BasicLayout
                      isMobile={isMobile}
                      withBack={false}
                      pathname={pathname}
                      title="Home"
                      onTapTitle={() => Router.push('/')}
                      userData={authState.getUserData()}
                    >
                      <div>
                        {authState.state.isAuth ? (
                          <div
                            style={{
                              textAlign: 'center',
                              fontWeight: '200',
                              letterSpacing: '0.5px',
                              height: 'calc(100vh - 150px)',
                              width: '100vw',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '1.2em',
                                }}
                              >
                                Ya existe una sesión iniciada
                              </div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '0.9em',
                                }}
                              >
                                La última vez tu entraste como
                              </div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '1.1em',
                                }}
                              >
                                {authState.state.userData.full_name}
                              </div>
                              <br />
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-evenly',
                                }}
                              >
                                <Button onClick={() => Router.push('/')}>
                                  <span style={{ paddingRight: '0.6em' }}>
                                    &larr;
                                  </span>
                                  <span> Ir a inicio</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Scaffold>
                            <Wrapper>
                              {!this.getCurrentTitle() ? null : (
                                <Title>{this.getCurrentTitle()}</Title>
                              )}
                              {this.getCurrentLayer(isMobile)}
                              {this.getMessageWithTwoOptions()}
                            </Wrapper>
                          </Scaffold>
                        )}
                      </div>
                    </BasicLayout>
                  </div>
                );
              }}
            </MediaQuery>
          );
        }}
      </Subscribe>
    );
  }
}

AuthLoginRegister.propTypes = {};

export default AuthLoginRegister;
