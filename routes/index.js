const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", upload.single("files"), uploadFiles);

function uploadFiles(req, res) {
  console.log('file :', req.file);
  res.json({ message: "Successfully uploaded files" });
}
module.exports = router;
