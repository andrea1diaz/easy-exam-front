import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

import * as animationData from '../../lottie/LoadingSemiCircle';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  background-color: #000b;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
  animation: ${fadeAnimation} 0.2s ease-in;
  z-index: 130;
  display: ${props => (!props.active ? 'none' : 'flex')};
  ::after {
    filter: blur(10px);
  }
`;

const LoaderCard = styled.div`
  padding: 10px 0 40px 0;
  background-color: transparent;
  display: flex;
  flex-flow: column;
  font-family: 'SFProDisplay', sans-serif;
  font-size: 1em;
  font-weight: 300;
  animation: ${fadeAnimation} 0.4s ease-in;
  z-index: 14;
  border-radius: 10px;
  color: white;
  text-align: center;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = (props) => {
  return (
    <Wrapper active={props.active}>
      <LoaderCard>
        <Lottie
          options={defaultOptions}
          height={380}
          width={380}
          isPaused={!props.active}
          style={{ marginBottom: '-40px' }}
          speed={2}
        />
        {/*Cargando, espere por favor*/}
      </LoaderCard>
    </Wrapper>
  );
};

Loading.propTypes = {
  active: PropTypes.bool,
};

export default Loading;

