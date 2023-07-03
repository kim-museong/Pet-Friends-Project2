const express = require('express');
const router = express.Router();

const { readPicture } = require('../controllers/posts');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPicture);

module.exports = router;
