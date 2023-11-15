import React from 'react'
import { createRoot } from 'react-dom/client';
import Layout from './layout/Layout'
import {FilesProvider} from './contexts/providers'

const App = () => {
  return (
    <FilesProvider>
      <Layout/>
    </FilesProvider>
  )
}

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
