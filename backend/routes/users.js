const express = require('express');
const { addLike } = require('../controllers/like');
const { getUsers, getUser } = require('../controllers/users');
const router = express.Router();

// GET /users
router.get('/', getUsers);

// GET /users/:userId
router.get('/:userId', getUser);

// POST /users/:userId/posts/:postId/likes
router.post('/:userId/posts/:postId/likes', addLike);

module.exports = router;
