const express = require('express');
const router = express.Router();

const { readPictureList } = require('../controllers/post');

// GET /board/:boardName/posts
router.get('/:boardName/posts', readPictureList);

module.exports = router;
