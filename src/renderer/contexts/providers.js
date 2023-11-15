import React, {useState} from 'react'
import {FilesContext} from './contexts'

export const FilesProvider = ({children}) => {
  const [inputFile, setInputFile] = useState(null)

  const loadInputFile = file => {
    setInputFile(file)
    window.ipc.send('load-save', {
      name: file.name,
      path: file.path,
      size: file.size,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate
    })
  }

  return (
    <FilesContext.Provider value={{inputFile, setInputFile, loadInputFile}}>
      {children}
    </FilesContext.Provider>
  )
}
