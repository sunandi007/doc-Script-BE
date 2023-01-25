const mongoose = require('mongoose')
const { Schema } = mongoose;

const children = new Schema({
    subTitle: String,
    slugSubTitle: String,
    image: String,
    content: String,
    category: String,
})

const courses = new Schema({
    slug: String,
    title: String,
    child: [children]
},{timestamps: true})

const Courses = mongoose.model('Courses', courses)

module.exports = Courses
