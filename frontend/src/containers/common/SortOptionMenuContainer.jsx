import React, { useCallback, useEffect } from 'react';
import SortOptionMenu from '../../components/common/SortOptionMenu';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { selectSortType } from '../../modules/sort';

const SortOptionMenuContainer = () => {
  const dispatch = useDispatch();
  const onSelectSortType = useCallback((sortType) => dispatch(selectSortType(sortType)), [dispatch]);

  useEffect(() => {
    // 초기값 : 최신순
    onSelectSortType('newest');
  }, [onSelectSortType]);

  return <SortOptionMenu onSelectSortType={onSelectSortType}></SortOptionMenu>;
};

export default SortOptionMenuContainer;
