import Weather from '../../components/main/Weather';
import React, { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';

const WeatherContainer = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState('');
  const lang = 'kr';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getWeather = async () => {
    try {
      const response = '';
      // const response = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=ffa479f2c43cdbb7a7e254badcc832b2`,
      // );
      if (response) {
        setWeather(response.data);
      } else {
        setWeather(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <Weather lat={lat} lon={lon} weather={weather} />
    </div>
  );
};

export default WeatherContainer;
