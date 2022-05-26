import drawPoints from "./drawPoints"

export default function playerDataParse(playerData, config, maximized) {

  console.log("Parsing player data to paint on map")

  const numPoints = playerData.length
  let worldPoints = []

  if(numPoints > 1) {
    for(let i = 0; i < numPoints; i++) {
      if(Object.keys(playerData[i]).length === 4) {
        const combatLvl = playerData[i]["Combat Level"]
        const world = playerData[i]["World"]
        const firstOp = playerData[i]["WorldPoint"].split("x=")[1].split("y=")
        const worldPointX = firstOp[0].replace(",","").trimEnd()
        const secOp = firstOp[1].split("plane=")
        const worldPointY = secOp[0].replace(",","").trimEnd()

        worldPoints.push([worldPointX,worldPointY,combatLvl,world].map(val => parseInt(val)))
      }
    }
  }
  if(config.form === "Worlds") {
    if(config.value === "") {
      drawPoints(worldPoints, maximized)
    } else {
      let world = parseInt(config.value)
      worldPoints = worldPoints.filter(player => player[3] === world)

      drawPoints(worldPoints, maximized)    
    }
  } else if(config.form === "Combat") {
      let combat = config.value
      if(combat === "") {
        drawPoints(worldPoints, maximized)
      } else {
        combat = {low: combat.split("-")[0], high: combat.split("-")[1]}
        worldPoints = worldPoints.filter(player => ( (player[2] >= combat.low) && (player[2] <= combat.high) ))
        drawPoints(worldPoints, maximized)
      }
  }

}