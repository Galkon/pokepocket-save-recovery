import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Trainer from '../components/Trainer'
import TextBox from '../components/TextBox'

const Viewport = () => {
  const [save, setSave] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const onLoaded = (save) => {
      setSave(save)
      setError(null)
    }
    const onError = (err) => {
      setError(err)
    }

    window.ipc.on('loaded-save', onLoaded)
    window.ipc.on('error', onError)

    return () => {
      window.ipc.off('loaded-save', onLoaded)
      window.ipc.off('error', onError)
    }
  }, [])

  return (
    <Container>
      {
        save &&
        <Trainer
          {...save}
        />
      }
      {
        error &&
        <ErrorPrompt>
          <TextBox type="error">
            An error occurred while loading the save:
            <br/>{error}
          </TextBox>
        </ErrorPrompt>
      }
    </Container>
  )
}

export default Viewport

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const ErrorPrompt = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`
