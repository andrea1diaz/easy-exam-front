import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from '../organisms/TopBar';
import BottomBar from '../organisms/BottomBar';
import ConfirmDialog from '../atoms/ConfirmDialog';
import { MAX_PAGE_TOP_TO_CHANGE_TOOLBAR } from '../../utils/constants';
import styled from 'styled-components';

const WrapperBody = styled.div`
	//padding: 0 15%;
	//display: flex;
	//justify-content: center;
`;

class BasicLayout extends Component {
	state = {
		confirmDialogActive: false,
		pageYOffset: 0
	};

	openConfirmDialog = () => {
		this.setState(s => {
			return { ...s, confirmDialogActive: true };
		});
	};

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
		this.setState(s => {
			return { ...s, pageYOffset: window.pageYOffset };
		});
	};

	render() {
		return (
			<div>
				<TopBar
					title={this.props.title}
					onTapTitle={this.props.onTapTitle}
					withBack={this.props.withBack}
					userData={this.props.userData}
					withProfile
					onClickPhoto={this.openConfirmDialog}
					withShadow={this.state.pageYOffset > MAX_PAGE_TOP_TO_CHANGE_TOOLBAR}
					withCart={true}
				/>
				<WrapperBody>{this.props.children}</WrapperBody>
				<BottomBar
					onLogout={this.props.onLogout}
					isMobile={this.props.isMobile}
					pathname={this.props.pathname}
					userData={this.props.userData}
					small={!this.props.isMobile}
				/>
			</div>
		);
	}
}

BasicLayout.propTypes = {
	title: PropTypes.string.isRequired,
	pathname: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
	isMobile: PropTypes.bool,
	userData: PropTypes.object, // TODO: Add this important prop to another layouts
	withBack: PropTypes.bool,
	onLogout: PropTypes.func,
	onTapTitle: PropTypes.func
};

export default BasicLayout;
