import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'

const propTypes = {
  file: PropTypes.object
}

const FileSelector = ({file, onSelect}) => {
  const inputRef = useRef()
  const handleFileInput = (event) => {
    const file = event.target.files[0]
    if (file) {
      onSelect(file)
    }
  }
  const onClick = (e) => {
    e.stopPropagation()
    inputRef.current.click()
  }
  return (
    <Container onClick={onClick} $chosen={!!file?.name?.length}>
      <Text $placeholder={!file}>
        {file?.name?.length ? file.name : 'Click to choose .sta file'}
      </Text>
      <HiddenFileInput
        ref={inputRef}
        type="file"
        accept=".sta"
        onChange={handleFileInput}
      />
    </Container>
  )
}

FileSelector.propTypes = propTypes

export default FileSelector

const HiddenFileInput = styled.input`
  display: none;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #275068;
  border: 2px ${({$chosen}) => $chosen ? 'solid' : 'dashed'} rgba(225, 216, 224);
  box-shadow: 0 0 0 1px black;
  border-radius: 3px;
  padding: 8px 12px;
  //padding-inline-start: 12px;
  gap: 12px;
  cursor: pointer;
  text-wrap: pretty;

  &:hover {
    border-color: white;
    outline-color: rgb(255, 205, 84);
  }
`

const Text = styled.span`
  width: 100%;
  text-align: center;
  color: ${({$placeholder}) => $placeholder ? 'rgba(255, 255, 255, 0.64)' : 'rgb(248, 248, 284)'};
  text-shadow: 1px 1px 0px rgb(104, 88, 112);
  text-overflow: ellipsis;
  overflow: hidden;
`
