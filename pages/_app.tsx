import '../styles/global.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { isWhiteSpaceLike } from 'typescript'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme( {
      fonts: {
        body: "Oxygen"
      },
      components : {
        Link: {
          baseStyle: {
            _focus: {
              boxShadow: "none"
            },
            _hover: {
              textDecoration: "none"
            }
          }
        }
      }
    })}>
      <Component {...pageProps} />
    </ChakraProvider>
)}