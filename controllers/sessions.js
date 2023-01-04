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

//Delete (log out)
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})

//Create (log in route)
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        if(!foundUser) {
            res.send('No account with that email address has been registered')
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password)
            if (passwordMatches) {
                req.session.currentUser = foundUser
                res.redirect('/')
            } else {
                res.send('Invalid Password')
            }
        }
    })
})

//Export sessionsRouter
module.exports = sessionsRouter