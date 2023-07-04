import styled from 'styled-components';
import Popularpost from '../../components/main/Popularpost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync } from '../../modules/posts';

const PostsBox = styled.div`
  display: flex;
  margin-top: 20px;
`;

const PopularpostContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getPostsAsync({ sortType: 'highestViews', boardName: 'community', limit: '5' }));
  }, [dispatch]);
  return (
    <>
      <PostsBox>
        <Popularpost posts={posts} theme={theme} />
      </PostsBox>
    </>
  );
};

export default PopularpostContainer;
