import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const HyphenIcon = props => {
	const { color, size, viewBox } = props;
	return (
		<Icon color={color} size={size} viewBox={viewBox}>
			<path d="M357,204H0v-51h357V204" />
		</Icon>
	);
};

HyphenIcon.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
  viewBox: PropTypes.string
};

export default HyphenIcon;
