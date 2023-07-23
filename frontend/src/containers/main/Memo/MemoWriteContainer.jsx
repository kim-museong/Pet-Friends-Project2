import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { changeMemo, memoWrite } from '../../../modules/main';
import MemoWrite from '../../../components/main/Memo/MemoWrite';

const MemoWriteContainer = () => {
  const textareaHegiht = useRef();
  const navigate = useNavigate();
  const content = useSelector((state) => state.main.memoValue.content);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      textareaHegiht.current.style.height = 'auto';
      textareaHegiht.current.style.height = textareaHegiht.current.scrollHeight + 'px';

      dispatch(changeMemo({ name, value }));
    },
    [dispatch],
  );

  const onClick = useCallback(() => {
    const { id } = user || '';
    if (content !== '') {
      dispatch(memoWrite({ id, content }));
      navigate('/memo');
    } else {
      console.log('글 작성 필');
    }
  }, [dispatch, navigate, content]);

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
