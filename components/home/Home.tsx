import React from 'react'
import ReactDOM from 'react-dom/client'

import { Container, Flex, VStack } from '@chakra-ui/react'

import Navbar from '../Navbar'

import InfoBlurb from './InfoBlurb'
import Apps from './Apps'
import DevTimeline from "./DevTimeline"

export default function Home() {
  
  return (
    <VStack>
      {
      //<Navbar />
      }
      <Flex width="100%" direction={"column"} alignItems={"center"}>
        <InfoBlurb />
        <DevTimeline />
        <Apps />
      </Flex>
    </VStack>
  )
}