const express = require('express');
const { addLike, getLikes, deleteLike, addLikeTEST, deleteLikeTEST } = require('../controllers/like');
const { getUsers, getUser } = require('../controllers/users');
const router = express.Router();

// GET /users
router.get('/', getUsers);

// GET /users/:userId
router.get('/:userId', getUser);

// POST /users/:userId/posts/:postId/likes
router.post('/:userId/posts/:postId/likes', addLike);

// GET /users/:userId/likes
router.get('/:userId/likes', getLikes);

// DELETE /users/:userId/likes
router.delete('/:userId/likes', deleteLike);

// POST /users/:userId/likesTEST
router.post('/:userId/likesTEST', addLikeTEST);

// DELETE /users/:userId/likesTEST
router.delete('/:userId/likesTEST', deleteLikeTEST);

module.exports = router;
