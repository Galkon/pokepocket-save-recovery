import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Colors} from './Styles'

const propTypes = {
  file: PropTypes.object,
  onSelect: PropTypes.func,
  label: PropTypes.string,
  accept: PropTypes.string,
  width: PropTypes.string
}

const FileSelector = ({file, label, onSelect, accept, width}) => {
  const inputRef = useRef()
  const isFileSelected = file?.name?.length > 0
  const handleFileInput = (event) => {
    const file = event.target.files[0]
    if (file) {
      onSelect(file)
    }
  }
  const onClick = async (e) => {
    e.stopPropagation()

    // try {
    //   const files = await window.showOpenFilePicker({
    //     id: 'sav-location',
    //     types: [
    //       {
    //         accept: {
    //           'application/octet-stream': ['.sav', '.sta']
    //         },
    //         description: 'Pokemon .sav file or Analogue Pocket .sta file'
    //       },
    //     ]
    //   })
    //   const file = await files[0].getFile()
    //   console.log('selected file:', file)
    // } catch (err) {
    //   console.error(err)
    // }
    inputRef.current.click()
  }
  return (
    <Container onClick={onClick} $chosen={isFileSelected} $width={width}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1222_2394)">
          <path
            d="M6.12675 0.805269C5.85595 0.599465 5.52332 0.491851 5.18345 0.499936H1.5C1.10218 0.499936 0.720644 0.657971 0.43934 0.939276C0.158035 1.22058 0 1.60211 0 1.99994V11.9999C0 12.3978 0.158035 12.7793 0.43934 13.0606C0.720644 13.3419 1.10217 13.4999 1.5 13.4999H12.5C12.8978 13.4999 13.2794 13.3419 13.5607 13.0606C13.842 12.7793 14 12.3978 14 11.9999V3.99994C14 3.60211 13.842 3.22058 13.5607 2.93928C13.2794 2.65797 12.8978 2.49994 12.5 2.49994H6.89039L6.67544 1.64015C6.5932 1.30766 6.39945 1.01253 6.12675 0.805269Z"
            fill={file?.name?.length ? 'white' : 'rgba(255, 255, 255, 0.48)'}
          />
        </g>
        <defs>
          <clipPath id="clip0_1222_2394">
            <rect width="14" height="14" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <Text $placeholder={!file}>
        {isFileSelected ? file.name : (label ?? 'Choose a file')}
      </Text>
      {
        !isFileSelected &&
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(90deg)', marginInlineStart: 'auto'}}>
          <g clipPath="url(#clip0_1222_1964)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.64646 0.146447C6.84172 -0.0488156 7.1583 -0.0488156 7.35356 0.146447L10.8536 3.64645C10.9966 3.78945 11.0393 4.0045 10.9619 4.19134C10.8845 4.37818 10.7022 4.5 10.5 4.5H8.00001V13C8.00001 13.5523 7.55229 14 7.00001 14C6.44772 14 6.00001 13.5523 6.00001 13V4.5H3.50001C3.29778 4.5 3.11546 4.37818 3.03807 4.19134C2.96068 4.0045 3.00346 3.78945 3.14646 3.64645L6.64646 0.146447Z"
              fill="rgba(255, 255, 255, 0.48)"
            />
          </g>
          <defs>
            <clipPath id="clip0_1222_1964">
              <rect width="14" height="14" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      }
      <HiddenFileInput
        type="file"
        ref={inputRef}
        accept={accept}
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
  background-color: ${Colors.PRIMARY_DARKER};
  border: 1px ${({$chosen}) => $chosen ? 'solid' : 'dashed'} rgba(255, 255, 255, 0.48);
  outline: 1px solid black;
  border-radius: 5px;
  padding: 0px 8px;
  height: 32px;
  gap: 8px;
  cursor: pointer;
  ${({$width}) => $width ? `min-width: ${$width}; max-width: ${$width};` : ''}

  &:hover {
    border-color: white;
  }
  
  svg {
    flex-shrink: 0;
  }
`

const Text = styled.span`
  text-align: center;
  color: ${({$placeholder}) => $placeholder ? 'rgba(255, 255, 255, 0.64)' : 'rgb(248, 248, 284)'};
  //text-shadow: 1px 1px 0px rgb(104, 88, 112);
  font-family: "Pokemon", sans-serif;
  -webkit-font-smoothing: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
`
