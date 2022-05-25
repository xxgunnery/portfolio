import React from 'react'
import ReactDOM from 'react-dom/client'

import Navbar from '../../components/Navbar'
import Form from '../../components/wildyData/Form'
import Wildy from '../../components/wildyData/Wildy'
import playerDataParse from './playerDataParse'

//@ts-ignore
import playerDataJSON from '../../public/wildyData/playerdata.json'

export default function WildyData() {

  const [playerData, setPlayerData] = React.useState(playerDataJSON)
  const [maximized, setMaximized] = React.useState(false)
  const [tab, setTab] = React.useState({clicked: "Combat"})

  React.useEffect(() => {
    playerDataParse(playerData, {form: "Worlds", value: ""}, false)
  }, [playerData])

  React.useEffect(() => {
    const clicked = document.getElementsByName(tab.clicked)[0] as HTMLInputElement
    const value = clicked.value
    playerDataParse(playerData, {form: tab.clicked, value: value}, maximized)
  }, [maximized])

  function minimizeMap() {
    document.getElementById("maximized").style.display = "none"
    setMaximized(false)
  }

  return (
    <div>
      <Navbar />
      <div className="container2">
        <div id="maximized" className="maximizedMap">
          <button onClick={minimizeMap}>MINIMIZE MAP</button>
          <Wildy canvasDimensions={{height:"1350px", width: "1384px", id: "maximized"}}/>
        </div>
        <Form tab={tab} setTab={setTab} maximized={maximized} setMaximized={setMaximized} playerData={playerData}/>
        <Wildy canvasDimensions={{height:"800px", width: "820px", id: "regular"}}/>
      </div>
    </div>
  )
}