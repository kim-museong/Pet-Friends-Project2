import styled from 'styled-components';
import Popularpost from '../../components/main/Popularpost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularAsync } from '../../modules/main';

const PostsBox = styled.div`
  display: flex;
  margin-top: 25px;
`;

const PopularpostContainer = () => {
  const dispatch = useDispatch();
  const pupularPosts = useSelector((state) => state.main.popularPost);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getPopularAsync({ sortType: 'highestViews', boardName: 'community', limit: '5' }));
  }, [dispatch]);
  return (
    <>
      <PostsBox>
        <Popularpost pupularPosts={pupularPosts} theme={theme} />
      </PostsBox>
    </>
  );
};

export default PopularpostContainer;
