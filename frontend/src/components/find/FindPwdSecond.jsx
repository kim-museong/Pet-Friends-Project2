import styled, { css } from 'styled-components';
import { FindInputBox } from '../../lib/styles/find';
import FindEmail from '../common/find/FindEmail';
import FindPhone from '../common/find/FindPhone';
import palette from '../../lib/styles/palette';

const FindPwdInputBox = styled(FindInputBox)`
  text-align: center;
  width: 100%;
  margin: 50px auto 0;

  .selectBox {
    width: 40%;
    margin: 0 auto;
  }
`;
const activeButtonStyles = css`
  color: ${palette.mainColor};
  border-bottom: 2px solid ${palette.mainColor};
`;

const SelectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;

  div {
    border-radius: 0;
    padding-bottom: 3px;
    ${({ active }) => active && activeButtonStyles}
  }

  input {
    width: 30px;
    margin: 20px 0;
    display: none;
  }

  label {
    padding-bottom: 5px;

    &:hover {
      color: ${palette.mainColor};
    }
  }

  div + div {
    margin: 0 10px;
  }

  input,
  label {
    cursor: pointer;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  div + div {
    margin-left: 50px;
  }
`;

const FindPwdSecond = ({ selectedRadio, radioChange, theme, email }) => {
  console.log(selectedRadio === 'phone');
  return (
    <>
      <FindPwdInputBox theme={String(theme)}>
        <FlexBox>
          <SelectBtn active={selectedRadio === 'phone'}>
            <div>
              <input
                id="findPwdPhone"
                type="radio"
                name="findPwd"
                value="phone"
                checked={selectedRadio === 'phone'}
                onChange={radioChange}
              />
              <label htmlFor="findPwdPhone">핸드폰번호</label>
            </div>
          </SelectBtn>
          {email && (
            <>
              <SelectBtn active={selectedRadio === 'email'}>
                <div>
                  <input
                    id="findPwdEmail"
                    type="radio"
                    name="findPwd"
                    value="email"
                    checked={selectedRadio === 'email'}
                    onChange={radioChange}
                  />
                  <label htmlFor="findPwdEmail">이메일주소</label>
                </div>
              </SelectBtn>
            </>
          )}
        </FlexBox>

        {email && <div className="selectBox right">{selectedRadio === 'email' && <FindEmail />}</div>}
        <div className="selectBox left">{selectedRadio === 'phone' && <FindPhone />}</div>
      </FindPwdInputBox>
    </>
  );
};

export default FindPwdSecond;
