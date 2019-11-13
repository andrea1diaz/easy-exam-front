import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Button from '../atoms/Button';
import SearchIcon from '../atoms/SearchIcon';
import BellIcon from '../atoms/BellIcon';
import Input from '../atoms/Input';

const Wrapper = styled.div`
`;

const SearchBarWrapper = styled.div`
	padding: 10px;
	display: block;
	background: #FFFFFF;
	height: 40px;
	border-radius: 5px;
	box-shadow: 1px 1px 10px #555;
	vertical-align: middle;
	position: relative;
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
			isMobile, onChangeFields, onSearch
		} = this.props;
		const { searchValue } = this.state;

		return (
			<Wrapper isMobile={isMobile}>
				<SearchBarWrapper>
					<div
						onClick={onSearch}
						color="#FD7576"
						fontColor="#FFFFFF"
						css= {css`position: absolute; top: 20px; left: 20px;`}
					>
						<SearchIcon size='22' viewBox='0 0 64 64' />
					</div>
					<div
						css= {css`position: absolute; width: 80%; left: 50px;`}
					>	
						<Input
							name="searchBar"
							type="text"
							value={searchValue}
							placeholder="search..."
							onChange={async v => {
											await this.setState(s => {
												return { ...s, searchValue: v };
											});
											onChangeFields({
												searchValue: { searchValue },
											});
							}}
						/>
					</div>
					<div
						color="#FD7576"
						fontColor="#FFFFFF"
						css= {css`position: absolute; top: 10px; right: 10px; font-size: 15px`}
					>
						<div
							color="#FD7576"
							fontColor="#FFFFFF"
							css= {css`position: absolute; top: 10px; right: 170px`}
						>
							<BellIcon size='22' viewBox='0 0 512 512' />
						</div>
						<div
							css= {css`height: 40px; border-left: 1px solid #CCC; position: absolute; right: 150px`}
						/>
						<span
							css = {css`display: inline-block; margin-right: 10px; position: absolute; top: 13px; right: 55px;`}
						>
							Name
						</span>
						<img src="static/img/user-profile.svg" 
							css= {css`display: inline-block; width: 35px; position: absolute; right: 5px; border: solid #67B5D6; border-radius: 100%`}
						/>
					</div>
				</SearchBarWrapper>
			</Wrapper>
		);
	}
}

SearchBar.defaultProps = {
	onChangeFields: () => {},
	onSearch: () => {},
	isMobile: false,
};

SearchBar.propTypes = {
	isMobile: PropTypes.bool,
	onChangeFields: PropTypes.func,
	onSearch: PropTypes.func,
};

export default SearchBar;
