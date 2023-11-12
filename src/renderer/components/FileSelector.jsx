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
    <Container onClick={onClick}>
      <Text $placeholder={!file}>
        {file?.name?.length ? file.name : 'Choose a .sta file'}
      </Text>
      <Button onClick={onClick}>
        Choose File
      </Button>
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
  min-width: 400px;
  background-color: #142631;
  border: 1px solid rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  padding: 2px;
  padding-inline-start: 12px;
  gap: 12px;
  cursor: pointer;
  white-space: nowrap;
  max-width: 90vw;
  //box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.64);

  &:hover {
    //background-color: rgba(0, 0, 0, 0.48);
    border-color: #5b8098;
  }
`

const Text = styled.span`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: ${({$placeholder}) => $placeholder ? 'rgba(255, 255, 255, 0.32)' : 'rgba(255, 255, 255, 0.64)'};
  text-overflow: ellipsis;
  overflow: hidden;
`
