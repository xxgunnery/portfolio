import React from "react"
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { extendTheme, Image, ListItem, List, Flex, Text, Spacer, Link, VStack, Heading } from '@chakra-ui/react'

// @ts-ignore
import { MDBIcon } from "mdb-react-ui-kit"

export default function InfoBlurb() {

    return (
        <Flex boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.5)" borderRadius="70px" bg="#FFE0B2" p={"25px 60px 25px 60px"} justifyContent={"center"} alignItems={"center"} flexWrap="wrap">
            <Image alignSelf="center" boxSize="180px" className="info__image" src="./home/Paul_PFP.png"/>
            <VStack margin="0px 40px 0px 40px" minW={["300px","500px","800px","auto"]} textAlign="center" w="60%">
                <Heading>Welcome to my portfolio website!</Heading>
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
            <List mt={["20px","20px","0px"]} p="10px" bg="white" w="80px" spacing={3} display={"flex"} borderRadius="15px" flexDirection="column" alignContent={"center"} alignItems={"center"}>
                <ListItem textAlign="center" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                    <Link href="https://github.com/xxgunnery" isExternal>
                        <MDBIcon className="fa-3x" style={{color: "#272B33"}} fab icon="github-square"/>
                    </Link>
                </ListItem>
                <ListItem textAlign="center" borderRadius="6px" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                    <Link href="https://twitter.com/XxGunnery" isExternal>
                        <MDBIcon className="fa-3x" style={{color: "#4285F4"}} fab icon="twitter"/>
                    </Link>
                </ListItem>
                <ListItem textAlign="center" borderRadius="6px" h="50px" w="60px" _hover={{bg:"rgba(0,0,0,.1)",border:"1px solid black", p:"-1px"}}>
                    <Link href="https://www.youtube.com/channel/UCZ2I7bCNv7lDjYx6bmDshJQ" isExternal>
                        <MDBIcon className="fa-3x" style={{color: "#FF0000"}} fab icon="youtube"/>
                    </Link>
                </ListItem>
            </List>
        </Flex>
  )
}