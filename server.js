//Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const methodOverride = require('method-override')

//Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})