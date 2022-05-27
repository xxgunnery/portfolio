import React from "react"
//import Link from "next/link"
import { Flex, Link, Text, Image, SimpleGrid, GridItem, Heading } from "@chakra-ui/react"
import appData from "../appData.json"

function AppCard(props) {
  return (
    <GridItem boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.5)" borderRadius="10px" bg="#757575" p="20px 20px 20px 20px" display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center" colSpan={props.col}>
      <Link color="black" display="flex" flexDirection="column" justifyContent="center" alignItems="center" _hover={{textDecoration: "none", color: "black"}} href={appData[props.appName]["Link"]}>
        <Heading borderRadius="10px 10px 0px 0px" bg="white" w="100%" border="3px solid black" fontSize="35px">{appData[props.appName]["Title"]}</Heading>
        <Text fontSize="20px" border="1px solid black" p="10px" bg="white" borderRadius="15px" mt="10px">{appData[props.appName]["Description"]}</Text>
        <Image borderRadius="8px" border="6px solid black" mt="15px" src={appData[props.appName]["Image"]} width="300px" height="300px"/>
      </Link>
    </GridItem>
  )
}

export default function Apps() {
  return (
    <Flex flexDirection="column" color="black" alignItems="center" justifyContent="center" w="100%" mb="10px" mt="10px" p="20px 0px 20px 0px">
      <Heading mb={{base:"15px", md:"30px"}} textAlign="center" bg="white" p="10px 20px 10px 20px" borderRadius="40px" border="3px solid black"
      fontSize={{base:"25px", md:"35px"}}>
        My Applications
      </Heading>
      <SimpleGrid width="90%" columns={3} spacing="40px">
        <AppCard col={[3,3,3,3,1]} appName={"Wildy Data"}/>
        <AppCard col={[3,3,3,3,1]} appName={"React Learning"}/>
        <AppCard col={[3,3,3,3,1]} appName={"Wildy Data"}/>
      </SimpleGrid>
    </Flex>
  )
}