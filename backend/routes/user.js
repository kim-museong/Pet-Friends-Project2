const express = require('express');
const {
  attendance,
  isAttendance,
  getAttendance,
  findId,
  findPwdEmail,
  findPwdPhone,
  changePwd,
  userIdConfirm,
  saveMemo,
  memos,
  memo,
  memoUpdate,
} = require('../controllers/user');
const router = express.Router();

// POST /user/
router.post('/attendance', attendance);
router.post('/isAttendance', isAttendance);
router.post('/getAttendance', getAttendance);

router.post('/findId', findId);
router.post('/userIdConfirm', userIdConfirm);
router.post('/findPwdEmail', findPwdEmail);
router.post('/findPwdPhone', findPwdPhone);
router.post('/changePwd', changePwd);

router.post('/saveMemo', saveMemo);
router.post('/memos', memos);
router.post('/memo', memo);
router.post('/memoUpdate', memoUpdate);

module.exports = router;
