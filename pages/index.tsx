import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import Home from './home/Home'

function App() {

  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}

export default App

