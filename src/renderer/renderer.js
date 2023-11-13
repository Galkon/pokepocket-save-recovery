import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client';
import styled from 'styled-components'
import Pikachu from './icons/Pikachu'
import FileSelector from './components/FileSelector'
import Button from './components/Button'
import TextBox from './components/TextBox'
import Trainer from './components/Trainer'

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 32px;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  justify-content: center;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  max-width: 600px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
`

const App = () => {
  const [inputFile, setInputFile] = useState(null)
  const [outputFile, setOutputFile] = useState(null)
  const [pkmnSave, setPkmnSave] = useState(null)
  const [error, setError] = useState(null)

  const onClickConvert = () => {
    window.ipc.send('convert-to-sav', {
      name: inputFile.name,
      path: inputFile.path,
      size: inputFile.size,
      lastModified: inputFile.lastModified,
      lastModifiedDate: inputFile.lastModifiedDate,
      overwrite: false
    });
  }
  useEffect(() => {
    const onSuccess = (filePath, save) => {
      setOutputFile(filePath)
      setPkmnSave(save)
      setError(null)
    }
    const onError = (err, outputFile) => {
      setOutputFile(outputFile)
      setError(err)
    }

    window.ipc.on('convert-success', onSuccess)
    window.ipc.on('convert-error', onError)

    return () => {
      window.ipc.off('convert-success', onSuccess)
      window.ipc.off('convert-error', onError)
    }
  }, [])
  return (
    <Body>
      <Header>
        <Pikachu size={64}/>
        PokePocket Save Recovery
        <Pikachu size={64}/>
      </Header>
      <Container>
        <Trainer
          {...pkmnSave}
        />
        <Form>
          <FileSelector
            file={inputFile}
            onSelect={setInputFile}
          />
          {
            inputFile &&
            <Button onClick={onClickConvert}>
              Convert to .sav file
            </Button>
          }
          <TextBox type={error?.length ? 'error' : (outputFile ? 'success' : '')}>
            {
              !outputFile && !error?.length &&
              <span>
            <strong>Notice:</strong><br/>This only works with Gen 3 games: Fire Red, Leaf Green, Sapphire, Ruby, Emerald
          </span>
            }
            {
              outputFile && !error?.length &&
              <span>
            Converted to .sav file:
            <br/><br/>{outputFile}
          </span>
            }
            {
              error?.length &&
              (outputFile ? <span>{error}<br/><br/>{outputFile}</span> : error)
            }
          </TextBox>
        </Form>
      </Container>
    </Body>
  )
}

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
