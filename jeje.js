import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import MediaQuery from 'react-responsive';
import dynamic from 'next/dynamic';
import { Subscribe } from 'unstated';

<<<<<<< HEAD
import AuthContainer from '../containers/authContainer'
import CreateExamModal from '../components/molecules/CreateExamModal';


class Index extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

	render () {
		return (
      <div>
        <button onClick={this.toggleModal}>Open Modal</button>
        <CreateExamModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
        />
      </div>
=======
import LoadingBasicLayout from '../components/atoms/LoadingBasicLayout';
import AuthContainer from '../containers/authContainer';

const BasicLayout = dynamic(
  () => import('../components/templates/BasicLayout'),
  {
    ssr: false,
    loading: () => <LoadingBasicLayout />,
  },
);


const LogIn = dynamic(() => import('../components/organisms/LogIn'), {
  ssr: false,
  loading: () => null,
});


const Main = styled.div`
  ${props => {
    if (props.activePop) {
      return css`
        width: 100%;
        overflow-y: hidden;
        height: 100%;
        position: fixed;
      `;
    }
  }};
`;


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
>>>>>>> dev
		)
	}
}

Index.propTypes = {
  name: PropTypes.number
};

export default Index;
