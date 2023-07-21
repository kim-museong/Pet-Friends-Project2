import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { changeMemo } from '../../modules/main';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';

const WriteBox = styled.div`
  width: 100%;
`;

const Title = styled.div`
  height: 30%;
  border-bottom: 1px solid ${palette.border};
  border-radius: 0;
  padding: 15px;
  text-align: right;

  button {
    padding: 5px 20px;
    border: none;
    background: ${palette.mainColor};
    font-weight: bold;
    color: white;

    &:hover {
      background: ${palette.border};
    }
  }
`;

const Content = styled.textarea`
  width: 100%;
  padding: 20px;
  border-radius: 0;
  resize: none;
  overflow: hidden;
  border: none;
  outline: none;
  font-size: 20px;
`;

const MemoWrite = () => {
  const textareaHegiht = useRef();
  const navigate = useNavigate();
  const content = useSelector((state) => state.main.memo.content);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      textareaHegiht.current.style.height = 'auto';
      textareaHegiht.current.style.height = textareaHegiht.current.scrollHeight + 'px';

      dispatch(changeMemo(value));
    },
    [dispatch],
  );

  const onClick = () => {
    const { id } = user || '';
    if (content !== '') {
      try {
        console.log(id, content);
        axios.post('/user/saveMemo', { content: content, id: id });
        console.log('등록 성공!');
        navigate('/memo');
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('글 작성 필');
    }
  };

  return (
    <>
      <WriteBox>
        <Title>
          <button onClick={onClick}>글쓰기</button>
        </Title>
        <Content rows={1} ref={textareaHegiht} onChange={onChange} placeholder="내용" autoFocus value={content} />
      </WriteBox>
    </>
  );
};

export default MemoWrite;
