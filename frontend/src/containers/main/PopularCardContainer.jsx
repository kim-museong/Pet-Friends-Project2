import { useEffect } from 'react';
import PopularCard from '../../components/main/PopularCard';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { getCardAsync } from '../../modules/main';

const PopularCardContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.main.cardPosts);

  useEffect(() => {
    dispatch(getCardAsync({ sortType: 'highestViews', boardName: 'picture', limit: '9' }));
  }, [dispatch]);

  return (
    <>
      <PopularCard posts={posts} />
    </>
  );
};

export default PopularCardContainer;
