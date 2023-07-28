const express = require('express');
const { getHospitalList, updateHospitalList } = require('../controllers/api');
const router = express.Router();

// GET /api/hospitalList
router.get('/hospitalList', getHospitalList);

// UPDATE /api/hospitalList
router.put('/hospitalList/:hospitalId', updateHospitalList);

module.exports = router;
