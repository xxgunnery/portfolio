const express = require('express');
const next = require('next')
const fs = require('fs')
const papa = require('papaparse')

let playerData = fs.readFileSync('C:/Users/xxgun/Documents/pdantonio/Java/RuneLite/playerdata.csv', "utf-8")
playerData = papa.parse(playerData)

const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  const server = express()

  // create a GET route
  server.get('*', (req, res) => { //Line 9
    return handle(req, res)
  })

    server.listen(port, () => console.log(`Listening on port ${port}`))

    server.get('/express_backend', (req, res) => { //Line 9
      res.json(playerData);
  })
})

