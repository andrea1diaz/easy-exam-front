import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import styled from '@emotion/styled'

import WaveOne from '../components/atoms/WaveOne'
import LoginCard from '../components/molecules/LoginCard'
import ExamPreview from '../components/molecules/ExamPreview'
import { loginRequest } from '../endpoints/index'

const Wrapper = styled.div`
	@media (max-width: 1200px) {
			color: white;
		}
`

class LogIn extends Component {
  render () {
    return (
      <Wrapper>
        <WaveOne />
        <LoginCard onLogin={async (email, password) => {
          const response = await loginRequest({ email: email, password: password },
            { headers: { 'Content-Type': 'application/json' } })
          console.log(response.data)
        }} />
      </Wrapper>
    )
  }
}

export default LogIn
