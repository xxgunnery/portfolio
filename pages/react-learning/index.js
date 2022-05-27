import ReactDOM from 'react-dom'
import React from 'react'

import { Box, Button } from "@chakra-ui/react"

import Navbar from '../../components/Navbar'
import AppBlurb from "../../components/AppBlurb"
import {MoshES6} from '../../components/react-learning/Mosh.js'
import Ziroll from '../../components/react-learning/Ziroll.js'
import appData from "../../components/appData.json"


function ConsoleClear() {
  function clearConsole(e) {
    e.preventDefault()
    console.clear()
  }
  return (
      <div className="buttonContainer">
        <div className="commands">COMMANDS: </div>
        <div className="clearButton" onClick={clearConsole}>CLEAR CONSOLE</div>
      </div>
  )
}

function ReactZir() {
    return (
    <div>
      <Ziroll />
    </div>
  )
}
function ES6() {
  return (
    <div>
      {MoshES6.varReplacements("varReplacements")}
      {MoshES6.objects("objects")}
      {MoshES6.thisKeyword("thisKeyword")}
      {MoshES6.binding("binding")}
      {MoshES6.arrow("arrow")}
      {MoshES6.arrowThis("arrowThis")}
      {MoshES6.arrayMap("arrayMap")}
      {MoshES6.objDest("objDest")}
      {MoshES6.spread("spread")}
      {MoshES6.classes("classes")}
    </div>
  )
}

function ReactLearningTabs(props) {
  return (
    <Box borderBottom="1px solid black" mb="5px">
      <Button fontSize={"22px"} bg="#FFA726" m="10px 5px 10px 0px" onClick={() => props.setTab("es6")}>Mosh ES6</Button>
      <Button fontSize={"22px"}  bg="#FFA726" m="10px 5px 10px 0px" onClick={() => props.setTab("ziroll")}>Ziroll React</Button>
    </Box>
  )
}

export default function Module() {

  const [tab, setTab] = React.useState("es6")

  return (
    <div>
      <Navbar />
      <AppBlurb howto={appData['React Learning'].HOWTO} title={appData['React Learning'].Title}/>
      <ReactLearningTabs setTab={setTab}/>
      <ConsoleClear />
      {tab === "ziroll" ? <ReactZir /> : <ES6 />}
    </div>
  )
}


