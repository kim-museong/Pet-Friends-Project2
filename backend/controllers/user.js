const { User, Attendance } = require('../models');
const cron = require('node-cron');

//출석일자 저장
exports.attendance = async (req, res, next) => {
  const { userId, id } = req.body;

  try {
    const ckeckInTime = new Date();
    const isAttendance = await User.findOne({ where: { userId: userId }, attributes: ['isAttendance'] });
    const confirmAttendance = isAttendance.dataValues.isAttendance;

    if (confirmAttendance) {
      console.log('이미 출석');
      return;
    }

    await User.update({ isAttendance: true }, { where: { userId: userId } });
    console.log('출석하였습니다.');
    res.status(200).json({ message: '출석하였습니다.' });

    await Attendance.create({
      checkInTime: ckeckInTime,
      UserId: id,
    });
    const user = await User.findOne({ where: { userId: userId } });
    if (user) {
      user.attendanceNumber += 1;
      await user.save();
    } else {
      console.log('User not found');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.isAttendance = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return;
  }
  const isAttendance = await User.findOne({ where: { userId: userId }, attributes: ['isAttendance'] });
  const confirmAttendance = isAttendance.dataValues.isAttendance;
  res.status(200).json(confirmAttendance);
};

// 체크 여부 초기화 함수
const resetCheckStatus = async () => {
  try {
    // 모든 유저의 체크 여부를 false로 초기화
    await User.update({ isAttendance: false }, { where: {} });
    console.log('Check status reset completed.');
  } catch (error) {
    console.error(error);
  }
};

// 매일 자정에 체크 여부 초기화 작업 실행
cron.schedule('0 0 * * *', resetCheckStatus); // '0 0 * * *'는 매일 자정을 의미합니다
