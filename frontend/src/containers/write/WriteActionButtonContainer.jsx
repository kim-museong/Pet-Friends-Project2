import WriteActionButton from '../../components/write/WriteActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../modules/write';
import { useLocation } from 'react-router-dom';

const WriteActionButtonContainer = () => {
  const location = useLocation();
  const boardName = location.state.boardName;
  const title = useSelector((state) => state.write.title);
  const content = useSelector((state) => state.write.content);
  const post = useSelector((state) => state.write.post);
  const postError = useSelector((state) => state.write.postError);

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(createPost({ boardName, title, content }));
  };
  return <WriteActionButton title={title} content={content} post={post} postError={postError} onSubmit={onSubmit} />;
};

export default WriteActionButtonContainer;
