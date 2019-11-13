import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Subscribe } from 'unstated';

import HomeIcon from '../atoms/HomeIcon';
import ProfileIcon from '../atoms/ProfileIcon';
import BottomBarMol from '../molecules/BottomBarMol';
import BottomSheet from '../atoms/BottomSheet';
import BadgeNotification from './BadgeNotification';
import ConfirmDialog from '../atoms/ConfirmDialog';
import AuthContainer from '../../containers/authContainer';

const SubMenuOptionsContainer = styled.div`
  padding: 18px 0;
  display: flex;
  flex-flow: column;
  transition: 0.3s;
  width: 100%;
`;

const SubMenuOption = styled.div`
  display: flex;
  padding: 12px 18px;
  align-items: center;
  vertical-align: middle;
  :hover {
    background-color: #5565fb22;
    cursor: pointer;
  }
`;

const SubMenuOptionName = styled.div`
  font-family: 'SFProDisplay', sans-serif;
  font-size: 1em;
  color: #333;
  margin-left: 8px;
`;

class BottomBar extends Component {
  state = {
    bottomSheetOpen: false,
    bottomSheetOptions: [],
    confirmDialogActive: false,
  };

  openConfirmDialog = () => {
    this.setState(s => {
      return { ...s, confirmDialogActive: true, bottomSheetOpen: false };
    });
  };

  closeConfirmDialog = () => {
    this.setState(s => {
      return { ...s, confirmDialogActive: false };
    });
  };

  getOptions = isAuth => {
    let options = [
      {
        icon: <HomeIcon />,
        to: '/',
        name: 'Home',
        headTitle: ' Pass',
        title: ' Pass',
        description: 'Ve a los mejores lugares y eventos',
        back: false
      },

			{
        icon: <ProfileIcon.js />,
        to: '/me',
        name: 'Perfil',
        headTitle: ' Pass | Tu perfil',
        title: 'Tu perfil',
        description: '',
        back: true
      },
      {
        icon: <BadgeNotification />,
        to: '/notifications',
        name: 'Notificaciones',
        headTitle: ' Pass | Tus notificaciones',
        title: 'Tus notificaciones',
        description: '',
        back: true
      },
    ];
    return options;
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {authState => {
          this.authState = authState;
          return (
            <div>
              /<ConfirmDialog
                active={this.state.confirmDialogActive}
                title={'Cerrar sesión'}
                description={'Esta seguro que desea cerrar sesión'}
                onCancel={this.closeConfirmDialog}
                onAccept={async () => {
                  this.closeConfirmDialog();
                  await authState.logOut();
                  if (this.props.onLogout) {
                    this.props.onLogout();
                  }
                }}
              />
              <BottomSheet
                active={this.state.bottomSheetOpen}
                isMobile={this.props.isMobile}
                h={260}
                onClose={() =>
                  this.setState(s => {
                    return { ...s, bottomSheetOpen: false };
                  })
                }
              >
                <SubMenuOptionsContainer>
                  {this.state.bottomSheetOptions.map((o, i) => {
                    return (
                      <SubMenuOption key={i} onClick={o.action}>
                        {o.icon}
                        <SubMenuOptionName>{o.name}</SubMenuOptionName>
                      </SubMenuOption>
                    );
                  })}
                </SubMenuOptionsContainer>
              </BottomSheet>
              <BottomBarMol
                small={this.props.small}
                options={this.getOptions(Boolean(authState.state.isAuth))}
                defaultSelected={this.props.pathname}
                activeColor="#5565FB"
                deactivateColor="#3a3a3a"
                onOpenSubMenu={opt =>
                  this.setState(s => {
                    return {
                      ...s,
                      bottomSheetOpen: true,
                      bottomSheetOptions: opt.options
                    };
                  })
                }
              />
            </div>
          );
        }}
      </Subscribe>
    );
  }
}

BottomBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  small: PropTypes.bool,
  isMobile: PropTypes.bool,
  onLogout: PropTypes.func,
};

BottomBar.defaultProps = {
  onLogout: () => {},
};

export default BottomBar;
