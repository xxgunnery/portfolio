import React from "react"
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Image, Box, Flex, Text, Spacer, Link, VStack, Heading, Button} from '@chakra-ui/react'

// @ts-ignore
import { MDBIcon } from "mdb-react-ui-kit"

export default function InfoBlurb() {

    const [blurbVisibility, setBlurbVisibility] = React.useState("flex")


    function toggleBlurb(e) {
        if(blurbVisibility === "flex") {
            setBlurbVisibility("none")
            e.target.innerText = "Show Intro"
        } else {
            setBlurbVisibility("flex")
            e.target.innerText = "Close Intro"
        }
    }
    return (
        <VStack width={["95%","80%"]} justifyContent={"center"} alignItems={"center"}>
            <Box display="block" w="100%" p={"15px 0px 15px 0px"} boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.5)" borderRadius="70px" bg="#FFE0B2">
                <Flex display={blurbVisibility}  justifyContent={"center"} alignItems={"center"} flexWrap="wrap">
                    <Image alignSelf="center" boxSize="180px" className="info__image" src="./home/Paul_PFP.png"/>
                    <VStack margin={{base:"0px", md: "0px 40px 0px 40px"}} minW={["300px","300px","500px","800px","auto"]} textAlign="center" w="60%">
                        <Heading>Welcome to the portfolio website of Paul D'Antonio</Heading>
                        <Text fontSize="20px">
                            My name is Paul D'Antonio, I am a self-taught web developer from Syracuse, NY. I specialize in front-end development utilizing React.
                        </Text>
                        <Text fontSize="20px">
                            The goal of this website is to display my coding projects so that people can explore and utilize my various applications.
                        </Text>
                        <Text fontSize="20px">
                            This website is created using Next.JS & Chakra UI.
                        </Text>
                    </VStack>
                    <Flex w={["200px","200px","200px","200px","80px"]} mt={["20px","20px","20px","20px","0px"]} p="10px" bg="white" display={"flex"} borderRadius="15px" flexWrap="wrap" alignContent={"center"} alignItems={"center"}>
                        <Box mt="5px" textAlign="center" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                            <Link href="https://github.com/xxgunnery" isExternal>
                                <MDBIcon className="fa-3x" style={{color: "#272B33"}} fab icon="github-square"/>
                            </Link>
                        </Box>
                        <Box mt="5px" textAlign="center" borderRadius="6px" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                            <Link href="https://twitter.com/XxGunnery" isExternal>
                                <MDBIcon className="fa-3x" style={{color: "#4285F4"}} fab icon="twitter"/>
                            </Link>
                        </Box>
                        <Box mt="5px" textAlign="center" borderRadius="6px" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                            <Link href="https://www.youtube.com/channel/UCZ2I7bCNv7lDjYx6bmDshJQ" isExternal>
                                <MDBIcon className="fa-3x" style={{color: "#FF0000"}} fab icon="youtube"/>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Button onClick={toggleBlurb} fontSize="20px" bg="#212121" color="white" _hover={{bg:"#424242",boxShadow:"none"}} _focus={{bg:"#616161", boxShadow:"none"}}>Close Intro</Button>
        </VStack>
  )
}