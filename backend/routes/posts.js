const express = require('express');
const router = express.Router();

const { readPost } = require('../controllers/post');

// GET /posts/:postId
router.get('/:postId', readPost);

module.exports = router;
