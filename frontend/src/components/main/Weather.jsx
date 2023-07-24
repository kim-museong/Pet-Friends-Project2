import styled from 'styled-components';
import { WiCloudy, WiRain, WiDaySunny } from 'react-icons/wi';
import palette from '../../lib/styles/palette';

const WeatherBox = styled.div`
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  margin-top: 20px;
  padding: 20px 40px;
  height: 222px;

  hr {
    margin-top: 5px;
  }
`;

const WeatherStatusBox = styled.div`
  padding: 10px;
`;

const WeatherImg = styled.div`
  width: 120px;
  height: 120px;
  font-size: 120px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 24px;
  }
`;

const WeatherDetailBox = styled.div`
  text-align: center;

  .weather {
    margin: 20px 0 10px;
    font-weight: bold;
    font-size: 20px;
  }

  .temp {
    font-size: 30px;
  }

  p + p {
    margin-left: 10px;
  }
`;

const NotWeather = styled.div`
  height: 222px;
  margin-top: 60px;
  text-align: center;
  color: ${palette.border};
`;

const Weather = ({ lat, lon, weather, theme }) => {
  const weatherStatus = {
    Clear: '맑음',
    Clouds: '구름',
    Rain: '비',
  };

  const convertKelvinToCelsius = (kelvin) => kelvin - 273.15;

  if (weather === '' || lat === null || lon === null) {
    return (
      <WeatherBox theme={String(theme)}>
        <NotWeather>
          날씨 불러오는 중...
          <p>*위치정보 허용이 안 되어있으면 못 불러옵니다.</p>
        </NotWeather>
      </WeatherBox>
    );
  }

  return (
    <>
      <WeatherBox theme={String(theme)}>
        <FlexBox>
          <p className="title">날씨</p> <p>{weather && weather.name}</p>
        </FlexBox>

        <hr />
        <FlexBox style={{ justifyContent: 'center' }}>
          <WeatherStatusBox>
            <WeatherImg>
              {weather && (
                <>
                  {weatherStatus[weather.weather[0].main] === '구름' && <WiCloudy style={{ color: 'gray' }} />}
                  {weatherStatus[weather.weather[0].main] === '비' && <WiRain style={{ color: 'rgb(0,150,256)' }} />}
                  {weatherStatus[weather.weather[0].main] === '맑음' && <WiDaySunny style={{ color: 'red' }} />}
                </>
              )}
            </WeatherImg>
          </WeatherStatusBox>

          <WeatherDetailBox>
            <p className="weather">{weather && weatherStatus[weather.weather[0].main]}</p>
            <p className="temp"> {convertKelvinToCelsius(weather && weather.main.temp).toFixed(1)}°C</p>
            <p className="feel">
              ( 체감 온도: {convertKelvinToCelsius(weather && weather.main.feels_like).toFixed(1)}°C )
            </p>
          </WeatherDetailBox>
        </FlexBox>
      </WeatherBox>
    </>
  );
};

export default Weather;
