import { time } from "console"
import React from "react"
import { Flex, Link, Text, Image, SimpleGrid, GridItem, Heading, Box } from "@chakra-ui/react"
import timelineData from "./data/timelineData.json"
import { JsxEmit } from "typescript"
import { initScriptLoader } from "next/script"

function TimeBlurb(props) {

  let calcedHeight = `${(((2022-2013) - (2022-props.year))/(2022-2013))*800}px`

  let description: JSX.Element[] = []

  for(let paragraph in props.description) {
    description.push(
      <Text key={`${props.year}-${paragraph}`} mb="8px">{props.description[paragraph]}</Text>
    )
  }

  return (
    <Box key={props.year} w="100%" cursor="pointer" top={calcedHeight} position="absolute" id={`${props.side}-${props.year}`} onClick={props.closeTimeBlurb} boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.8)" borderRadius="10px" bg="#FFB74D" p={{base: "8px", md: "20px"}} display="flex" flexDirection="column" textAlign="center" justifyContent="center" alignItems="center">
        <Heading style={{pointerEvents :"none"}} pb="5px" borderRadius="10px 10px 0px 0px" bg="white" w="100%" border="3px solid black"
        fontSize={{base: "12px", md: "25px"}}>
          {`${props.year}: ${props.title}`}
          <Text style={{ pointerEvents :"none"}} fontSize={{base: "9px", md: "15px"}} fontWeight="600">
            {`{ ${props.languages} }`}
          </Text>
        </Heading>
        <Box p={{base: "5px", md: "5px"}} style={{height: "0", visibility: "hidden", pointerEvents :"none"}} fontSize={{base: "10px", md: "18px"}} border="1px solid black" bg="white" borderRadius="15px">
          {description}
        </Box>
    </Box>
  )
}

export default function DevTimeline() {

  let counter: number = 0
  let years: { leftYears: JSX.Element[], rightYears: JSX.Element[] } = { leftYears: [], rightYears: []}
  let arrows: { leftArrows: JSX.Element[], rightArrows: JSX.Element[] } = { leftArrows: [], rightArrows: []}

  function closeTimeBlurb(e) {
    const selectedParent = document.getElementById(e.target.id)
    const selectedBlurb = document.getElementById(e.target.id).children[1] as HTMLElement
    if(selectedBlurb.style.visibility === "visible") {
      selectedBlurb.style.visibility = "hidden"
      selectedBlurb.style.height = "0"
      selectedBlurb.style.marginTop= "0"
      selectedParent.style.zIndex = "1"
      selectedParent.style.width="100%"
      selectedParent.style.left="0%"
      selectedParent.style.border = "none"
    } else if (e.target.id.includes("right")){
      selectedBlurb.style.visibility = "visible"
      selectedBlurb.style.height = "auto"
      selectedBlurb.style.marginTop = "10px"
      selectedParent.style.zIndex = "10"
      selectedParent.style.width="222%"
      selectedParent.style.left="-122%"
    } else {
      selectedBlurb.style.visibility = "visible"
      selectedBlurb.style.height = "auto"
      selectedBlurb.style.marginTop = "10px"
      selectedParent.style.zIndex = "10"
      selectedParent.style.width = "222%"
    }
  }

  for(let year in timelineData) {
    counter++
    let calcedHeight = `${ ( ((2022-2013)-(2022-parseInt(year))) / (2022-2013)) * 800}px`

    if(counter%2 == 1) {
      years.leftYears.push(
        <TimeBlurb side="left" key={year} closeTimeBlurb={closeTimeBlurb} year={year} title={timelineData[year].Title} languages={timelineData[year].Languages} description={timelineData[year].Description} />
      )
      arrows.leftArrows.push(<Box key={year} h="5px" w="35%" left="0" top={calcedHeight} position="absolute" bg="black"></Box>)
    } else {
      years.rightYears.push(
        <TimeBlurb side="right" key={year} closeTimeBlurb={closeTimeBlurb} year={year} title={timelineData[year].Title} languages={timelineData[year].Languages} description={timelineData[year].Description} />
      )  
      arrows.leftArrows.push(<Box key={year} h="5px" w="35%" right="0" top={calcedHeight} position="absolute" bg="black"></Box>)    
    }
  }

  return (
    <Flex flexDirection="column" color="black" alignItems="center" justifyContent="center" w="100%" mt="10px" p="20px 0px 20px 0px" bg="#757575">
      <Heading mb="30px" textAlign="center" bg="white" p="10px 20px 10px 20px" borderRadius="40px" border="3px solid black" fontSize={{base:"25px", md:"45px"}}>Development Timeline</Heading>
      <SimpleGrid justifyItems="center" width="90%" columns={11} spacing="10px">
        <GridItem colSpan={5} w="100%" position="relative">{years.leftYears}</GridItem>
        <GridItem display="flex" justifyContent={"space-between"} w="100%" position="relative" h="1200px">
          <Box h="100%" w="35%">{arrows.leftArrows}</Box>
          <Box alignSelf="center" h="100%" w="30%" bg="black"></Box>
          <Box h="100%" w="35%">{arrows.rightArrows}</Box>
        </GridItem>
        <GridItem colSpan={5} w="100%" position="relative">{years.rightYears}</GridItem>
      </SimpleGrid>
    </Flex>
  )
}