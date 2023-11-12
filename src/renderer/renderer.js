import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Pikachu from './icons/Pikachu'
import FileSelector from './components/FileSelector'
import Button from './components/Button'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 16px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
`

const Notice = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.32);
  font-size: 12px;
  font-weight: normal;
  color: ${({$state}) => $state === 'error' ? '#ff5555' : ($state === 'success' ? '#60ffa0' : 'white')};
  font-weight: ${({$state}) => $state ? 'bold' : 'normal'};
  max-width: 90vw
`

const App = () => {
  const [inputFile, setInputFile] = useState(null)
  const [outputFile, setOutputFile] = useState(null)
  const [error, setError] = useState(null)

  const onClickConvert = () => {
    window.ipc.send('convert-to-sav', {
      name: inputFile.name,
      path: inputFile.path,
      size: inputFile.size,
      lastModified: inputFile.lastModified,
      lastModifiedDate: inputFile.lastModifiedDate
    });
  }
  useEffect(() => {
    const onSuccess = filePath => {
      setOutputFile(filePath)
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
    <Container>
      <Header>
        <Pikachu/>
        PokePocket Save Recovery
        <Pikachu/>
      </Header>
      <Notice $state={error?.length ? 'error' : (outputFile ? 'success' : '')}>
        {
          !outputFile && !error?.length &&
          'Notice: This only works with Gen 3 games: Fire Red, Leaf Green, Sapphire, Ruby, Emerald'
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
      </Notice>
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
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
