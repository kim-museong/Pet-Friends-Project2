import styled from 'styled-components';
import { FindInputBox } from '../../lib/styles/find';
import FindEmail from '../common/find/FindEmail';
import FindPhone from '../common/find/FindPhone';

const FindPwdInputBox = styled(FindInputBox)`
  text-align: center;
  width: 100%;
  margin: 50px auto 0;
  display: flex;
  justify-content: center;

  .selectBox {
    width: 40%;
    padding: 20px 10px;
  }

  .right {
    padding-left: 100px;
  }

  .left {
    padding-right: 100px;
  }
`;

const SelectBtn = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;

  input {
    width: 30px;
    margin: 20px 0;
  }
`;

const FindPwdSecond = ({ selectedRadio, radioChange, theme, email }) => {
  console.log(email);
  return (
    <>
      <FindPwdInputBox theme={String(theme)}>
        {email && (
          <div className="selectBox right">
            <SelectBtn>
              <input
                type="radio"
                name="findPwd"
                value="email"
                checked={selectedRadio === 'email'}
                onChange={radioChange}
              />
              회원정보에 등록한 이메일주소
            </SelectBtn>
            {selectedRadio === 'email' && <FindEmail />}
          </div>
        )}

        <div className="selectBox left">
          <SelectBtn>
            <input
              type="radio"
              name="findPwd"
              value="phone"
              checked={selectedRadio === 'phone'}
              onChange={radioChange}
            />
            회원정보에 등록한 핸드폰번호
          </SelectBtn>

          {selectedRadio === 'phone' && <FindPhone />}
        </div>
      </FindPwdInputBox>
    </>
  );
};

export default FindPwdSecond;
