import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

import NotificationIcon from '../atoms/NotificationIcon';
import { getMyNotifications } from '../../endpoints';
import { TOKEN_KEY } from '../../utils/constants';

const ContainerIcon = styled.div`
  position: relative;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(73, 104, 228, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(73, 104, 228, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(73, 104, 228, 0);
  }
`;

const Badge = styled.div`
  font-family: "SFProDisplay", sans-serif;
  font-size: 0.8em;
  position: absolute;
  top: -8px;
  right: -7px;
  padding: 1px 5px;
  color: white;
  background-color: #4968e4;
  border-radius: 50%;
  ${props => {
    if (props.count > 0) {
      return css`
        animation: ${pulse} 1s infinite;
        :hover {
          animation: none;
        }
      `;
    }
  }}
`;

class BadgeNotification extends Component {
  state = {
    notificationsNotSeenOnly: 0
  };

  componentDidMount() {
    if (store.get(TOKEN_KEY)) {
      this.onGetMyNotifications(store.get(TOKEN_KEY));
    }
  }

  onGetMyNotifications = async (userToken) => {
    try {
      const r = await getMyNotifications(userToken);
      if (r.status === 200) {
        const data = r.data.data;
        const processedData = data.map((notification, i) =>
          Object({
            seen: notification.read
          })
        );
        const notificationsNotSeenOnly = processedData.filter(
          notification => notification.seen === false
        );
        this.setState(s => {
          return {
            notificationsNotSeenOnly: notificationsNotSeenOnly.length
          };
        });
      }
    } catch (e) {
      const errorMessage = !e.response
        ? String(e)
        : !e.response.data
        ? String(e)
        : !!e.response.data.message && !!e.response.data.errors
        ? (
            <div>
              <div>{e.response.data.message.toString()}</div>{" "}
              {Object.keys(e.response.data.errors).map(error => (
                <li>{e.response.data.errors[error].toString()}</li>
              ))}
            </div>
          ) || String(e)
        : String(e);

      this.setState(s => {
        return {
          ...s,
          haveError: true,
          errorMessage,
        };
      });
    }
  };

  render() {
    return (
      <ContainerIcon>
        {this.state.notificationsNotSeenOnly <= 0 ? null : (
          <Badge count={this.state.notificationsNotSeenOnly}>
            {this.state.notificationsNotSeenOnly}
          </Badge>
        )}
        <NotificationIcon color={this.props.color} />
      </ContainerIcon>
    );
  }
}

BadgeNotification.propTypes = {
  color: PropTypes.string,
};

export default BadgeNotification;

