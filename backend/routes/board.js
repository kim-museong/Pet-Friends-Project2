const express = require('express');
const router = express.Router();

const { readPictureList, createPost } = require('../controllers/post');
const { sanitizer } = require('../middlewares/sanitizer');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPictureList);

// POST /board/:boardName/posts
router.post('/:boardName/posts', sanitizer, createPost);

module.exports = router;
