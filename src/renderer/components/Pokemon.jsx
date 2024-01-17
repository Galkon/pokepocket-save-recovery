import React from 'react'
import styled from 'styled-components'
import {BlueContainer, Colors} from './Styles'

const Pokemon = ({name, level, exp, percentageToNextLevel, speciesId, kantoId, moves, nature, ivs, evs}) => {
  return (
    <Container>
      <SpriteContainer>
        <Sprite src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${kantoId}.gif`}/>
      </SpriteContainer>
      <Info>
        <span>{name}</span>
        <Level>Lv. {level}</Level>
        <ExpContainer>
          EXP
          <ExpBar>
            <ExpFill $percentage={percentageToNextLevel}/>
          </ExpBar>
        </ExpContainer>
      </Info>
      <Hovered>
        <span>{nature}</span>
        {
          moves.filter(move => !!move.name).map(move => {
            return <span>{move.name} {move.pp}PP</span>
          })
        }
      </Hovered>
    </Container>
  )
}

export default Pokemon

const Hovered = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  padding: 4px;
  border-radius: 4px;
  outline: 1px solid black;
  border: 1px solid white;
  background-color: ${Colors.PRIMARY_DARK};
  color: white;
  font-size: 15px;
  font-family: "Pokemon", sans-serif;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.64);
`

const Container = styled(BlueContainer)`
  line-height: 0.75;
  flex-direction: row;
  gap: 6px;
  flex-grow: 1;
  height: fit-content;
  position: relative;

  ${Hovered} {
    display: none;
  }
  
  &:hover {
    ${Hovered} {
      display: flex;
    }
  }
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const Level = styled.span`
  font-size: 15px;
`

const ExpContainer = styled.div`
  display: flex;
  align-items: center;
  //background-color: rgb(81, 104, 96);
  background-color: ${Colors.PRIMARY_DARK};
  border: 1px solid black;
  color: rgb(248, 225, 47);
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 12.5px;
  gap: 5px;
  margin-top: 5px;
`

const ExpBar = styled.div`
  background-color: rgb(192, 185, 116);
  height: 3px;
  width: 100%;
  position: relative;
`

const ExpFill = styled.div`
  background-color: rgb(70, 199, 246);
  position: absolute;
  width: ${({$percentage}) => `${$percentage}%`};
  height: 100%;
`
