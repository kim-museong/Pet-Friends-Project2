import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Memo from '../../../components/main/Memo/Memo';
import { changeMemo, searchInit, getMemosAsync, initForm } from '../../../modules/main';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const MemoContainer = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memos, user, search, loading } = useSelector(({ main, user, loading }) => ({
    memos: main.memoValue.memos,
    user: user.user,
    search: main.memoValue.search,
    loading: loading['main/GET_MEMOS'],
  }));

  const { id } = user || '';

  const top = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤을 위해 behavior를 'smooth'로 설정합니다.
    });
  }, []);

  const showSearch = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

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
      if (search) {
        if (e.keyCode === 13) {
          navigate(`/memo/${search}`);
          dispatch(getMemosAsync({ id, search }));
        }
      }
    },
    [dispatch, id, navigate, search],
  );

  useEffect(() => {
    dispatch(initForm('memoValue'));
    dispatch(getMemosAsync({ id: id }));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>메모장</title>
      </Helmet>
      <Memo
        user={user}
        memos={memos}
        top={top}
        show={show}
        search={search}
        loading={loading}
        showSearch={showSearch}
        formattedTime={formattedTime}
        onChange={onChange}
        searchClear={searchClear}
        searchEnter={searchEnter}
      />
    </>
  );
};

export default MemoContainer;
