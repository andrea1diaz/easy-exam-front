import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const BackArrowIcon = (props) => {
  const { color, size } = props;
  return (
    <Icon color={color} size={size}>
      <polygon points="6.55125328 17.3333333 15.5726572 25.6884239 13.7606761 27.6449094 0.913289268 15.7464198 13.7820701 4.33570281 15.5512633 6.33096385 6.15042262 14.6666667 30 14.6666667 30 17.3333333" />
    </Icon>
  );
};

BackArrowIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default BackArrowIcon;

