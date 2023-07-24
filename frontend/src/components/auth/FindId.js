import { Link } from 'react-router-dom';
import { FindIdBox, FindInputBox, Footer } from '../../lib/styles/find';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
`;

const ShowBox = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid ${palette.border};

  .title {
    margin: 30px auto;
    font-size: 20px;
  }
`;

const FindId = ({
  findId,
  theme,
  onChange,
  error,
  onConfirm,
  showBox,
  getUserId,
  onCancel,

  confirmFail,
}) => {
  const { nickname } = findId;
  const { nicknameError } = error;
  const { userId } = getUserId || '';

  return (
    <>
      <FindIdBox>
        <div style={{ marginTop: '10%' }}>
          <Link to="/">Logo</Link>
          <h1>아이디 찾기</h1>
        </div>

        {showBox ? (
          <FindInputBox>
            <ShowBox>
              <div className="title">아이디</div>
              <ShowBox>{userId}</ShowBox>
              <button onClick={onCancel}>확인</button>
            </ShowBox>
          </FindInputBox>
        ) : (
          <div>
            <FindInputBox theme={String(theme)}>
              <div>
                <p style={{ color: 'rgb(160,160,160)', fontSize: '14px' }}>
                  ・ 회원가입 시 입력한 이름와 입력한 이름이 같아야 합니다.
                </p>
                <div>
                  <input
                    className={nicknameError && 'nicknameError'}
                    autoComplete="nickname"
                    name="nickname"
                    onChange={onChange}
                    value={nickname}
                    placeholder="이름을 입력해주세요."
                  />
                  <button className="confirm" onClick={onConfirm}>
                    확인
                  </button>

                  <StatusBox>
                    <div className="error">{nicknameError && nicknameError}</div>
                    <div className="error">{confirmFail && confirmFail}</div>
                  </StatusBox>
                </div>
              </div>
            </FindInputBox>
          </div>
        )}
        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        </Footer>
      </FindIdBox>
    </>
  );
};

export default FindId;
