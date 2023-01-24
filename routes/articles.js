const express = require('express');
const router = express.Router();

articleController = require('../controller/articles')

router.route('/')
    .get(articleController.allArticles)
    .post(articleController.createArticle)

router.get('/:slug', articleController.findArticleBySlug)

router.patch('/:id', articleController.updateArticle)

router.delete('/:id', articleController.removeArticle)

module.exports = router;
