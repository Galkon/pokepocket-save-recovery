import React from 'react'
import styled from 'styled-components'
import {BlueContainer} from './Styles'

const Pokemon = ({name, level, speciesId, kantoId}) => {
  return (
    <Container>
      {/*<span className={`pokesprite pokemon ${name.toLowerCase()}`}/>*/}
      <SpriteContainer>
        <Sprite src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${kantoId}.gif`}/>
      </SpriteContainer>
      <Text>
        <span>{name}</span>
        <Level>Lv. {level}</Level>
      </Text>
    </Container>
  )
}

export default Pokemon

const Container = styled(BlueContainer)`
  line-height: 0.75;
  flex-direction: row;
  gap: 6px;
`

const spriteSize = 48
const SpriteContainer = styled.div`
  width: ${spriteSize}px;
  height: ${spriteSize}px;
`

const Sprite = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Level = styled.span`
  font-size: 15px;
`
