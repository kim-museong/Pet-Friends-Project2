const express = require('express');
const router = express.Router();

const { readPosts, createPost, deletePost } = require('../controllers/post');
const { sanitizer } = require('../middlewares/sanitizer');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPosts);

// POST /board/:boardName/posts
router.post('/:boardName/posts', sanitizer, createPost);

// DELETE /board/:boardName/posts/:postId
router.delete('/:boardName/posts/:postId', deletePost);

module.exports = router;
