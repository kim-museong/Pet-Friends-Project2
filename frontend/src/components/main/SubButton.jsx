import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import { FaStamp } from 'react-icons/fa';
import { BsTable } from 'react-icons/bs';
import { CiMemoPad } from 'react-icons/ci';
import { GiCardRandom } from 'react-icons/gi';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const SubBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 40px;
  cursor: pointer;

  .btn {
    text-align: center;
    color: ${palette.mainColor};
    font-weight: bold;

    svg {
      border-radius: 0;
      margin: 5px 0;
      color: ${palette.mainColor};
      font-size: 40px;
    }
  }

  .memo {
    position: relative;
  }

  .memoTitle {
    background: ${palette.mainColor};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 3px;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .line {
    border: 1px dashed ${palette.border};
    margin-top: 22px;
  }
`;

const SubBtn = styled.button`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  border: none;
  margin: 0 5px;

  ${({ isConfirm }) => !isConfirm && 'cursor: pointer'};

  &:hover {
    ${({ isConfirm }) => !isConfirm && ` border: 1px solid ${palette.border}`};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const SubButton = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  const [isConfirm, setIsConfirm] = useState(null);

  const onClick = useCallback(
    (type) => {
      if (user) {
        const url = `/${type}`;
        const Options = `width=${type === 'attendance' ? '700' : '500'},height=${
          type === 'attendance' ? '800' : '600'
        },scrollbars=yes,resizable=no`;
        window.open(url, '', Options);
      } else {
        navigator(`/${type}`);
      }
    },
    [user, navigator],
  );
  const onAttend = async () => {
    const { userId, id } = user;
    if (!user) {
      return;
    } else {
      console.log('출석');
      const response = await axios.post('/user/attendance', { userId, id });
      console.log(response);
      confirm();
    }
  };

  const confirm = useCallback(async () => {
    if (user) {
      const { userId } = user;
      if (userId === null) {
        return;
      } else {
        const response = await axios.post('/user/isAttendance', { userId });
        setIsConfirm(response.data);
        console.log('검사', isConfirm);
      }
    } else {
      setIsConfirm('');
    }
  }, [isConfirm, user]);

  useEffect(() => {
    confirm();
  }, [confirm]);

  return (
    <>
      <SubBtnBox theme={String(theme)}>
        <SubBtn theme={String(theme)} className="btn" onClick={onAttend} disabled={isConfirm} isConfirm={isConfirm}>
          <FaStamp />
          <div>출석{isConfirm ? '완료' : '체크'}</div>
        </SubBtn>
        <SubBtn theme={String(theme)} className="btn" onClick={() => onClick('attendance')}>
          <BsTable />
          <div>출석표</div>
        </SubBtn>
        <SubBtn theme={String(theme)} className="btn" onClick={() => onClick('random')}>
          <GiCardRandom />
          <div>랜덤사진</div>
        </SubBtn>
        <SubBtn theme={String(theme)} className="btn" onClick={() => onClick('memo')}>
          <CiMemoPad />
          <div>메모장</div>
        </SubBtn>
      </SubBtnBox>
    </>
  );
};

export default SubButton;
