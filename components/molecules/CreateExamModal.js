import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import CloseIcon from '../atoms/CloseIcon';
import HyphenIcon from '../atoms/HyphenIcon';

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
  max-width: 700px;
  min-height: 480px;
  margin: 0 auto;
  padding: 30px 50px;
`;

const Line = styled.hr`
  background-color: #23246E;
  border: none;
  border-radius: 20px;
  height: 3px;
  margin-bottom: 12px;
`;

const Label = styled.p`
  font-size: 18px;
  margin 15px 0 5px 0;
`;

const Input = styled.input`
  font-family: Helvetica;
  font-size: 16px;
  border-radius: 10px;
  border-style: solid;
  border-color: #DCDCDC;
  border-width: 2px;
  background-color: #FAFAFA;
  width: 95%;
  height: 20px;
  padding: 10px 0 12px 10px;
  margin: 0 0 15px 0;
  color: #787878;
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

const IconButton = styled.button`
  border: none;
  background-color: transparent;
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 45% 10% 45%;

  @media (max-width: 600px) {
	  grid-template-columns: 100%;
	}
`;

const Column = styled.div`
`;

const Header = styled.div`
  margin-top: 20px;
`;

const HeaderTitle = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 95% 5%;
`;

const DateGradingRow = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 50% 15% 35%;
`;

const TimeRow = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 40% 20% 40%;
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
      keywords: '',
      timeStart: '',
      timeEnd: '',
      date: null,
      grading: 0,
		}
	}

  createExam = () => {
    this.props.onRequestClose()
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

	render() {
    if (!this.props.isOpen) {
      return null;
    }

		return (
      <Backdrop>
        <Modal>
          <Header>
              <HeaderTitle>
                <Title>Create new exam</Title>
                <IconButton onClick={() => this.props.onRequestClose()}>
                  <CloseIcon color='#23246E' size='28' viewBox='0 0 512 512' />
                </IconButton>
              </HeaderTitle>
              <Line/>
          </Header>
          <Body>
            <Column>
              <Label>Title</Label> 
              <Input
                type="text"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <Label>Course</Label> 
              <Input
                type="text"
                value={this.state.course}
                onChange={this.handleInputChange}
              />
              <Label>College</Label> 
              <Input
                type="text"
                value={this.state.college}
                onChange={this.handleInputChange}
              />
              <Label>Time</Label> 
              <TimeRow>
                <Column>
                  <Input
                    type="text"
                    value={this.state.timeStart}
                    onChange={this.handleInputChange}
                    placeholder="Start"
                  />
                </Column>
                <Column style={{padding: '15px 26px'}}>
                  <HyphenIcon color='#505050' size='28' viewBox='0 0 512 512'/>
                </Column>
                <Column>
                  <Input
                    type="text"
                    value={this.state.timeEnd}
                    onChange={this.handleInputChange}
                    placeholder="End"
                  />
                </Column>
              </TimeRow>
              <DateGradingRow>
                <Column>
                  <Label>Date</Label> 
                  <Input
                    type="date"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </Column>
                <Column/>
                <Column>
                  <Label>Grading</Label>
                  <Input
                    type="number"
                    value={this.state.grading}
                    onChange={this.handleInputChange}
                  />
                </Column>
              </DateGradingRow>
    	      </Column>
            <Column/>
            <Column>
              <Label>Teacher's name</Label> 
              <Input
                type="text"
                value={this.state.teacherName}
                onChange={this.handleInputChange}
              />
              <Label>Course's code</Label> 
              <Input
                type="text"
                value={this.state.courseCode}
                onChange={this.handleInputChange}
              />
              <Label>Keywords</Label> 
              <Input
                type="text"
                value={this.state.keywords}
                onChange={this.handleInputChange}
                style={{
                  height: '125px'
                }}
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
