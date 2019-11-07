import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Input from '../atoms/Input'
import Button from '../atoms/Button'
import FileIcon from '../atoms/FileIcon'

import { LOGIN_MODE } from '../../utils/constants'

const Wrapper = styled.div`
	position: absolute;
	font-weight: bold;
  width: 200px;
  height: 200px;
  border-radius: 3px;
  border: 2px solid #EAEAEA;


	@media (max-width: 1200px) {
     
		font-weight: 500;
  }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #F9F9F9;
  width: 100%;
  height: 20%;
  color: #7A7A7A;
  padding: 3px 5px 3px 5px;
`

const Header = styled.div`
  width: 100%;
  max_width: 100%;
  overflow: hidden;
  height: 80%;
  background-color: #F3F3F3;
`

const FilePreview = styled.img`
  padding: 25px 25px 0px 25px;
  width: 80%;

`

const Title = styled.b`
`

const EditTime = styled.p`
  margin: 0;
`

const IconFile = styled.img`
  width: 20px;
  height:20px;
  display: inline-block;
  float: left;
`

const Text = styled.div`
  display: inline-block;
  float: left;
  margin-left: 5px;
`

const IconPoints = styled.img`
  height: 20px;
  display: inline-block;
  float: left;
  position: absolute;
  right: 13px;
  top: 9px;
`

class ExamPreview extends Component {
  constructor (props) {
    super(props)
    this.name = {
      name: 'archivo.exam'
    }
    this.date = {
      date: 'today'
    }
  }
  render () {
    const {
      isMobile
    } = this.props

    const {
      name
    } = this.name

    const {
      date
    } = this.date

    return (
      <Wrapper isMobile={isMobile} >
        <Header>
          <FilePreview src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6ET6NSRLnGaWpWhAmWvlwEJJmZ-Jz8jPvddx-cq5cUyboaM&s' />
        </Header>
        <Footer>
          <FileIcon />
          <Text>
            <Title>{name}</Title>
            <EditTime> Edited {date} </EditTime>
          </Text>
          <IconPoints src='http://cdn.onlinewebfonts.com/svg/download_190683.png' />
        </Footer>
      </Wrapper>

    )
  }
}
export default ExamPreview
