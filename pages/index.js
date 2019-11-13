import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Subscribe } from 'unstated';

import AuthContainer from '../containers/authContainer'
import LogIn from './LogIn';
import SearchBar from '../components/molecules/SearchBar';

class Index extends Component {
		static async getInitialProps({ pathname }) {
    const dataError = '';

    try {
      return {
				pathname,
        dataError: '',
      };
    } catch (e) {
      console.log(e);
      // dataError = e.response.data.message;
      return {
        pathname,
        dataError,
      };
    }
  }

	constructor(props) {
		super(props);
		this.state = {
			activeShare: false,
			shareDetails: {},
			loginOpened: true,
			activePop: false,
			loading: true,
			loadingPopUpLogin: false,
		};
	}

	componentDidMount() {
    this.loading();
  }

  loading = async () => {
    this.setState(s => {
      return {
        ...s,
        loading: false,
      };
    });
  };

	render() {
		return (
			<Subscribe to={[AuthContainer]}>
			{authState => {
          this.authState = authState;
          return (
            <MediaQuery maxWidth={720}>
              {isMobile => {
                return (
                  <div>
                    <LogIn
                      isMobile={isMobile}
                      pathname={this.props.pathname}
                      loading={this.state.loadingPopUpLogin}
                      opened={this.state.loginOpened}
                      onCancel={() => {
                        this.setState(s => {
                          return { ...s, loginOpened: false, activePop: false };
                        });
                      }}
                      onLoginSuccess={async () => {
                        this.setState(s => {
                          return { ...s, loadingPopUpLogin: true };
                        });
                        this.setState(s => {
                          return {
                            ...s,
                            loginOpened: false,
                            activePop: false,
                            loadingPopUpLogin: false
                          };
                        });
                      }}
                    />
                    <Main activePop={this.state.activePop}>
                      {this.state.loading ? (
                        <LoadingBasicLayout />
                      ) : (
                        <BasicLayout
                          isMobile={isMobile}
                          withBack={false}
                          pathname={this.props.pathname}
                          title="Home"
                          userData={authState.getUserData()}
                          onLogout={() => {
                            this.setState(s => {
                              return {
                                ...s,
                              };
                            });
                          }}
                        >
                        </BasicLayout>
                      )}
                    </Main>
                  </div>
                );
              }}
            </MediaQuery>
          );
        }}
			</Subscribe>
			*/
			<SearchBar />
		)
	}
}

export default Index;
