import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Editor from '../../components/write/Editor';
import { changeInput, initInput } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();

  const onChangeField = useCallback((key, value) => dispatch(changeInput(key, value)), [dispatch]);
  const initialize = useCallback(() => dispatch(initInput()), [dispatch]);

  useEffect(() => {
    return () => {
      initialize();
    };
  });

  // 제목 변경
  // 본문 변경

  return <Editor onChangeField={onChangeField}></Editor>;
};

export default EditorContainer;
