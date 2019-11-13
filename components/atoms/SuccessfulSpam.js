import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Button from './Button';

const Wrapper = styled.div`
  top: 0;
  left: 0;
  background-color: #222222aa;
  width: 100%;
  height: 100%;
  position: fixed;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 129;
  display: ${props => (!props.active ? "none" : "flex")};
`;

const MessageCard = styled.div`
  padding: 20px;
  background: white; // #f6f7f9;
  display: flex;
  flex-flow: column;
  max-width: ${props => (!props.isMobile ? "50vw" : "95vw")};
  font-size: 16px;
  z-index: 14;
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  color: #4a4a4a;
  margin-top: 8px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Message = styled.div`
  font-size: 16px;
  color: #4a4a4a;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  ${props => {
    if (props.activeEllipsis) {
      return css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    }
  }}
`;

const SuccessfulSpam = (props) => {
	return (
		<Wrapper active={props.active}>
      <MessageCard isMobile={props.isMobile}>
        <div style={{ textAlign: "center" }}>
          <Lottie
            options={defaultOptions}
            height={130}
            width={130}
            isStopped={!props.active}
            // isPaused={!props.active}
          />
        </div>
        <Title>{props.title || ''}</Title>
        <Message activeEllipsis={props.activeEllipsis}>{props.message}</Message>
        <div style={{ width: "100%" }}>
          <Button
            backgroundColor="#01E19F"
            size="medium"
            onClick={props.onAccept}
            expanded
          >
            Aceptar
          </Button>
        </div>
      </MessageCard>
		</Wrapper>
	);
};

SuccessfulSpam.defaultProps = {
	loop: false,
	autoplay: true,
	rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

SuccessfulSpam.propTypes = {
  active: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
  ]),
  onAccept: PropTypes.func.isRequired,
  activeEllipsis: PropTypes.bool
};

export default SuccessfulSpam;

