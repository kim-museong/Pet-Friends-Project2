import { useDispatch, useSelector } from 'react-redux';
import MemoSearch from '../../../components/main/Memo/MemoSearch';
import { useCallback } from 'react';
import { changeMemo, getMemosAsync, initForm, searchInit } from '../../../modules/main';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MemoSearchContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, memos, user, loading } = useSelector(({ main, user, loading }) => ({
    search: main.memoValue.search,
    memos: main.memoValue.memos,
    user: user.user,
    loading: loading['main/GET_MEMOS'],
  }));

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeMemo({ name, value }));
    },
    [dispatch],
  );

  const searchClear = useCallback(() => {
    dispatch(searchInit());
  }, [dispatch]);

  const searchEnter = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        navigate(`/memo/${search}`);
      }
    },
    [dispatch, navigate, search, user],
  );

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const { id } = user || '';
    dispatch(initForm('memo'));
    console.log('가져오기');
    dispatch(getMemosAsync({ id, search }));
  }, [dispatch]);

  return (
    <>
      <MemoSearch
        search={search}
        memos={memos}
        user={user}
        loading={loading}
        onChange={onChange}
        searchClear={searchClear}
        searchEnter={searchEnter}
        back={back}
      />
    </>
  );
};

export default MemoSearchContainer;
