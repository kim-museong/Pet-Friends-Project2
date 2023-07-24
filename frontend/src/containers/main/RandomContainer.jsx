import { useState } from 'react';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import Random from '../../components/main/Random';
import axios from '../../../node_modules/axios/index';

const RandomContainer = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [catImage, setCatImage] = useState('');
  const [dogImage, setDogImage] = useState('');

  const fetchRandomCatImage = async () => {
    const api_key = 'live_yqSvliCYf4gXrr9tUdMohOMsilTfNuAAkD1L5MZ3cflelCwf2ma4xZIgKHauzS2i';
    const api_url = 'https://api.thecatapi.com/v1/images/search';

    // await axios
    //   .get(api_url, { headers: { 'x-api-key': api_key } })
    //   .then((response) => {
    //     const data = response.data;
    //     if (data && data.length > 0) {
    //       setCatImage(data[0].url);
    //       setDogImage('');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Failed to fetch cat image:', error);
    //   });
  };

  const fetchRandomDogImage = async () => {
    const api_key = 'live_rmJqTGfHUXc6tZGW4macI8Z5pIqwUqlW0bu9xZruQMOkfa4WQJiKqZIzUVu8Yy3b';
    const api_url = 'https://api.thedogapi.com/v1/images/search';

    // await axios
    //   .get(api_url, { headers: { 'x-api-key': api_key } })
    //   .then((response) => {
    //     const data = response.data;
    //     if (data && data.length > 0) {
    //       setDogImage(data[0].url);
    //       setCatImage('');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Failed to fetch cat image:', error);
    //   });
  };

  return (
    <>
      <Random
        theme={theme}
        fetchRandomCatImage={fetchRandomCatImage}
        fetchRandomDogImage={fetchRandomDogImage}
        catImage={catImage}
        dogImage={dogImage}
      />
    </>
  );
};

export default RandomContainer;
