import React from 'react'
import ReactDOM from 'react-dom/client'

import { Container, Flex, VStack } from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import InfoBlurb from './components/InfoBlurb'
import Apps from './components/Apps'
import DevTimeline from "./components/DevTimeline"

export default function Home() {
  
  return (
    <VStack>
      <Navbar />
      <Flex direction="column">
        <InfoBlurb />
        <DevTimeline />
        <Apps />
      </Flex>
    </VStack>
  )
}