//Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const methodOverride = require('method-override')
const Olympians = require('./models/greek.js')

//DB Config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//DB Connection
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'error running mongo'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('disconnected from mongo'))

//Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

//Routes and Controllers
const sessionsController = require('./controllers/sessions')
app.use('/sessions', sessionsController)
const usersController = require('./controllers/users')
app.use('/users', usersController)

app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        })
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        })
    }
})


//Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})