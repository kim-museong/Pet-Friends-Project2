import { useDispatch, useSelector } from 'react-redux';
import MemoSearch from '../../../components/main/Memo/MemoSearch';
import { useCallback } from 'react';
import { changeMemo, getMemoAsync, searchInit } from '../../../modules/main';
import { useNavigate } from 'react-router-dom';

const MemoSearchContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, memos, user } = useSelector(({ main, user }) => ({
    search: main.memo.search,
    memos: main.memo.memos,
    user: user.user,
  }));

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeMemo({ name, value }));
    },
    [dispatch],
  );

  const changeDate = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const result = `${year}-${month}-${day}`;

    return result;
  };

  const searchClear = useCallback(() => {
    dispatch(searchInit());
  }, [dispatch]);

  const searchEnter = useCallback(
    (e) => {
      const { id } = user || '';
      if (e.keyCode === 13) {
        navigate(`/memo/${search}`);
        dispatch(getMemoAsync({ id, search }));
      }
    },
    [dispatch, navigate, search, user],
  );

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <MemoSearch
        search={search}
        memos={memos}
        user={user}
        changeDate={changeDate}
        onChange={onChange}
        searchClear={searchClear}
        searchEnter={searchEnter}
        back={back}
      />
    </>
  );
};

export default MemoSearchContainer;
