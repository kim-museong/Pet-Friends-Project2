import React from 'react';
import { useLocation } from 'react-router-dom';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonContainer';

const WritePage = () => {
  const location = useLocation();

  const boardType = location.pathname.split('/')[2];

  return (
    <Responsive>
      <EditorContainer boardType={boardType}></EditorContainer>
      <TagBoxContainer></TagBoxContainer>
      <WriteActionButtonContainer boardType={boardType}></WriteActionButtonContainer>
    </Responsive>
  );
};

export default WritePage;
