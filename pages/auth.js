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
} from '../../endpoints';
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
    loading: () => null
  }
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

const LogoIDPass = styled.img`
  width: auto;
  height: 60px;
  margin: 10px 0;
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
      pathname: pathname,
      urlCode: query.code
    };
  }

  state = {
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
      password: ''
    },
    toRegisterBySocial: {
      typeIdentification: 'dni',
      identification: '',
      socialAccountToken: '',
      messageSendEmailToJoinAccount: ''
    },
    toRegister: {
      typeIdentification: 'dni',
      identification: '',
      firstName: '',
      lastName: '',
      newPassword: '',
      email: ''
    },
    userInfo: {},
    facebookMode: false,
    googleMode: false,
    activeTermsAndConditionsView: false,
    activePrivacyPoliciesView: false
  };

  onLoginWithFacebook = async () => {
    saveLastFacebookLocation(this.props.pathname); // Save the last location
    this.socialState.setSocialLoginMode(FACEBOOK_MODE);
    const r = await loginWithFacebook();
    window.location = r.data;
  };

  onLoginWithGoogle = async () => {
    saveLastGoogleLocation(this.props.pathname); // Save the last location
    this.socialState.setSocialLoginMode(GOOGLE_MODE);
    const r = await loginWithGoogle();
    window.location = r.data;
  };

  componentDidMount() {
    if (process.browser && this.socialState.state.mode == FACEBOOK_MODE) {
      this.socialState.setSocialLoginMode('');
      this.setState(s => {
        return { ...s, loading: true };
      });
      verifyLoginWithFacebook(this.props.urlCode)
        .then(r => {
          this.toogleLoading();
          if (r.status === 200) {
            if (r.data.status === 'U-200') {
              //USER EXISTS - LOGIN NORMAL WITH FB
              this.handleLoginWithFb(r.data.data.user, r.data.data.token.value);
              this.socialState.setSocialLoginMode('');
            } else if (r.data.status === 'U-1000') {
              //EMAIL OF FB EXISTS
              //IF I WANT TO RECEIVE THE MESSAGE, THAT IS HERE
              this.setState(
                s => {
                  return {
                    ...s,
                    loading: false,
                    facebookMode: true,
                    currentStepRegisterDni: EMAIL_OF_FB_EXISTS,
                    toRegisterBySocial: {
                      ...s.toRegisterBySocial,
                      socialAccountToken: r.data.social_account_token,
                      messageSendEmailToJoinAccount: r.data.message
                    }
                  };
                },
                () => {
                  this.socialState.setSocialLoginMode('');
                }
              );
            } else if (
              r.data.status === 'SA-404' ||
              r.data.status === 'U-404'
            ) {
              //ASK FOR DNI
              this.setState(
                s => {
                  return {
                    ...s,
                    loading: false,
                    facebookMode: true,
                    currentStepRegisterDni: GET_IDENTIFICATION,
                    toRegisterBySocial: {
                      ...s.toRegisterBySocial,
                      socialAccountToken: r.data.social_account_token
                    }
                  };
                },
                () => {
                  this.socialState.setSocialLoginMode('');
                }
              );
            }
          }
        })
        .catch(e => {
          this.toogleLoading();
          const err = getErrorFromError(e);
          this.setState(
            s => {
              return {
                ...s,
                haveError: true,
                error: err
              };
            },
            () => {
              this.socialState.setSocialLoginMode('');
            }
          );
        });
    } else if (process.browser && this.socialState.state.mode == GOOGLE_MODE) {
      this.socialState.setSocialLoginMode('');
      verifyLoginWithGoogle(this.props.urlCode)
        .then(r => {
          this.toogleLoading();
          if (r.status === 200) {
            if (r.data.status === 'U-200') {
              //USER EXISTS - LOGIN NORMAL WITH GOOGLE
              this.handleLoginWithGoogle(
                r.data.data.user,
                r.data.data.token.value
              );
              this.socialState.setSocialLoginMode('');
            } else if (r.data.status === 'U-1000') {
              //EMAIL OF GOOGLE EXISTS
              //IF I WANT TO RECEIVE THE MESSAGE, THAT IS HERE
              this.setState(
                s => {
                  return {
                    ...s,
                    loading: false,
                    googleMode: true,
                    currentStepRegisterDni: EMAIL_OF_FB_EXISTS,
                    toRegisterBySocial: {
                      ...s.toRegisterBySocial,
                      socialAccountToken: r.data.social_account_token,
                      messageSendEmailToJoinAccount: r.data.message
                    }
                  };
                },
                () => {
                  this.socialState.setSocialLoginMode('');
                }
              );
            } else if (
              r.data.status === 'SA-404' ||
              r.data.status === 'U-404'
            ) {
              //ASK FOR DNI
              this.setState(
                s => {
                  return {
                    ...s,
                    loading: false,
                    googleMode: true,
                    currentStepRegisterDni: GET_IDENTIFICATION,
                    toRegisterBySocial: {
                      ...s.toRegisterBySocial,
                      socialAccountToken: r.data.social_account_token
                    }
                  };
                },
                () => {
                  this.socialState.setSocialLoginMode('');
                }
              );
            }
          }
        })
        .catch(e => {
          this.toogleLoading();
          const err = getErrorFromError(e);
          this.setState(
            s => {
              return {
                ...s,
                haveError: true,
                error: err
              };
            },
            () => {
              this.socialState.setSocialLoginMode('');
            }
          );
        });
    }
  }

  handleLoginWithFb = async (dataUser, token) => {
    const user = {
      dataUser,
      token
    };

    await this.authState.logIn(user.dataUser, user.token);
    let lastLocation = getPathnameOfLastFacebookLocation();
    if (lastLocation === '/auth') {
      lastLocation = '/';
    }
    Router.push(lastLocation);
  };

  handleLoginWithGoogle = async (dataUser, token) => {
    const user = {
      dataUser,
      token
    };

    await this.authState.logIn(user.dataUser, user.token);
    let lastLocation = getPathnameOfLastGoogleLocation();
    if (lastLocation === '/auth') {
      lastLocation = '/';
    }
    Router.push(lastLocation);
  };

  logIn = async data => {
    try {
      this.setState(s => {
        return { ...s, loading: true };
      });
      const resp = await loginRequest(data);

      await this.authState.logIn(
        resp.data.data.user,
        resp.data.data.token.value
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
    if (this.state.currentStep === INTRODUCING_USERNAME) {
      const res = validateEmail(this.state.username);
      if (res !== undefined) {
        return;
      }

      try {
        this.setState(s => {
          return { ...s, loading: true };
        });
        const r = await getIfUserExistByEmail(this.state.username);
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
    } else if (this.state.currentStep === INTRODUCING_PASSWORD) {
      this.logIn({
        login: this.state.username,
        password: this.state.password
      });
    } else if (this.state.currentStep === REGISTER) {
      const data = {
        identification_type: this.state.toRegister.typeIdentification,
        identification_value: this.state.toRegister.identification.trim(),
        first_name: this.state.toRegister.firstName.trim(),
        last_name: this.state.toRegister.lastName.trim(),
        email: this.state.toRegister.email.trim().toLowerCase(),
        password: this.state.toRegister.newPassword
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
    let val =
      this.state.facebookMode || this.state.googleMode
        ? this.state.toRegisterBySocial.identification
        : this.state.toRegister.identification;
    if (val.length >= 8) {
      this.setState(
        {
          currentStepRegisterDni: '',
          loading: true
        },
        () => {
          let data = {
            type:
              this.state.facebookMode || this.state.googleMode
                ? this.state.toRegisterBySocial.typeIdentification
                : this.state.toRegister.typeIdentification,
            value:
              this.state.facebookMode || this.state.googleMode
                ? this.state.toRegisterBySocial.identification
                : this.state.toRegister.identification
          };
          searchUserExitsByDni(data)
            .then(rr => {
              this.toogleLoading();
              if (rr.data.success) {
                this.setState({
                  currentStepRegisterDni: EXISTS_USER_BY_DNI,
                  emailsUserByDni: rr.data.emails
                });
              } else if (!rr.data.success) {
                //CREATE ACCOUNT WITH TOKEN AND IDENTIFICATION

                if (this.state.facebookMode || this.state.googleMode) {
                  //ONLY FOR LOGIN WITH FB
                  this.handleCreateAccountWithIdentificationSocial();
                }
              }
            })
            .catch(e => {
              this.toogleLoading();
              const err = getErrorFromError(e);
              this.setState(s => {
                return {
                  ...s,
                  haveError: true,
                  error: err
                };
              });
              console.log(err);
            });
        }
      );
    }
  };

  handleCreateAccountWithIdentificationSocial = () => {
    this.toogleLoading();
    createAccountWithIdentificationSocial({
      identification_type: this.state.toRegisterBySocial.typeIdentification,
      identification_value: this.state.toRegisterBySocial.identification,
      social_account_token: this.state.toRegisterBySocial.socialAccountToken
    })
      .then(r => {
        this.toogleLoading();
        //LOGIN
        this.handleLoginWithFb(r.data.data.user, r.data.data.token.value);
      })
      .catch(e => {
        this.toogleLoading();
        const err = getErrorFromError(e);
        this.setState(s => {
          return {
            ...s,
            haveError: true,
            error: err,
            currentStepRegisterDni: ''
          };
        });
        console.log(err);
      });
  };

  onBlurIdentification = () => {
    if (this.state.toRegister.identification.length >= 8) {
      this.verifyUserExistsByDNI();
    }
  };

  getCurrentTitle = () => {
    switch (this.state.currentStep) {
      case INTRODUCING_USERNAME:
        return 'Bienvenido, inicia sesión';
      case REGISTER:
        return 'Bienvenido, regístrate';
      // case INTRODUCING_PASSWORD:
      //   return `Hola ${this.state.userInfo.first_name}, ingresa tu contraseña`;
      // case LOGIN:
      //   return '';
    }
  };

  getCurrentLayer = isMobile => {
    switch (this.state.currentStep) {
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
                login: this.state.username,
                password: this.state.password
              });
            }}
            onFacebookLogin={this.onLoginWithFacebook}
            onGoogleLogin={this.onLoginWithGoogle}
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
            typeIdentification={this.state.toRegister.typeIdentification}
            identification={this.state.toRegister.identification}
            firstName={this.state.toRegister.firstName}
            lastName={this.state.toRegister.lastName}
            email={this.state.toRegister.email}
            password={this.state.toRegister.newPassword}
            onBlurIdentification={this.onBlurIdentification}
            isMobile={isMobile}
            onSelectIdentification={v => {
              this.setState(s => {
                return {
                  ...s,
                  toRegister: { ...s.toRegister, typeIdentification: v }
                };
              });
            }}
            onChangeIdentification={v =>
              this.setState(s => {
                return {
                  ...s,
                  toRegister: { ...s.toRegister, identification: v }
                };
              })
            }
            onChangeFields={fields => {
              this.setState(s => {
                return {
                  ...s,
                  toRegister: {
                    ...s.toRegister,
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    newPassword: fields.password,
                    email: fields.email
                  }
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
            onPrivacyPolicies={() => {
              this.setState(s => {
                return { ...s, activePrivacyPoliciesView: true };
              });
            }}
          />
        );
      case INTRODUCING_PASSWORD:
        if (this.state.userInfo === {} || this.state.userInfo === undefined) {
          this.setState(s => {
            return { ...s, currentStep: INTRODUCING_USERNAME };
          });
          return;
        }
        return (
          <LoginPasswordLayer
            password={this.state.password}
            lostPassword={() => {
              this.setState({
                currentStepRegisterDni: RECOVERY_PASSWORD
              });
            }}
            onPasswordChange={v =>
              this.setState(s => {
                return {
                  ...s,
                  password: v
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
    switch (this.state.currentStep) {
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
      currentStepRegisterDni: RECOVERY_PASSWORD
    });
  };

  handleJoinAccountWithDniExists = () => {
    //JOIN ACCOUNT THEN LOGIN
    this.setState({
      currentStepRegisterDni: SIMPLE_LOGIN
    });
  };

  handleLoginWithFacebookAndBindAccountByDni = () => {
    this.toogleLoading();
    loginWithFacebookAndBindAccounts({
      login: this.state.simpleLogin.username.trim(),
      password: this.state.simpleLogin.password,
      social_account_token: this.state.toRegisterBySocial.socialAccountToken
    })
      .then(r => {
        this.toogleLoading();
        if (r.status === 200) {
          this.handleLoginWithFb(r.data.data.user, r.data.data.token.value);
        }
      })
      .catch(e => {
        this.toogleLoading();
        const err = getErrorFromError(e);
        this.setState(s => {
          return {
            ...s,
            haveError: true,
            error: err,
            currentStepRegisterDni: ''
          };
        });
        console.log(err);
      });
  };

  handleJoinAccountWithEmailExists = () => {
    this.toogleLoading();
    sendEmailToJoinAccountByFb2({
      social_account_token: this.state.toRegisterBySocial.socialAccountToken
    })
      .then(r => {
        this.toogleLoading();
        this.setState(s => {
          return {
            ...s,
            currentStepRegisterDni: MESSAGE_TO_JOIN_EMAIL_OF_FB,
            toRegisterBySocial: {
              ...s.toRegisterBySocial,
              messageSendEmailToJoinAccount: r.data.message
            }
          };
        });
      })
      .catch(e => {
        this.toogleLoading();
        const err = getErrorFromError(e);
        this.setState(s => {
          return {
            ...s,
            haveError: true,
            error: err,
            currentStepRegisterDni: ''
          };
        });
        console.log(err);
      });
  };

  getMessageWithTwoOptions = () => {
    switch (this.state.currentStepRegisterDni) {
      case EXISTS_USER_BY_DNI:
        let email = '';
        let emailsUserByDni = this.state.emailsUserByDni;
        for (let i in emailsUserByDni) {
          if (i != 0) {
            email += ', ';
          }
          email += emailsUserByDni[i];
        }
        return (
          <MessageWithTwoOptions
            active={true}
            isMobile={this.isMobile}
            title={'Este DNI está en uso'}
            message={`Este DNI esta siendo usado por estos correos: ${email}`}
            firstOptionText={
              this.state.facebookMode ? 'Recuperar contraseña' : 'Cancelar'
            }
            secondOptionText={
              this.state.facebookMode ? 'Unir cuentas' : 'Recuperar contraseña'
            }
            secondOptionColor={true}
            firstOptionClick={
              this.state.facebookMode
                ? () =>
                    this.setState({ currentStepRegisterDni: RECOVERY_PASSWORD })
                : () =>
                    this.setState({
                      currentStepRegisterDni: ''
                    })
            }
            secondOptionClick={
              this.state.facebookMode
                ? this.handleJoinAccountWithDniExists
                : this.handleRecoverAccount
            }
          />
        );
      case RECOVERY_PASSWORD:
        return (
          <RecoveryPasswordDialog
            isMobile={this.isMobile}
            active={true}
            onCancel={() => {
              this.setState(s => {
                return { ...s, currentStepRegisterDni: '' };
              });
            }}
            onAccept={async email => {
              this.toogleLoading();
              try {
                await recoveryPassword(email);
                this.setState({
                  loading: false,
                  currentStepRegisterDni: MESSAGE_SUCCESS_RECOVERY_PASSWORD
                });
              } catch (e) {
                const err = getErrorFromError(e);
                this.setState(s => {
                  return {
                    ...s,
                    haveError: true,
                    error: err,
                    currentStepRegisterDni: ''
                  };
                });
                console.log(err);
              } finally {
                this.setState(s => {
                  return {
                    ...s,
                    loading: false
                  };
                });
              }
            }}
          />
        );
      case GET_IDENTIFICATION:
        return (
          <InsertIdentification
            active={true}
            isMobile={this.isMobile}
            identification={this.state.toRegisterBySocial.identification}
            typeIdentification={
              this.state.toRegisterBySocial.typeIdentification
            }
            verifyUserExistsByDNI={this.verifyUserExistsByDNI}
            onChangeTypeIdentification={v =>
              this.setState(s => {
                return {
                  ...s,
                  toRegisterBySocial: {
                    ...s.toRegisterBySocial,
                    typeIdentification: v
                  }
                };
              })
            }
            onChangeIdentification={v =>
              this.setState(s => {
                return {
                  ...s,
                  toRegisterBySocial: {
                    ...s.toRegisterBySocial,
                    identification: v
                  }
                };
              })
            }
          />
        );
      case EMAIL_OF_FB_EXISTS:
        return (
          <MessageWithTwoOptions
            active={true}
            isMobile={this.isMobile}
            title={'El correo ya ha sido utilizado'}
            message={
              this.state.toRegisterBySocial.messageSendEmailToJoinAccount
            }
            firstOptionText={'Salir'}
            secondOptionText={
              this.state.facebookMode
                ? '¿Desea vincular este facebook a la cuenta de ID?'
                : '¿Desea vincular esta cuenta de google a la cuenta de ID?'
            }
            secondOptionColor={true}
            firstOptionClick={() => {
              this.setState(
                {
                  currentStepRegisterDni: ''
                },
                () => {
                  Router.push('/auth');
                }
              );
            }}
            secondOptionClick={() => {
              this.setState(
                {
                  currentStepRegisterDni: ''
                },
                () => {
                  this.handleJoinAccountWithEmailExists();
                }
              );
            }}
          />
        );
      case MESSAGE_TO_JOIN_EMAIL_OF_FB:
        return (
          <SuccessfulSpam
            active={true}
            isMobile={this.isMobile}
            title={'Revisa tu correo'}
            message={
              this.state.toRegisterBySocial.messageSendEmailToJoinAccount
            }
            onAccept={() => {
              this.setState({
                currentStepRegisterDni: ''
              });
            }}
          />
        );
      case MESSAGE_SUCCESS_RECOVERY_PASSWORD:
        return (
          <SuccessfulSpam
            active={true}
            isMobile={this.isMobile}
            title={'Revisa tu correo'}
            message={
              'Te hemos enviado un mensaje a tu correo para que puedas recuperar tu contraseña.'
            }
            onAccept={() => {
              this.setState({
                currentStepRegisterDni: ''
              });
            }}
          />
        );
          }
  };

  render() {
    return (
      <Subscribe to={[AuthContainer, SocialContainer]}>
        {(authState, socialState) => {
          this.authState = authState;
          this.socialState = socialState;
          return (
            <MediaQuery maxWidth={720}>
              {isMobile => {
                this.isMobile = isMobile;
                return (
                  <div>
                    <Loading active={this.state.loading} />
                    <ErrorSpam
                      isMobile={isMobile}
                      active={this.state.haveError}
                      onAccept={() => {
                        Router.push('/auth');
                        this.setState(s => {
                          return { ...s, haveError: false };
                        });
                      }}
                      title={this.state.error.title || 'Error, no hay error'}
                      message={
                        this.state.error.message || 'Paw paw paw paw paw'
                      }
                    />
                    <FloatingPrivacyPolicies
                      isMobile={isMobile}
                      active={this.state.activePrivacyPoliciesView}
                      onCancel={() => {
                        this.setState(s => {
                          return { ...s, activePrivacyPoliciesView: false };
                        });
                      }}
                    />
                    <FloatingTermsOfService
                      isMobile={isMobile}
                      active={this.state.activeTermsAndConditionsView}
                      onCancel={() => {
                        this.setState(s => {
                          return { ...s, activeTermsAndConditionsView: false };
                        });
                      }}
                    />
                    <BasicLayout
                      isMobile={isMobile}
                      withBack={false}
                      pathname={this.props.pathname}
                      title={'Home'}
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
                              alignItems: 'center'
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '1.2em'
                                }}
                              >
                                Ya existe una sesión iniciada
                              </div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '0.9em'
                                }}
                              >
                                La última vez tu entraste como
                              </div>
                              <div
                                style={{
                                  marginBottom: '1em',
                                  fontSize: '1.1em'
                                }}
                              >
                                {authState.state.userData.full_name}
                              </div>
                              <br />
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-evenly'
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
                            {/*<LogoIDPass*/}
                            {/*src={'static/img/idpass.png'}*/}
                            {/*alt={'ID pass'}*/}
                            {/*/>*/}
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

