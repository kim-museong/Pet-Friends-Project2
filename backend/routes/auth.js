const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { login, logout, saveReturnTo, check, register, same, sameNick, sendPhone } = require('../controllers/auth');

const router = express.Router();

//   /auth/
router.post('/phone', sendPhone);
router.post('/register', isNotLoggedIn, register);

router.post('/sameUserId', same);
router.post('/sameNickname', sameNick);

router.post('/login', saveReturnTo, isNotLoggedIn, login);

router.get('/check', check);
// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

router.post('/logout', isLoggedIn, logout);

module.exports = router;
