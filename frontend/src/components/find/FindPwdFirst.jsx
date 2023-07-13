import styled from 'styled-components';
import { FindInputBox, FindIdBox } from '../../lib/styles/find';
import { Link } from 'react-router-dom';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 10px auto;
`;

const MainBox = styled(FindIdBox)`
  margin-top: 5%;
`;

const FindPwdInputBox = styled(FindInputBox)`
  button {
    margin-top: 10px;
  }
`;

const FindPwdFirst = ({ onChange, onConfirm, error, findPwd }) => {
  const { userIdError, notUserError } = error;
  const { userId } = findPwd || {};

  return (
    <>
      <MainBox>
        <div>
          <Link to="/">Logo</Link>
          <h1>비밀번호 찾기</h1>
        </div>
        <FindPwdInputBox>
          <input
            autoComplete="userId"
            name="userId"
            onChange={onChange}
            value={userId}
            placeholder="아이디를 입력해주세요."
          />
          <button onClick={onConfirm}> 확인</button>
          <StatusBox>
            <div className="error">{userIdError && userIdError}</div>
            <div className="error">{notUserError && notUserError}</div>
          </StatusBox>
        </FindPwdInputBox>
        <div>
          <p>아이디가 기억나지 않는다면 ? 아이디찾기</p>
        </div>
      </MainBox>
    </>
  );
};

export default FindPwdFirst;
