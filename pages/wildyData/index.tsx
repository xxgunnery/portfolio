import React from 'react'
import ReactDOM from 'react-dom/client'

import Navbar from '../../components/Navbar'
import Form from '../../components/wildyData/Form'
import Wildy from '../../components/wildyData/Wildy'
import playerDataParse from '../../components/wildyData/playerDataParse'

//@ts-ignore
import playerDataJSON from '../../public/wildyData/playerdata.json'
import { Box, Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'

export default function WildyData() {

  const [maximized, setMaximized] = React.useState(false)
  const [tab, setTab] = React.useState({clicked: "Combat"})
  const [canvDim, setCanvDim] = React.useState({regular: {height: "800px", width: "820px"}, maximized: {height: "1350px", width: "1384px"}})

  const playerData = playerDataJSON

  function getWidth() {
    if(window.screen.width < 1000) {
      setCanvDim({regular: {height: "415px", width: "420px"}, maximized: {height: "415px", width: "420px"}})
    } else {
      setCanvDim({regular: {height: "800px", width: "820px"}, maximized: {height: "1350px", width: "1384px"}})
    }
  }

  React.useEffect(() => {
    getWidth()
  }, [])

  
  React.useEffect(() => {
    console.log("CANVAS DIMENSIONS")
    playerDataParse(playerData, {form: "Worlds", value: ""}, false)
  }, [canvDim])

  React.useEffect(() => {
    const clicked = document.getElementsByName(tab.clicked)[0] as HTMLInputElement
    const value = clicked.value
    console.log("MAXIMIZED")
    playerDataParse(playerData, {form: tab.clicked, value: value}, maximized)
  }, [maximized])

  function minimizeMap() {
    document.getElementById("maximized").style.display = "none"
    setMaximized(false)
  }

  return (
    <div>
      <Navbar />
      <Flex w="100%" justifyContent="center" m={{base:"0px 0px 0px 0px",md: "5px 0px 0px 15px" }}>
        <div id="maximized" className="maximizedMap">
          <button onClick={minimizeMap}>MINIMIZE MAP</button>
          <Wildy canvasDimensions={{height:canvDim.maximized.height, width: canvDim.maximized.width, id: "maximized"}}/>
        </div>
        <SimpleGrid w="100%" alignItems="center" justifyContent="center" columns={{base: 10}}>
          <GridItem mb="5px" display="flex" alignItems="center" justifyContent="center" colSpan={{base: 10, md: 3}} w="100%">
            <Form tab={tab} setTab={setTab} maximized={maximized} setMaximized={setMaximized} playerData={playerData}/>
          </GridItem>
          <GridItem display="flex" justifyContent="center" colSpan={{base: 10, md: 7}}>
            <Wildy canvasDimensions={{height: canvDim.regular.height, width: canvDim.regular.width, id: "regular"}}/>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </div>
  )
}