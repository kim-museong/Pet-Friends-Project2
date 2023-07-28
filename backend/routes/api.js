const express = require('express');
const { getHospitalList, updateHospitalList, getRandomDogPicture } = require('../controllers/api');
const router = express.Router();

// GET /api/hospitalList
router.get('/hospitalList', getHospitalList);

// UPDATE /api/hospitalList
router.put('/hospitalList/:hospitalId', updateHospitalList);

// GET /api/randomDogPicture
router.get('/randomDogPicture', getRandomDogPicture);

module.exports = router;
