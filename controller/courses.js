const Courses = require('../models/course')

const slugify = require('slugify')
const Articles = require("../models/articles");

module.exports = {
    allCourses: (req, res) => {
        Courses.find({}, 'slug title child', (err, courses) => {
            if (err) console.error(err)
            if (courses.length > 0) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Get All Data Courses',
                    data: courses
                })
            } else {
                res.json({
                    errorCode: 'ERR-0001',
                    message: 'No Courses found'
                })
            }
        })
    },

    findCourseBySlug: (req, res) => {
        Courses.findOne({ slug: req.params.slug}, (err, course) => {
            if (err) console.log(err)
            if (course) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Get Data course By Slug',
                    data: course
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No course found'
                })
            }
        })
    },


    createCourses: (req, res) => {
        const slugifyResult = slugify(req.body.title).toLowerCase()
        console.log(slugifyResult)
        let arrayReq = [];
        for (const course of req.body.child) {
            let slugifyChildResult = slugify(course.subTitle).toLowerCase()
            console.log('slugifyChildResult :', slugifyChildResult)
            let object = {
                    subTitle: course.subTitle,
                    slugSubTitle: slugifyChildResult.toLowerCase(),
                    image: course.image,
                    content: course.content,
                    category: course.category,
            }
            arrayReq.push(object)
        }
        Courses.create({
            child: arrayReq,
            title: req.body.title,
            slug: slugifyResult.toLowerCase(),
        }, (err, course) => {
            if (err) console.error(err)
            res.send({
                successCode: 'SUC-0001',
                message: 'Successfully Created Courses',
                data: course
            })
        })
    },

    removeCourse: (req, res) => {
        const id = req.params.id;
        Courses.findByIdAndRemove(id, req.body, (err, course) => {
            if (err) console.log(err)
            if (course) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Remove Data Course',
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No Detail Course found'
                })
            }
        })
    },

    updateCourse: (req, res) => {
        const id = req.params.id;
        Courses.findByIdAndUpdate(id, req.body, {options: {new: true}}, (err, course) => {
            if (err) console.log(err)
            if (course) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Update Data Course',
                    data: course
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No Detail Course found'
                })
            }
        })
    },

}
