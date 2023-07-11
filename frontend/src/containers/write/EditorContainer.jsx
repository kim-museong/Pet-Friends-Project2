import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Editor from '../../components/write/Editor';
import { changeInput, initInput } from '../../modules/write';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const EditorContainer = () => {
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);
  const postId = useSelector((state) => state.write.originPostId);

  const dispatch = useDispatch();
  const onChangeField = useCallback((key, value) => dispatch(changeInput(key, value)), [dispatch]);
  const initialize = useCallback(() => dispatch(initInput()), [dispatch]);

  useEffect(() => {
    return () => {
      console.log('editor 페이지를 초기화 합니다.');
      initialize();
    };
  }, []);

  // 제목 변경
  // 본문 변경

  return <Editor onChangeField={onChangeField} title={title} content={content} postId={postId}></Editor>;
};

export default EditorContainer;
