const express = require('express');
const router = express.Router();

coursesController = require('../controller/courses')

router.route('/')
    .get(coursesController.allCourses)
    .post(coursesController.createCourses)

router.delete('/:id', coursesController.removeCourse)
router.patch('/:id', coursesController.updateCourse)
router.get('/:slug', coursesController.findCourseBySlug)

module.exports = router;
