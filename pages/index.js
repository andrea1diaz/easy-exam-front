import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Subscribe } from 'unstated';

import AuthContainer from '../containers/authContainer'
import CreateExamModal from '../components/molecules/CreateExamModal';


class Index extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

	render () {
		return (
      <div>
        <button onClick={this.toggleModal}>Open Modal</button>
        <CreateExamModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
        />
      </div>
		)
	}
}

export default Index;
