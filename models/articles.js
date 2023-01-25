const mongoose = require('mongoose')
const { Schema } = mongoose;

const article = new Schema({
    title: {type: String, trim: true, unique: true, required: true},
    slug: {type: String, trim: true, unique: true, required: true},
    image: String,
    content: String,
    category: String,
},{timestamps: true})

const Articles = mongoose.model('Article', article)

module.exports = Articles
