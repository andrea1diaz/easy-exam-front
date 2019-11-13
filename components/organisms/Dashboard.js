import React, { Component } from 'react';
import PropTypes from'prop-types';
import styled from '@emotion/styled';
import { Subscribe } from 'unstated';

import SearchBar from '../molecules/SearchBar';
import ExamPreview from '../molecules/ExamPreview';

const Section = styled.div`
	border-radius: 10px;
	background: #FFF;
	font-family: Helvetica Neue;
	font-weight: bold;
	font-size: 18px;
	color: #353660;
	padding: 20px;
	box-shadow: 5px 5px 30px #9CA1FA29;
	display: inline-block;
`;

import {
	loginRequest,
	fastRegister,
} from '../../endpoints';

const Wrapper = styled.div`
	background: #F3F2F7;
`;

class Dashboard extends Component {
	render() {
		return (
			<Wrapper>
				<div
					css={css`width:95%; margin: 30px auto`}
				>
					<SearchBar/>
				</div>

				<Section
					css={css`width:45%; height: 60vh; margin-left:2.5%`}
				>
					<div
						css={css`width:100%; height: 50px`}
					>
						Recent Exams
					</div>
					<ExamPreview img = "../../static/img/user-profile.svg" name="Exam 1" date="Today"/>
				</Section>

				<Section
					css={css`width:40%; height: 60vh; margin-left:4%`}
				>
					<div>
						Questions
					</div>
					
				</Section>
			</Wrapper>
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;
