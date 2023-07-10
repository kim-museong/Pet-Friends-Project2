import { MdMailOutline, MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, FindMethod, ResultBox, Footer } from '../../lib/styles/find';

const FindId = ({
  isnickname,
  findId,
  init,
  theme,
  onChange,
  findNickname,
  findEmail,
  selectnick,
  selectEmail,
  onCheck,
}) => {
  const { nickname, email } = findId;
  const { result, isResult, valid } = init;
  return (
    <>
      <FindIdBox>
        <div>
          <Link to="/">Logo</Link>
          <h1>아이디 찾기</h1>
        </div>
        <FindMethod theme={String(theme)} isnickname={String(isnickname)}>
          <div className="method nick" onClick={selectnick}>
            <MdAccountCircle />
            <div>닉네임</div>
          </div>
          <div className="method email" onClick={selectEmail}>
            <MdMailOutline />
            <div>이메일</div>
          </div>
          <FindInputBox>
            <div>
              <div>
                <input
                  autoComplete="nickname"
                  name={isnickname ? 'nickname' : 'email'}
                  onChange={onChange}
                  value={isnickname ? nickname : email}
                  placeholder={`${isnickname ? '닉네임' : '등록하신 이메일'}을 입력해주세요.`}
                />
                {isnickname ? <button onClick={findNickname}>확인</button> : <button onClick={findEmail}>확인</button>}
              </div>
              {isResult && (
                <ResultBox theme={String(theme)}>
                  <div>
                    <div>{valid ? '오류!' : '아이디'}</div>
                    <div>{result}</div>
                    <button onClick={onCheck}>확인</button>
                  </div>
                </ResultBox>
              )}
            </div>
          </FindInputBox>
        </FindMethod>
        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindId;
