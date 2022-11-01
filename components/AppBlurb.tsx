import React from "react"

import { Image, Box, Flex, Text, Spacer, Link, VStack, Heading, Button} from '@chakra-ui/react'


export default function AppBlurb(props) {

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
        <VStack width={["100%"]} justifyContent={"center"} alignItems={"center"} mb="10px">
            <Box display="block" w="100%" p={"15px 0px 15px 0px"} boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.5)" borderRadius="10px" bg="#FFE0B2">
                <Flex display={blurbVisibility}  justifyContent={"center"} alignItems={"center"} flexWrap="wrap">
                    <VStack margin={{base:"0px", md: "0px 40px 0px 40px"}} minW={["300px","300px","500px","800px","auto"]} textAlign="center" w="90%">
                        <Heading fontSize="20x">{props.title}</Heading>
                        <Text fontSize="16px">
                            {props.howto}
                        </Text>
                    </VStack>
                </Flex>
            </Box>
            <Button onClick={toggleBlurb} fontSize="20px" bg="#212121" color="white" _hover={{bg:"#424242",boxShadow:"none"}} _focus={{bg:"#616161", boxShadow:"none"}}>Close Intro</Button>
        </VStack>
  )
}