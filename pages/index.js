import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Router from 'next/router';
import { Subscribe } from 'unstated';

import AuthContainer from '../containers/authContainer'
import CreateExamModal from '../components/molecules/CreateExamModal';

Modal.setAppElement('#createExamModal')

class Index extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

	render () {
		return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <CreateExamModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        />
      </div>
		)
	}
}

export default Index;
