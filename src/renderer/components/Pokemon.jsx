import React from 'react'
import styled from 'styled-components'
import {BlueContainer} from './Styles'

const Container = styled(BlueContainer)`
  line-height: 0.65;
`

const Level = styled.span`
  font-size: 15px;
`

const Pokemon = ({name, level}) => {
  return (
    <Container>
      <span>{name}</span>
      <Level>Lv. {level}</Level>
    </Container>
  )
}

export default Pokemon
