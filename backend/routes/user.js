const express = require('express');
const { attendance, isAttendance } = require('../controllers/user');
const router = express.Router();

// POST /user/
router.post('/attendance', attendance);
router.post('/isAttendance', isAttendance);

module.exports = router;
