const mongoose = require('mongoose')
const { Schema } = mongoose;

const article = new Schema({
    title: {type: String, trim: true, unique: true, required: true},
    slug: {type: String, trim: true, unique: true, required: true},
    image: String,
    content: String,
    category: String,
    author: {type: String, trim: true},
    description: String,
    createdAt: Date,
    updatedAt: Date,
},{timestamps: true})

const Articles = mongoose.model('Article', article)

module.exports = Articles
