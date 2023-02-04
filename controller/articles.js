const Articles = require('../models/articles');

const slugify = require('slugify')

module.exports = {
    allArticles: (req, res) => {
        Articles.find({}, 'slug image title content author description', (err, articles) => {
            if (err) console.error(err)
            if (articles.length > 0) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Get All Data Articles',
                    data: articles
                })
            } else {
                res.json({
                    errorCode: 'ERR-0001',
                    message: 'No Articles found'
                })
            }
        })
    },

    findArticleBySlug: (req, res) => {
        Articles.findOne({ slug: req.params.slug}, (err, articles) => {
            if (err) console.log(err)
            if (articles) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Get Data User By Slug',
                    data: articles
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No Detail Manga found'
                })
            }
        })
    },

    createArticle: (req, res) => {
        const slugifyResult = slugify(req.body.title)
        Articles.create({
            title: req.body.title,
            content: req.body.content,
            slug: slugifyResult.toLowerCase(),
            image: req.body.image ? req.body.image : 'https://w0.peakpx.com/wallpaper/759/741/HD-wallpaper-digital-technology-background-with-zeros-and-ones-digital-blue-background-binary-code-background-digital-data-binary-code-texture.jpg',
            category: req.body.category,
            author: req.body.author,
            description: req.body.description,
        }, (err, article) => {
            if (err) console.error(err)
            res.send({
                successCode: 'SUC-0001',
                message: 'Successfully Created Article',
                data: article
            })
        })
    },

    updateArticle: (req, res) => {
        const id = req.params.id;
        const slugifyResult = slugify(req.body.title)
        Articles.findByIdAndUpdate(id,
            {
                title: req.body.title,
                content: req.body.content,
                slug: slugifyResult.toLowerCase(),
                image: req.body.image ? req.body.image : 'https://w0.peakpx.com/wallpaper/759/741/HD-wallpaper-digital-technology-background-with-zeros-and-ones-digital-blue-background-binary-code-background-digital-data-binary-code-texture.jpg',
                category: req.body.category,
                author: req.body.author,
                description: req.body.description,
            }, {options: {new: true}}, (err, article) => {
            if (err) console.log(err)
            if (article) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Update Data Article',
                    data: article
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No Detail Article found'
                })
            }
        })
    },

    removeArticle: (req, res) => {
        const id = req.params.id;
        Articles.findByIdAndRemove(id, req.body, (err, article) => {
            if (err) console.log(err)
            if (article) {
                res.json({
                    successCode: 'SUC-0001',
                    message: 'Successfully Remove Data Article',
                })
            } else {
                res.json({
                    error_code: 'ERR-0001',
                    message: 'No Detail Article found'
                })
            }
        })
    }
}
