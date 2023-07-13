import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeInput } from '../../modules/write';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.write.tags);
  const postId = useSelector((state) => state.write.originPostId);

  const onChangeTags = (nextTags) => {
    dispatch(changeInput('tags', nextTags));
  };

  return <TagBox onChangeTags={onChangeTags} postId={postId} tags={tags} />;
};

export default TagBoxContainer;
