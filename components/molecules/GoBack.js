import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const GoBack = (props) => {
  return (
    <Wrapper onClick={props.onBack ? props.onBack : () => Router.back()}>
      {props.children}
    </Wrapper>
  );
};

GoBack.propTypes = {
  children: PropTypes.element.isRequired,
  onBack: PropTypes.func,
};

export default GoBack;
