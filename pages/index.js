import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Subscribe } from 'unstated';

import AuthContainer from '../containers/authContainer'
import LogIn from './LogIn';

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
			<LogIn />
		)
	}
}

export default Index;
