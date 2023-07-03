const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { login, logout, saveReturnTo, check, register, same } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/register', isNotLoggedIn, register);
router.post('/sameUserId', same);

// POST /auth/login
router.post('/login', saveReturnTo, isNotLoggedIn, login);
router.get('/check', check);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);
router.post('/logout', isLoggedIn, logout);

module.exports = router;
