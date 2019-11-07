import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SVG = styled.svg`
	vertical-aligin: middle;
	margin: 0 0;
`;

const Icon = props => {
	const { color, size, viewBox } = props;
	return (
		<SVG fill = { color } height = { size } width = { size } viewBox = {viewBox}>
			{ props.children }
		</SVG>
	);
};

Icon.defaultProps = {
	color: "#969696",
	size: 24,
	viewBox: '0 0 32 32'
};

Icon.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
	viewBox: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

export default Icon;
