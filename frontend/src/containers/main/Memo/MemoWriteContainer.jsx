import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import axios from 'axios';
import { changeMemo } from '../../../modules/main';
import MemoWrite from '../../../components/main/Memo/MemoWrite';

const MemoWriteContainer = () => {
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
        navigate('/memo/');
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('글 작성 필');
    }
  };

  const back = () => {
    console.log('뒤로가기');
    navigate(-1);
  };

  return (
    <>
      <MemoWrite onClick={onClick} onChange={onChange} textareaHegiht={textareaHegiht} content={content} back={back} />
    </>
  );
};

export default MemoWriteContainer;
