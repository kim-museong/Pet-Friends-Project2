const express = require('express');
const router = express.Router();

const { readPicture } = require('../controllers/posts');

router.get('/', readPicture);

module.exports = router;
