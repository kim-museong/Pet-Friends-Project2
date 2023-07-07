import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchOptionMenu from '../../components/common/SearchOptionMenu';
import { selectSearchCategory, selectSearchKeyword } from '../../modules/search';

const SearchOptionMenuContainer = () => {
  const dispatch = useDispatch();
  const onSelectSearchKeyword = useCallback(
    (searchKeyword) => dispatch(selectSearchKeyword(searchKeyword)),
    [dispatch],
  );
  const onSelectSearchCategory = useCallback(
    (searchCategory) => dispatch(selectSearchCategory(searchCategory)),
    [dispatch],
  );

  useEffect(() => {
    // 초기값 : ''
    onSelectSearchKeyword('');
    // 초기값 : 제목+내용
    onSelectSearchCategory('titleDetail');
  });

  return (
    <SearchOptionMenu
      onSelectSearchKeyword={onSelectSearchKeyword}
      onSelectSearchCategory={onSelectSearchCategory}
    ></SearchOptionMenu>
  );
};

export default SearchOptionMenuContainer;
