const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Pet } = require('../models');

exports.register = async (req, res, next) => {
  const { username, password, email, nickname } = req.body;
  console.log(req.body);
  try {
    const exUser = await User.findOne({ where: { userId: username } });
    if (exUser) {
      console.log('중복된 아이디');
      return res.status(400).json({ error: 'exist' });
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      userId: username,
      password: hash,
      email,
      nickname,
    });
    req.login(newUser, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send('회원가입 및 로그인 성공');
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.same = async (req, res, next) => {
  const { value } = req.body;
  try {
    const sameUser = await User.findOne({ where: { userId: value } });
    res.status(200).json(sameUser);
  } catch (e) {
    console.log(e);
  }
};

exports.sameNick = async (req, res, next) => {
  const { value } = req.body;
  try {
    const sameNick = await User.findOne({ where: { nickname: value } });
    res.status(200).json(sameNick);
  } catch (e) {
    console.log(e);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.error('없는 아이디입니다.');
      return res.status(400).json({ message: '로그인 실패' });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send('로그인 성공'); // 로그인 성공 시 응답을 반환합니다.
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.check = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    // 로그인 중이 아닙니다.
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const foundUser = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'userId', 'nickname', 'email', 'rank'], // 가져오고 싶은 컬럼 이름을 배열로 지정합니다.
    });

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    // if 주소에 마이페이지 등 있음. => 메인 페이지로
    // else 주소에 마이페이지 등 없음. => 기존 페이지로
    const url = req.headers.referer;
    if (url.includes('mypage') || url.includes('admin')) {
      return res.redirect('/');
    } else {
      return res.redirect(url);
    }
    // res.redirect(req.headers.referer);
  });
};

exports.saveReturnTo = (req, res, next) => {
  req.session.returnTo = req.header('Referer') || '/';
  next();
};
