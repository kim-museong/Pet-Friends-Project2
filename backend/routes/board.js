const express = require('express');
const router = express.Router();

const { readPictureList, createPost } = require('../controllers/post');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPictureList);

// POST /board/:boardName/posts
router.post('/:boardName/posts', createPost);

module.exports = router;
