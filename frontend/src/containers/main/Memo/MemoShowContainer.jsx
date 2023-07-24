import MemoShow from '../../../components/main/Memo/MemoShow';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMemoAsync, memoDelete } from '../../../modules/main';

const MemoShowContainer = () => {
  const navigate = useNavigate();
  const { nickname, id } = useParams();
  const dispatch = useDispatch();
  const { memo, user, loading } = useSelector(({ main, user, loading }) => ({
    memo: main.memoValue.memo,
    user: user.user,
    loading: loading['main/GET_MEMO'],
  }));
  console.log(memo);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const update = useCallback(() => {
    navigate(`/memo/${user.id}/update`);
  }, [navigate, user.id]);

  const delBtn = useCallback(() => {
    console.log(memo);
    const { id } = memo || '';
    console.log(memo, id);
    dispatch(memoDelete({ id }));
    navigate(-1);
  }, [dispatch, memo]);

  useEffect(() => {
    const userId = user.id;
    dispatch(getMemoAsync({ id, userId }));
  }, [dispatch]);

  return (
    <>
      <MemoShow memo={memo} user={user} back={back} update={update} delBtn={delBtn} loading={loading} />
    </>
  );
};

export default MemoShowContainer;
