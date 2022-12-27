//Dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const sessionsRouter = express.Router()
const User = require('../models/user.js')

//New (log in page)
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

//Export sessionsRouter
module.exports = sessionsRouter