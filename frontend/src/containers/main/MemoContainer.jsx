import { useDispatch, useSelector } from 'react-redux';
import Memo from '../../components/main/Memo';
import { useEffect } from 'react';
import { getMemoAsync, initForm } from '../../modules/main';

const MemoContainer = () => {
  const dispatch = useDispatch();
  const memo = useSelector((state) => state.main.memo.memo);
  const user = useSelector((state) => state.user.user);

  const { id } = user || '';

  useEffect(() => {
    dispatch(initForm('memo'));
    dispatch(getMemoAsync(id));
  }, [dispatch, id]);

  return (
    <>
      <Memo memo={memo} />
    </>
  );
};

export default MemoContainer;
