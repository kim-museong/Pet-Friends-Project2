import React from 'react';
import { useSelector } from 'react-redux';
import Tag from '../../components/common/Tag';

const TagContainer = () => {
  const hashtags = useSelector((state) => state.post.post.hashtags);

  return <Tag hashtags={hashtags}></Tag>;
};

export default TagContainer;
