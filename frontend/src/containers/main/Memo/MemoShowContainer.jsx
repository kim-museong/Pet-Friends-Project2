import MemoShow from '../../../components/main/Memo/MemoShow';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMemoAsync, memoUpdate } from '../../../modules/main';

const MemoShowContainer = () => {
  const navigate = useNavigate();
  const { nickname, id } = useParams();
  const dispatch = useDispatch();
  const memo = useSelector((state) => state.main.memo.memo);
  const user = useSelector((state) => state.user.user);
  const content = useSelector((state) => state.main.memo.content);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const formattedTime = (date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const update = useCallback(() => {
    navigate(`/memo/${user.id}/update`);
  }, [navigate, user.id]);

  const delBtn = useCallback(() => {}, []);

  useEffect(() => {
    const userId = user.id;
    try {
      dispatch(getMemoAsync({ id, userId }));
    } catch (e) {
      console.log(e);
    }
  }, [id, dispatch, user.id]);

  return (
    <>
      <MemoShow memo={memo} user={user} back={back} formattedTime={formattedTime} update={update} />
    </>
  );
};

export default MemoShowContainer;
