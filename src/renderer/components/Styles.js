import styled from 'styled-components'

export const Colors = {
  PRIMARY_DARKER: '#12334d',
  PRIMARY_DARK: '#184a73',
  PRIMARY_MEDIUM: 'rgb(56, 144, 216)',
  PRIMARY_LIGHT: 'rgb(128, 191, 216)'
}

export const BlueContainer = styled.div`
  outline: 1px solid rgba(72, 71, 96);
  border: 1px solid rgba(128, 191, 216);
  box-shadow: 0 0 0 1px black;
  border-radius: 2px;
  color: white;
  padding: 2px 4px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(56, 144, 216) 65%, rgba(128, 191, 216) 100%); // Replace with the exact color codes from the image
  font-family: "Pokemon", sans-serif;
  font-size: 15px;
  text-shadow: 1px 1px black;
  -webkit-font-smoothing: none;
`

export const TextContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  font-weight: ${({$type}) => $type ? '500' : 'normal'};
  max-width: 90vw;
  overflow-wrap: anywhere;
  color: ${({$type}) => $type === 'error' ? '#ff5555' : ($type === 'success' ? '#60ffa0' : 'white')};
  background-color: #275068;
  border: 2px solid rgba(225, 216, 224);
  outline: 3px solid rgba(200, 162, 72);
  box-shadow: 0 0 0 4px black;
  border-radius: 2px;
  margin: 4px;
  width: fit-content;
  height: fit-content;
  font-family: "Pokemon", sans-serif;
  font-size: 15px;
  text-shadow: 1px 1px black;
  -webkit-font-smoothing: none;
`
