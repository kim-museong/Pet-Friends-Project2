const express = require('express');
const { getUsers, getUser } = require('../controllers/users');
const router = express.Router();

// GET /users
router.get('/', getUsers);

// GET /users/:userId
router.get('/:userId', getUser);

module.exports = router;
