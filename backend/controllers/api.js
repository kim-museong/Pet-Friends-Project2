const axios = require('axios');
const { Hospital } = require('../models');

////////////////////////////////////////////////////////////
//////////////////// get hospital list /////////////////////
////////////////////////////////////////////////////////////
exports.getHospitalList = async (req, res, next) => {
  try {
    // 1. get hospital list
    const hospitalList = await Hospital.findAll();

    return res.status(200).json(hospitalList);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

///////////////////////////////////////////////////////////////
//////////////////// update hospital list /////////////////////
///////////////////////////////////////////////////////////////
exports.updateHospitalList = async (req, res, next) => {
  const { hospitalId } = req.params;
  const { latitude, longitude } = req.body;

  try {
    // 1. update hospital list
    const hospital = await Hospital.update(
      {
        latitude,
        longitude,
      },
      {
        where: {
          id: hospitalId,
        },
      },
    );

    return res.status(200).json(hospital);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//////////////////////////////////////////////////////////////////
//////////////////// get random dog picture //////////////////////
//////////////////////////////////////////////////////////////////
exports.getRandomDogPicture = async (req, res, next) => {
  console.log('강아지 사진 요청 3');
  await axios
    .get('https://random.dog/woof.json')
    .then((response) => {
      console.log('===============================================');
      console.log(response.data);
      console.log('===============================================');
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
