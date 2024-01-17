import React, {useContext} from 'react'
import styled from 'styled-components'
import {Colors} from '../components/Styles'
import Pikachu from '../icons/Pikachu'
import FileSelector from '../components/FileSelector'
import {FilesContext} from '../contexts/contexts'
import Viewport from './Viewport'
import Button from '../components/Button'

const Layout = () => {
  const {inputFile, loadInputFile} = useContext(FilesContext)

  const onClickSave = () => {
    window.ipc.send('export-save', {
      name: inputFile.name,
      path: inputFile.path,
      size: inputFile.size,
      lastModified: inputFile.lastModified,
      lastModifiedDate: inputFile.lastModifiedDate,
    })
  }

  return (
    <Page>
      <Navigation>
        <Header>
          <Pikachu size={64}/>
          PokePocket Save Recovery
        </Header>
        <FileSelector
          label="Choose an .sta or .sav file"
          accept=".sta,.sav"
          width="250px"
          file={inputFile}
          onSelect={loadInputFile}
        />
        {
          inputFile?.name?.endsWith('.sta') &&
          <Button onClick={onClickSave}>
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.875 1H2.5C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V13.5C1 13.8978 1.15804 14.2794 1.43934 14.5607C1.72064 14.842 2.10217 15 2.5 15H11.5C11.8978 15 12.2794 14.842 12.5607 14.5607C12.842 14.2794 13 13.8978 13 13.5V6.125H8.5C8.15482 6.125 7.875 5.84518 7.875 5.5V1ZM12.5821 4.875L9.125 1.41789V4.875H12.5821Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.875 0H1.5C1.10218 0 0.72064 0.158035 0.43934 0.43934C0.15804 0.720644 0 1.10218 0 1.5V12.5C0 12.8978 0.15804 13.2794 0.43934 13.5607C0.72064 13.842 1.10217 14 1.5 14H10.5C10.8978 14 11.2794 13.842 11.5607 13.5607C11.842 13.2794 12 12.8978 12 12.5V5.125H7.5C7.15482 5.125 6.875 4.84518 6.875 4.5V0ZM11.5821 3.875L8.125 0.417893V3.875H11.5821Z"
                fill="white"
              />
            </svg>
            Export
          </Button>
        }
      </Navigation>
      <Body>
        <Viewport/>
      </Body>
    </Page>
  )
}

export default Layout

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  background-color: ${Colors.PRIMARY_DARK};
  border-bottom: 1px solid rgba(0, 0, 0, 0.48);
  padding-inline-end: 12px;
  gap: 6px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px black;
  margin-inline-end: auto;
`

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${Colors.PRIMARY_DARKER};
`
