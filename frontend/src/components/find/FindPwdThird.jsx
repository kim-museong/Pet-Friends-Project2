import styled from 'styled-components';
import { FindInputBox } from '../../lib/styles/find';

const ChangePwd = styled(FindInputBox)`
  text-align: center;
  margin-top: 100px;
  div + form {
    margin-top: 30px;
  }
`;

const StatusBox = styled.div`
  height: 45px;
  margin-bottom: 20px;
  text-align: left;
  margin: 5px auto 30px;
`;

const FindPwdThird = ({ onSubmitPwd, findPwd, onChange, error }) => {
  const { password, passwordConfirm } = findPwd;
  const { passwordError, passwordConfirmError } = error;
  return (
    <ChangePwd>
      <div>새비밀번호 입력</div>
      <form onSubmit={onSubmitPwd}>
        <div>
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            autoComplete="new-password"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <button>변경</button>
      </form>
      <StatusBox>
        <div className="error">{passwordError && passwordError}</div>
        <div className="error">{passwordConfirmError && passwordConfirmError}</div>
      </StatusBox>
    </ChangePwd>
  );
};

export default FindPwdThird;
