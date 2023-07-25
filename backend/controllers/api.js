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
