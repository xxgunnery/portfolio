import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import Head from 'next/head'

import Home from '../components/home/Home'
import { VStack } from '@chakra-ui/react';

export default function App() {

    return (
        <VStack bg="gray.300">
            <Home />
        </VStack>
    )
}
