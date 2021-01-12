const https = require('https')
const fs = require('fs')

require('dotenv').config()
const privateKey = fs.readFileSync(process.env.keyPath)
const certificate = fs.readFileSync(process.env.certificatePath)

const express = require('express')
const app = express()

const config = require('./constants').config()

if(!config) throw "Enviorment variable NODE_ENV was not set...";
const port = config.port

//import cors access control
const cors = require('cors')

//import database
const db  = require('./database')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', async (req,res) => {
    console.log('Api hit')
    res.send('You found me')
})

app.get('/getLinks', async (req,res) => {
    console.log('Links requested...')
    var links = await db.getLinks()
    res.json(links)
})

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port, () => {console.log("Listening on port:",port)})