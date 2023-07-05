import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer';
import { useLocation } from 'react-router-dom';

const WritePage = () => {
  const location = useLocation();
  const boardName = location.state.boardName;
  return (
    <Responsive>
      <EditorContainer></EditorContainer>
      <WriteActionButtonContainer boardName={boardName}></WriteActionButtonContainer>
    </Responsive>
  );
};

export default WritePage;
