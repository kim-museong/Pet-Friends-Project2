import { MdMailOutline, MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, FindMethod, ResultBox, Footer } from '../../lib/styles/find';

const FindId = ({
  isNickname,
  findId,
  init,
  light,
  onChange,
  findNickname,
  findEmail,
  selectnick,
  selectEmail,
  onCheck,
}) => {
  const { nickname, email, userId } = findId;
  const { result, isResult, valid } = init;
  return (
    <>
      <FindIdBox>
        <div>
          <Link to="/">Logo</Link>
          <h1>아이디 찾기</h1>
        </div>
        <FindMethod light={light} isNickname={String(isNickname)}>
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
                <div>{isNickname ? '닉네임' : '이메일'}</div>
                {isNickname ? (
                  ''
                ) : (
                  <input
                    autoComplete="userId"
                    name="userId"
                    onChange={onChange}
                    value={userId}
                    placeholder="등록된 아이디를 입력해주세요."
                  />
                )}
                <input
                  autoComplete="nickname"
                  name={isNickname ? 'nickname' : 'email'}
                  onChange={onChange}
                  value={isNickname ? nickname : email}
                  placeholder={`${isNickname ? '닉네임' : '이메일'}을 입력해주세요.`}
                />
                {isNickname ? <button onClick={findNickname}>확인</button> : <button onClick={findEmail}>확인</button>}
              </div>
              {isResult && (
                <ResultBox light={light}>
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
        <Footer light={light}>
          <Link to="/login">로그인</Link>
          <Link to="/findPASSWORD">비밀번호 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindId;
