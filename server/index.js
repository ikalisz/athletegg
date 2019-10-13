require('dotenv').config()
const express = require('express')
const app = express()
const {SERVER_PORT} = process.env
app.use(express.json())
const player_controller = require('./controller/player_controller')

app.listen(SERVER_PORT, () => {
    console.log(`Running on port ${SERVER_PORT}`)
})

app.get('/getPlayer', player_controller.getPlayer)
