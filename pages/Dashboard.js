import React, { Component } from 'react';
import styled from '@emotion/styled';

import SearchBar from '../components/molecules/SearchBar';

const Wrapper = styled.div`
`;

class Dashboard extends Component {
	render () {
		return (
			<Wrapper>
				<div>
					<SearchBar/>
				</div>
			</Wrapper>
		);
	}
}

export default Dashboard;
