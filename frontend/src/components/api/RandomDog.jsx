import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRandomDogPicture } from '../../modules/api';

const MediaBlock = styled.div`
  width: 30vw;
`;

const Image = styled.img`
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
`;

const RandomDog = () => {
  const dispatch = useDispatch();
  const dogPicture = useSelector((state) => state.api.dogPicture);
  const loading = useSelector((state) => state.loading['api/GET_RANDOM_DOG_PICTURE']);

  useEffect(() => {
    dispatch(getRandomDogPicture());
  }, [dispatch]);

  return (
    <MediaBlock>
      {!loading && dogPicture && (
        <>
          {dogPicture.url.endsWith('.mp4') ? (
            <Video controls autoPlay muted loop>
              <source src={dogPicture.url} type="video/mp4" />
            </Video>
          ) : (
            <Image src={dogPicture.url} alt="random dog" />
          )}
        </>
      )}
      {loading && <Image src={'./images/loading_spinner.gif'} alt="random dog" />}
      {/* {loading ? (
        <Image src={'./images/loading_spinner.gif'} alt="random dog" />
      ) : (
        <Image src={dogPicture.url} alt="random dog" />
      )} */}
    </MediaBlock>
  );
};

export default RandomDog;
