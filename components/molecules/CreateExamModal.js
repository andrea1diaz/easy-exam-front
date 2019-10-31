import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

const InputWrapper = styled.div`
	 padding: 0 0 45px 0;
`;

const ButtonWrapper = styled.div`
	padding: 10px 0 0 0;
`;

const Title = styled.div`
	font-size: 45px;
	padding: 0 0 50px 0;

	@media (max-width: 1200px) {
		font-size: 25px;
	}
`;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CreateExamModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
      teacherName: '',
      course: '',
      courseCode: '',
      college: '',
      keywords: [],
      time: 0,
      date: null,
		};
	}

  createExam() {
    this.props.onRequestClose();   
  }

	render() {
		return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
      >
        <Title>Create new exam</Title>
        <InputWrapper>
				  <Input
            name="Title"
						type="text"
						value={this.state.title}
          />
				</InputWrapper>
    	  <ButtonWrapper>
			  	<Button
				  	onClick={this.createExam}
				  	color="#FD7576"
			  		fontColor="#FFFFFF"
					>
					  Create
				  </Button>
			  </ButtonWrapper>
      </Modal>
		);
	}
}

CreateExamModal.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
};

CreateExamModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default CreateExamModal;
