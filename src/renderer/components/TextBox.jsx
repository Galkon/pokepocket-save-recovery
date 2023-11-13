import React from 'react'
import styled from 'styled-components'
import {TextContainer} from './Styles'

const Container = styled(TextContainer)`
  width: auto;
`

const TextBox = ({children, type}) => {
  return (
    <Container $type={type}>
      {children}
    </Container>
  )
}

export default TextBox
