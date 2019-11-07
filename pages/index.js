import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Subscribe } from 'unstated';

import AuthContainer from '../containers/authContainer'
import LogIn from './LogIn';
import SearchBar from '../components/molecules/SearchBar';

class Index extends Component {
	render () {
		return (
			/* <Subscribe to={[AuthContainer]}>
				{authState => {
					this.authState = authState;
					return (
						<div>
						</div>
					)
				}
				}
				<LogIn />
			</Subscribe>
			*/
			<SearchBar />
		)
	}
}

export default Index;
