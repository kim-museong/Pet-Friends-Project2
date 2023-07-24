import { useEffect, useState } from 'react';
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

  const [imgUrl, setImgUrl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const matches = content.match(regex);
    if (matches) {
      const imgUrls = matches.map((match) => {
        const regex = /<img[^>]+src="([^">]+)"/;
        return match.match(regex)[1];
      });
      // imgUrls 값을 imgUrl 상태로 설정합니다.
      setImgUrl(imgUrls);
    }
  }, [content]);

  const onSubmit = () => {
    dispatch(createPost({ boardName, title, imgUrl, content, tags }));
  };
  const onUpdate = () => {
    dispatch(updatePost({ boardName, originPostId, title, imgUrl, content, tags }));
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
