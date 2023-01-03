//Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//article Schema
const articleSchema = new Schema({
    category: String,
    name: String,
    type: String,
    img: 
    {
        data: Buffer,
        contentType: String,
    },
    description: String,
})

//Model
const Article = mongoose.model('Article', articleSchema)

//Export
module.exports = Article