//Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const methodOverride = require('method-override')
const myths = require('../models/myths.js')
const categoriesRouter = express.Router()

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

//Controllers
const sessionsController = require('../controllers/sessions')
app.use('/sessions', sessionsController)
const usersController = require('../controllers/users')
app.use('/users', usersController)

//Route
categoriesRouter.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        res.render('./categories/dashboard.ejs', {
            currentUser: req.session.currentUser,
            myths: myths
        })
    } else {
        res.render('./categories/index.ejs', {
            currentUser: req.session.currentUser,
            myths: myths
        })
    }
})

//Export
module.exports = categoriesRouter