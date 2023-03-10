//Dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//article Schema
const articleSchema = new Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String },
    img: {type: String},
    description: { type: String, required: true },
})

//Model
const Article = mongoose.model('Article', articleSchema)

//Export
module.exports = Article