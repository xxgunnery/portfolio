import '../styles/global.css'
import { ChakraProvider, extendTheme, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function App({ Component, pageProps }) {

    function ForceDarkMode(props: { children: JSX.Element }) {
        const { colorMode, toggleColorMode } = useColorMode();

        React.useEffect(() => {
            if (colorMode === "light") return;
            toggleColorMode();
        }, []);

        return props.children;
    }

    return (
        <ChakraProvider theme={extendTheme({
            fonts: {
                body: "Oxygen"
            },
            components: {
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
            <ForceDarkMode>
                <Component {...pageProps} />
            </ForceDarkMode>
        </ChakraProvider>
    )
}