import Weather from '../../components/main/Weather';
import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const WeatherContainer = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState('');
  const lang = 'kr';

  const getWeather = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=ffa479f2c43cdbb7a7e254badcc832b2`,
      );
      if (response) {
        setWeather(response.data);
      } else {
        setWeather(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, [lat, lon]);

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

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <Weather lat={lat} lon={lon} weather={weather} theme={theme} />
    </div>
  );
};

export default WeatherContainer;
