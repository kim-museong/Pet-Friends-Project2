const express = require('express');
const { readPost } = require('../controllers/post');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const { afterUploadImage } = require('../controllers/post');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// POST /posts/img
router.post('/img', upload.any(), afterUploadImage);

// GET /posts/:postId
router.get('/:postId', readPost);

module.exports = router;
