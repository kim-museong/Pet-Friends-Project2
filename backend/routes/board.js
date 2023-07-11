const express = require('express');
const router = express.Router();

const { readPosts, createPost, deletePost, updatePost } = require('../controllers/post');
const { sanitizer } = require('../middlewares/sanitizer');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPosts);

// POST /board/:boardName/posts
router.post('/:boardName/posts', sanitizer, createPost);

// DELETE /board/:boardName/posts/:postId
router.delete('/:boardName/posts/:postId', deletePost);

// UPDATE /board/:boardName/posts/:postId
router.put('/:boardName/posts/:postId', updatePost);

module.exports = router;
