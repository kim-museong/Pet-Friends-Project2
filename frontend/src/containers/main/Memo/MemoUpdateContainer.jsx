import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { changeMemo, memoBring, memoUpdate } from '../../../modules/main';
import MemoUpdate from '../../../components/main/Memo/MemoUpdate';
import { useEffect } from 'react';
import { useState } from 'react';

const MemoUpdateContainer = () => {
  const textareaHegiht = useRef();
  const navigate = useNavigate();
  const content = useSelector((state) => state.main.memoValue.content);
  const memo = useSelector((state) => state.main.memoValue.memo);
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
  console.log(content);

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      const { nickname } = user || '';
      dispatch(memoUpdate({ id: memo.id, content: content }));
      navigate(-1);
    },
    [dispatch, content],
  );

  const back = () => {
    console.log('뒤로가기');
    navigate(-1);
  };

  useEffect(() => {
    dispatch(memoBring(memo.content));
  }, [dispatch, memo.content]);

  return (
    <>
      <MemoUpdate content={content} onChange={onChange} textareaHegiht={textareaHegiht} onClick={onClick} back={back} />
    </>
  );
};

export default MemoUpdateContainer;
