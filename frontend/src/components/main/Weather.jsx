import styled from 'styled-components';
import { WiCloudy } from 'react-icons/wi';
import palette from '../../lib/styles/palette';

const WeatherBox = styled.div`
  width: 350px;
  border: 1px solid ${palette.border};
  margin-top: 20px;
  padding: 20px;
  text-align: center;
`;

const WeatherStatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 20px;
  color: powderblue;
  padding: 10px;
`;

const WeatherImg = styled.div`
  width: 120px;
  height: 120px;
  font-size: 120px;
`;

const WeatherDetailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  p + p {
    margin-left: 10px;
  }
`;

const Weather = ({ lat, lon, weather }) => {
  const weatherStatus = {
    Clear: '맑음',
    Clouds: '구름',
    Rain: '비',
  };

  const convertKelvinToCelsius = (kelvin) => kelvin - 273.15;

  if (weather === null || lat === null || lon === null) {
    return (
      <>
        <WeatherBox>
          날씨 불러오는 중...
          <p style={{ color: 'rgb(150,150,150)', fontSize: '14px' }}>*위치정보 허용이 안 되어있으면 못 불러옵니다.</p>
        </WeatherBox>
      </>
    );
  }

  return (
    <WeatherBox>
      <h1>오늘 날씨</h1>
      <WeatherStatusBox>
        <WeatherImg>
          <WiCloudy style={{ color: 'powderblue' }} />
        </WeatherImg>
        <div>
          <p>{weather && weather.name}</p>
          <p>날씨 상태: {weather && weatherStatus[weather.weather[0].main]}</p>
        </div>
      </WeatherStatusBox>

      <WeatherDetailBox>
        <p>습도: {weather && weather.main.humidity}%</p>
        <p>기온: {convertKelvinToCelsius(weather && weather.main.temp).toFixed(1)}°C</p>
        <p>체감 온도: {convertKelvinToCelsius(weather && weather.main.feels_like).toFixed(1)}°C</p>
      </WeatherDetailBox>
    </WeatherBox>
  );
};

export default Weather;
