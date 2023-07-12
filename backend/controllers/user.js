const { User, Post, Content, Pet, Attendance } = require('../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cron = require('node-cron');

//출석일자 저장
exports.attendance = async (req, res, next) => {
  const { userId, id } = req.body;
  console.log(id);
  const checkInTime = new Date();
  const dateString = checkInTime.toISOString().split('T')[0]; // T00:29:19.902Z 부분 삭제

  try {
    const attendanceDate = await User.findOne({ where: { id: id }, attributes: ['isAttendance'] });
    console.log(attendanceDate);

    if (attendanceDate.checkInTime === true) {
      console.log('이미 출석');
      return;
    }

    await User.update({ isAttendance: true }, { where: { userId: userId } });
    console.log('출석하였습니다.');
    res.status(200).json({ message: '출석하였습니다.' });

    await Attendance.create({
      checkInTime: checkInTime,
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
    console.log('출석여부 초기화 진행');
  } catch (error) {
    console.error(error);
  }
};

// 매일 자정에 체크 여부 초기화 작업 실행
cron.schedule('36 9 * * *', resetCheckStatus); // '분 시 * * *'는 매일 자정을 의미합니다

exports.getAttendance = async (req, res, next) => {
  const { id } = req.body;
  try {
    const data = await Attendance.findAll({ where: { UserId: id } });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

exports.checkUser = async (req, res) => {
  try {
    if (Object.keys(req.query)[0] == 'userId') {
      const userId = req.query.userId;
      const user = await User.findOne({ where: { userId: userId } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    } else if (Object.keys(req.query)[0] == 'nickname') {
      const nickname = req.query.nickname;
      const user = await User.findOne({ where: { nickname: nickname } });
      const isDuplicate = user !== null;
      res.json({ isDuplicate: isDuplicate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPost = async (req, res, next) => {
  console.log(req.user.id);
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
          where: { id: req.user.id },
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ],
    });
    res.json({
      posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.findId = async (req, res, next) => {
  const { email, nickname } = req.body;
  try {
    const isEmail = await User.findOne({ where: { email: email, nickname: nickname } });
    if (isEmail === null) {
      res.status(200).json();
      return;
    }
    console.log(isEmail);

    //랜덤문자 생성(문자와 숫자가 섞인 6자리 랜덤문자 생성)
    const generateCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };
    const generatedCode = generateCode();

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'antjd0419@gmail.com',
    //     pass: process.env.MYEMAILPASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   from: '펫프렌즈',
    //   to: email,
    //   subject: '안녕하세요. 펫프렌즈입니다.',
    //   text: `${isEmail.nickname}님의 인증번호는 ${generatedCode}입니다`,
    // };

    // await transporter.sendMail(mailOptions);
    console.log('이메일 성공적 전송');
    res.status(200).json({ isEmail, generatedCode });
  } catch (error) {
    console.log(error);
  }
};

exports.userIdConfirm = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const response = await User.findOne({ where: { userId } });
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.findPwdEmail = async (req, res, next) => {
  const { email, userId } = req.body;

  const response = await User.findOne({ where: { userId } });
  if (response) {
    try {
      //랜덤문자 생성(문자와 숫자가 섞인 6자리 랜덤문자 생성)
      const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
        return code;
      };
      const generatedCode = generateCode();

      //이메일 생성 전달 부분
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "antjd0419@gmail.com",
      //     pass: process.env.MYEMAILPASSWORD,
      //   },
      // });

      // const mailOptions = {
      //   from: "antjd0419@gmail.com",
      //   to: email,
      //   subject: "안녕하세요. 펫프렌즈입니다.",
      //   text: `인증번호 ${generatedCode} 입니다.`,
      // };

      // await transporter.sendMail(mailOptions);
      // console.log("이메일이 성공적으로 전송되었습니다.");
      res.status(200).json(generatedCode);
      console.log(generatedCode);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).json('등록된 아이디가 아닙니다.');
  }
};

exports.findPwdPhone = async (req, res, next) => {
  const { phone } = req.body;
};

exports.changePwd = async (req, res, next) => {
  const { pwd, findEmail } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await User.update({ password: hashedPwd }, { where: { email: findEmail } });
    res.status(200).json({ success: true, message: '패스워드가 업데이트되었습니다.' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

exports.editUser = async (req, res, next) => {
  const { id, nickname, userId, email, address1, address2, address3, pet, petName, petType, petKind, petAge, petEtc } =
    req.body;
  console.log(id, nickname, userId, email, address1);
  try {
    await User.update(
      {
        nickname,
        userId,
        email,
        address1,
        address2,
        address3,
        pet,
      },
      {
        where: { id: id },
      },
    );
    await Pet.update(
      {
        name: petName,
        type: petType,
        kind: petKind,
        age: Number(petAge),
        etc: petEtc,
      },
      {
        where: { id: id },
      },
    );

    return res.redirect('/page/mypage');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러 발생' });
  }
};
