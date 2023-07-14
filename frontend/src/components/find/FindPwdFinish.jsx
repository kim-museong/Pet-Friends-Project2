import styled from 'styled-components';
import { FindIdBox } from '../../lib/styles/find';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const MainBox = styled(FindIdBox)`
  margin-top: 15%;

  color: ${palette.mainColor};

  .message {
    font-size: 25px;
  }

  .btn {
    display: inline-block;
    width: 400px;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${palette.mainColor};
    color: white;
    font-weight: bold;
  }
`;

const TitleBox = styled.div`
  margin: 40px 0;
  text-align: center;
  font-size: 30px;
`;

const FindPwdFinish = () => {
  return (
    <MainBox>
      <TitleBox>
        <Link to="/">Logo</Link>
      </TitleBox>
      <div className="message">비밀번호가 성공적으로 변경되었습니다.</div>
      <Link to="/auth/login" className="btn">
        로그인
      </Link>
    </MainBox>
  );
};

export default FindPwdFinish;
