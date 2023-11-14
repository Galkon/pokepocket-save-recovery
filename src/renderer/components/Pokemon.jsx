import React from 'react'
import styled from 'styled-components'
import {BlueContainer} from './Styles'

const Container = styled(BlueContainer)`
  line-height: 0.65;
  flex-direction: row;
  gap: 6px;
  
  img {
    height: 36px;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Level = styled.span`
  font-size: 15px;
`

const Pokemon = ({name, level, speciesId, kantoId}) => {
  return (
    <Container>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${kantoId}.png`}/>
      <Text>
        <span>{name}</span>
        <Level>Lv. {level}</Level>
      </Text>
    </Container>
  )
}

export default Pokemon
