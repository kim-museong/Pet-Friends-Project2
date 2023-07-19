const express = require('express');
const { createReply, getReplies, deleteReply } = require('../controllers/reply');
const router = express.Router();

// POST /comments/:parentCommentId/replies
router.post('/:parentCommentId/replies', createReply);

// GET /comments/:parentCommentId/replies
router.get('/:parentCommentId/replies', getReplies);

// DELETE /comments/:parentCommentId/replies/:replyId
router.delete('/:commentId/replies/:replyId', deleteReply);

module.exports = router;
