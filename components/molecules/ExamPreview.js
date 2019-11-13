import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Input from '../atoms/Input'
import Button from '../atoms/Button'
import FileIcon from '../atoms/FileIcon'
import VerticalDots from '../atoms/VerticalDots'

import { LOGIN_MODE } from '../../utils/constants'

const Wrapper = styled.div`
	position: absolute;
  width: 200px;
  height: 160px;
  border-radius: 15px;
  border: 2px solid #EAEAEA;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 75% 25%;
`

const Header = styled.div`
  overflow: hidden;
  border-radius: 15px 15px 0px 0px;
  background-color: #F3F3F3;
  justify-self: stretch;
  align-self: stretch;
`

const Footer = styled.div`
  background-color: #F9F9F9;
  color: #7A7A7A;
  padding: 3px 10px 3px 14px;
  border-radius: 0px 0px 15px 15px;
  justify-self: stretch;
  align-self: stretch;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 100%;
`

const FilePreview = styled.img`
  justify-self: center;
  align-self: center;
	display: block;
	width: -webkit-fill-available;
  border-radius: 15px 15px 0px 0px;
  border: 2px solid #EAEAEA;
  margin: 12px 12px 0px 12px;
`

const Title = styled.p`
	font-weight: bold;
	font-size: 9px;
	text-overflow: ellipsis;
	margin: 0;
	overflow: hidden;
	white-space: nowrap;
`

const EditTime = styled.p`
  margin: 0;
	font-size: 8px;
`

const Text = styled.div`
  justify-self: stretch;
  align-self: stretch;
	margin: auto 0px auto 5px;
	display: block;
`

const IconPoints = styled.img`
  justify-self: center;
  align-self: center;
  height: 20px;
  right: 13px;
  top: 9px;
`

class ExamPreview extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Wrapper isMobile={this.props.isMobile} >
        <Header>
          <FilePreview src={this.props.img} />
        </Header>
        <Footer>
          <FileIcon color='#4C87D2' style={{
            height: '20px',
            width: 'auto',
            margin: 'auto',
            display: 'block'
          }} viewBox='0 0 21.527 27.399' />
          <Text>
            <Title>{this.props.name}</Title>
            <EditTime> Edited {this.props.date} </EditTime>
          </Text>
          <VerticalDots viewBox='0 0 6 26' style={{
            width: '4',
            height: '16',
            margin: 'auto',
            display: 'block'
          }} innerStyle={{ 'fill': '#969696' }} />
        </Footer>
      </Wrapper>

    )
  }
}
export default ExamPreview
