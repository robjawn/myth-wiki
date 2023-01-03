//Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const methodOverride = require('method-override')
const data = require('./models/data.js')
const Article = require('./models/article.js')

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

//Seed 
app.get('/seed', (req, res) => {
    Article.deleteMany({}, (err) => {
        Article.create(data, (err) => {
            res.redirect('/myths')
        })
    })
})

//Index
app.get('/myths', (req, res) => {
    Article.find({}, (error, allArticles) => {
        if (req.session.currentUser) {
            res.render('dashboard.ejs', {
                currentUser: req.session.currentUser,
                articles: allArticles,
            })
        } else {
            res.render('index.ejs', {
                currentUser: req.session.currentUser,
                articles: allArticles,
            })
        }
    })
})

//New
app.get('/myths/new', (req, res) => {
        res.render('new.ejs', {
            currentUser: req.session.currentUser
        })
})

//Delete
app.delete('/myths/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/myths')
    })
})

//Update
app.put('/myths/:id', (req, res) => {
    Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        },
        (error, updatedArticle) => {
            res.redirect(`/${req.params.id}`)
        }
    )
})

//edit
app.get('/myths/:id/edit', (req, res) => {
        Article.findById(req.params.id, (error, foundArticle) => {
            res.render('edit.ejs', {
                article: foundArticle,
                currentUser: req.session.currentUser
            })
        })
})

//create
app.post('/myths', (req, res) => {
    Article.create(req.body, (error, createdArticle) => {
        res.redirect('/myths')
    })
})

//show
app.get('/myths/:id', (req, res) => {
    Article.findById(req.params.id, (err, foundArticle) => {
        res.render("show.ejs", {
            currentUser: req.session.currentUser,
            article: foundArticle,
        })
    })
})

//Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log('server is listening'))


