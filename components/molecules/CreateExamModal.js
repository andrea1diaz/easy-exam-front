import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import CloseIcon from '../atoms/CloseIcon';

const Title = styled.div`
	font-size: 25px;
  font-weight: bold;
  color: #23246E;
	padding: 0 0 1px 2px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.3);
  padding: 50px;
`;

const Modal = styled.div`
  background-color: #F3F3F6;
  border-radius: 40px;
  max-width: 740px;
  min-height: 435px;
  margin: 0 auto;
  padding: 30px 50px;
`;

const Line = styled.hr`
  background-color: #23246E;
  border: none;
  border-radius: 20px;
  height: 3px;
`;

const Label = styled.p`
  font-size: 18px;
  margin 15px 0 5px 0;
`;

const Input = styled.input`
  border-radius: 10px;
  border-style: solid;
  border-color: #DCDCDC;
  border-width: 2px;
  width: 95%;
  padding: 10px 0 12px 10px;
  margin: 0 0 15px 0;
`;

const Button = styled.button`
  background-color: #23246E;
	color: #FFFFFF;
  border: none;
  border-radius: 14px;
  padding: 10px 21px;
  margin: 35px 0 0 0;
  font-size: 25px;
  float: right;
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 47% 6% 47%;

  @media (max-width: 600px) {
	  grid-template-columns: 100%;
	}
`;

const Column = styled.div`
`;

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
		}
	}

  createExam = () => {
    this.props.onRequestClose()
  }

	render() {
    if (!this.props.isOpen) {
      return null;
    }

		return (
      <Backdrop>
        <Modal>
          <div>
              <div>
                <Title>Create new exam</Title>
              </div>
              <CloseIcon color='#23246E' size='22' viewBox='0 0 512 512' />
              <Line/>
          </div>
          <Body>
            <Column>
              <Label>Title</Label> 
              <Input
                type="text"
              />
              <Label>Course</Label> 
              <Input
                type="text"
              />
              <Label>College</Label> 
              <Input
                type="text"
              />
              <Label>Date</Label> 
              <Input
                type="text"
              />
    	      </Column>
            <Column/>
            <Column>
              <Label>Teacher's name</Label> 
              <Input
                type="text"
              />
              <Label>Course's code</Label> 
              <Input
                type="text"
              />
              <Label>Keywords</Label> 
              <Input
                type="text"
              />
			  	    <Button
                onClick={this.createExam}
              >
					      Create
				      </Button>
            </Column>
          </Body>
        </Modal>
      </Backdrop>
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
