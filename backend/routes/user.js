const express = require('express');
const {
  attendance,
  isAttendance,
  getAttendance,
  findId,
  findPwdEmail,
  findPwdPhone,
  changePwd,
} = require('../controllers/user');
const router = express.Router();

// POST /user/
router.post('/attendance', attendance);
router.post('/isAttendance', isAttendance);
router.post('/getAttendance', getAttendance);

router.post('/findId', findId);
router.post('/findPwdEmail', findPwdEmail);
router.post('/findPwdPhone', findPwdPhone);
router.post('/changePwd', changePwd);

module.exports = router;
