import styled from 'styled-components';
import { FindInputBox, FindIdBox } from '../../lib/styles/find';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 10px auto;
`;

const MainBox = styled(FindIdBox)`
  .findId {
    margin-top: 30px;
    font-size: 18px;
    color: rgb(150, 150, 150);
  }

  .findIdLink {
    color: ${palette.mainColor};
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FindPwdFirst = ({ onChange, onConfirm, error, findPwd, theme }) => {
  const { userIdError, notUserError } = error || '';
  const { userId } = findPwd || {};

  return (
    <>
      <MainBox>
        <div>
          <h3>비밀번호를 재설정할 아이디를 입력해 주세요.</h3>
        </div>
        <FindInputBox theme={String(theme)}>
          <input
            autoComplete="userId"
            name="userId"
            onChange={onChange}
            value={userId}
            placeholder="아이디를 입력해주세요."
            className={userIdError || notUserError ? 'userIdError' : ''}
          />

          <button onClick={onConfirm}> 다음</button>
          <StatusBox>
            <div className="error">{userIdError && userIdError}</div>
            <div className="error">{notUserError && notUserError}</div>
          </StatusBox>
        </FindInputBox>
        <div className="findId">
          <p>
            아이디가 기억나지 않습니까?
            <Link to="/auth/credentials?type=findId" className="findIdLink">
              아이디찾기
            </Link>
          </p>
        </div>
      </MainBox>
    </>
  );
};

export default FindPwdFirst;
