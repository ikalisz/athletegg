require('dotenv').config()
const express = require('express')
const {SERVER_PORT} = process.env
const app = express()
app.use(express.json())
const player_controller = require('./controller/player_controller')

app.listen(SERVER_PORT, () => {
    console.log(`Running on port ${SERVER_PORT}`)
})

app.get('/getPlayer', player_controller.getPlayer)
app.get('/getGamer', player_controller.getOnePlayer)
