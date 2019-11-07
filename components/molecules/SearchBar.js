import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Button from '../atoms/Button';
import SearchIcon from '../atoms/SearchIcon';

const Wrapper = styled.div`
`;

const SearchBarWrapper = styled.div`
	display: block;
	background: #FFFFFF;
	border-radius: 10px;
	box-shadow: 1px 1px 10px #555;
`;

const Input = styled.input`
	padding: 8px;
	font-size: 1.5em;
	font-weight: bold;
	border: 0;
	outline: none;
	width: 80%;
	color: #67707D;
`;

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
		};
	}

	render() {
		const {
			isMobile, onChangeFields, onLogIn,
			onForgotPassword, onSignUp,
		} = this.props;
		const { searchValue } = this.state;

		return (
			<Wrapper isMobile={isMobile}>
				<SearchBarWrapper>
					<div
						onClick={onLogIn}
						color="#FD7576"
						fontColor="#FFFFFF"
						css= {css`padding: 5px; display: inline-block`}
					>
						<SearchIcon size='20' viewBox='0 0 64 64' />
					</div>
					<Input
						name="searchBar"
						type="text"
						value={searchValue}
						placeholder="search..."
						css= {css`padding: 5px; display: inline`}
						onChange={async v => {
										await this.setState(s => {
											return { ...s, searchValue: v };
										});
										onChangeFields({
											searchValue: { searchValue },
										});
						}}
					/>
				</SearchBarWrapper>
			</Wrapper>
		);
	}
}

SearchBar.defaultProps = {
	onChangeFields: () => {},
	isMobile: false,
};

SearchBar.propTypes = {
	isMobile: PropTypes.bool,
	onChangeFields: PropTypes.func,
	onForgotPassword: PropTypes.func,
	onLogIn: PropTypes.func,
	onSignUp: PropTypes.func,
};

export default SearchBar;
