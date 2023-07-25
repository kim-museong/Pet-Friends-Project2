import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getHospitalList, updateHospitalList } from '../../modules/api';
import axios from 'axios';
import './kakaoMap.css';

const { kakao } = window;

const MapBlock = styled.div`
  width: 500px;
  height: 500px;
`;

const KakaoMap = ({ user }) => {
  const hospitalList = useSelector((state) => state.api.hospitalList);
  const kakaoMapRef = useRef();
  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState(null);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  // Geocoder : 주소 -> 좌표 변환
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    // defaultAddress || user.address2
    const defaultAddress = '대구광역시 중구 봉산동 53번지2';
    var cb = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setCoords(new kakao.maps.LatLng(result[0].y, result[0].x));
      }
    };
    geocoder.addressSearch(defaultAddress, cb);

    // 동물병원 목록 요청
    dispatch(getHospitalList());
  }, []);

  useEffect(() => {
    if (coords) {
      const container = kakaoMapRef.current;
      const options = {
        center: new kakao.maps.LatLng(coords.getLat(), coords.getLng()),
        level: 4,
      };
      if (!map) {
        setMap(new kakao.maps.Map(container, options));
      }
      const zoomControl = new kakao.maps.ZoomControl();

      if (map) {
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      }
    }
  }, [coords]);

  useEffect(() => {
    if (hospitalList) {
      console.log('동물 병원 리스트 갱신됨', hospitalList);
      hospitalList.map((hospital, index) => {
        // 동물 병원 좌표 정보 없으면 주소값을 기반으로 생성해서 db에 좌표 업데이트
        if (hospital.latitude === null) {
          geocoder.addressSearch(hospital.location, function (result, status) {
            console.log(`동물병원 ${hospital.location}의 좌표 업데이트(${result[0].y}, ${result[0].x})`);
            if (status === kakao.maps.services.Status.OK) {
              dispatch(
                updateHospitalList({
                  hospitalId: hospital.id,
                  latitude: result[0].y,
                  longitude: result[0].x,
                }),
              );
            }
          });
        }
        // 좌표를 기반으로 지도에 marker 표시
        const coords = new kakao.maps.LatLng(hospital.latitude, hospital.longitude);
        const marker = new kakao.maps.Marker({
          position: coords,
          map: map,
        });

        // 커스텀 오버레이
        var content =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' +
          `            카카오 스페이스닷원${hospital.id}` +
          '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
          '        </div>' +
          '        <div class="body">' +
          '            <div class="img">' +
          '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
          '           </div>' +
          '            <div class="desc">' +
          '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
          '            </div>' +
          '        </div>' +
          '    </div>' +
          '</div>';

        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          if (overlay.getMap()) {
            overlay.setMap(null);
          } else {
            overlay.setMap(map);
          }
        });
      });
    }
  }, [hospitalList]);

  function closeOverlay() {
    console.log('x버튼 클릭됨');
  }

  return <>{<MapBlock ref={kakaoMapRef}></MapBlock>}</>;
};

export default KakaoMap;
