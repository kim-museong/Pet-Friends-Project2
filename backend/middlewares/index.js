exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // res.redirect('/page/login');
    console.log('로그인 중 아님');
    res.end();
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

// 관리자 여부 조사
exports.isAdmin = (req, res, next) => {
  console.log('관리자 권한 확인 진입');
  // id 받아서 등급 조사로 admin 여부 구해옴
  if (req.user.rank === '5') {
    console.log('관리자 권한 확인 완료. 다음단계로.');
    next();
  } else {
    console.log('관리자 권한이 필요합니다');
    res.end();
  }
};
exports.isNotAdmin = (req, res, next) => {};
