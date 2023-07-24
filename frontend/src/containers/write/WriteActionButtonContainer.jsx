import { useCallback, useEffect, useState } from 'react';
import WriteActionButton from '../../components/write/WriteActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../modules/write';
import { useLocation } from 'react-router-dom';

const WriteActionButtonContainer = ({ boardType }) => {
  const location = useLocation();
  const boardName = location.state.boardName;
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);
  const tags = useSelector((state) => state.write.tags);
  const post = useSelector((state) => state.write.post);
  const postError = useSelector((state) => state.write.postError);
  const originPostId = useSelector((state) => state.write.originPostId);

  const dispatch = useDispatch();

  const extractImageURL = useCallback(
    (content) => {
      const regex = /<img[^>]+src="([^">]+)"/g;
      const matches = [];
      let match;
      while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
      }
      return matches;
    },
    [content],
  );

  const onSubmit = () => {
    dispatch(createPost({ boardName, title, imgUrls: extractImageURL(content), content, tags }));
  };
  const onUpdate = () => {
    dispatch(updatePost({ boardName, originPostId, title, imgUrls: extractImageURL(content), content, tags }));
  };
  return (
    <WriteActionButton
      boardType={boardType}
      title={title}
      content={content}
      post={post}
      postError={postError}
      boardName={boardName}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      isEdit={!!originPostId}
    />
  );
};

export default WriteActionButtonContainer;
