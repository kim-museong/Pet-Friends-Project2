import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const MapBlock = styled.div`
  width: 500px;
  height: 500px;
`;

const KakaoMap = () => {
  const kakaoMapRef = useRef();

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    const defaultAddress = '대구광역시 중구 봉산동 53번지2';
    var cb = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const container = kakaoMapRef.current;
        const options = {
          center: new kakao.maps.LatLng(coords.getLat(), coords.getLng()),
          level: 4,
        };
        let map = new kakao.maps.Map(container, options);
        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      }
    };
    geocoder.addressSearch(defaultAddress, cb);
    // const geocoder = new kakao.maps.services.Geocoder();
    // let defaultAddress = '대구광역시 중구 봉산동 53번지2';
    // // 로그인한 유저의 주소를 지도의 중심좌표로 설정
    // // 주소로 좌표를 검색합니다
    // geocoder.addressSearch(defaultAddress, searchCB);
    // function searchCB(result, status) {
    //   // 정상적으로 검색이 완료됐으면
    //   if (status === kakao.maps.services.Status.OK) {
    //     const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 좌표 구함
    //     const mapContainer = kakaoMapRef.current; // 지도를 표시할 div
    //     const mapOption = {
    //       center: new kakao.maps.LatLng(coords.getLat(), coords.getLng()), // 지도의 중심좌표를 로그인한 유저의 주소로 설정
    //       //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //       level: 4, // 지도의 확대 레벨
    //     };
    //     let map = new kakao.maps.Map(mapContainer, mapOption);
    //     // 지도에 확대 축소 컨트롤을 생성한다
    //     var zoomControl = new kakao.maps.ZoomControl();
    //     // 지도의 우측에 확대 축소 컨트롤을 추가한다
    //     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //   }
    // }
    // const container = kakaoMapRef.current;
    // const options = {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // };
    // const map = new kakao.maps.Map(container, options);
    // var ps = new kakao.maps.services.Places();
    // var callback = function (result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     console.log(result);
    //   }
    // };
    // ps.keywordSearch('대구광역시 중구 봉산동 53번지2', callback);
    // console.log('kakao map 호출');
    // kakao.maps.load();
    // const geocoder = new kakao.maps.services.Geocoder();
    // let defaultAddress = '대구광역시 중구 봉산동 53번지2';
    // // 로그인한 유저의 주소를 지도의 중심좌표로 설정
    // // 주소로 좌표를 검색합니다
    // geocoder.addressSearch(defaultAddress, searchCB);
    // function searchCB(result, status) {
    //   // 정상적으로 검색이 완료됐으면
    //   if (status === kakao.maps.services.Status.OK) {
    //     const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 좌표 구함
    //     const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    //     const mapOption = {
    //       center: new kakao.maps.LatLng(coords.getLat(), coords.getLng()), // 지도의 중심좌표를 로그인한 유저의 주소로 설정
    //       //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //       level: 4, // 지도의 확대 레벨
    //     };
    //     let map = new kakao.maps.Map(mapContainer, mapOption);
    //     // 지도에 확대 축소 컨트롤을 생성한다
    //     var zoomControl = new kakao.maps.ZoomControl();
    //     // 지도의 우측에 확대 축소 컨트롤을 추가한다
    //     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //   }
    // }
    // geocoder.addressSearch(defaultAddress, function (result, status) {
    //   // 정상적으로 검색이 완료됐으면
    //   if (status === kakao.maps.services.Status.OK) {
    //     // const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 좌표 구함
    //     const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    //     const mapOption = {
    //       //   center: new kakao.maps.LatLng(coords.getLat(), coords.getLng()), // 지도의 중심좌표를 로그인한 유저의 주소로 설정
    //       center: new kakao.maps.LatLng(33.450701, 126.570667),
    //       level: 4, // 지도의 확대 레벨
    //     };
    //     let map = new kakao.maps.Map(mapContainer, mapOption);
    //     // 지도에 확대 축소 컨트롤을 생성한다
    //     var zoomControl = new kakao.maps.ZoomControl();
    //     // 지도의 우측에 확대 축소 컨트롤을 추가한다
    //     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //   }
    // });
    // const container = kakaoMapRef.current;
    // const options = {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // };
    // const map = new kakao.maps.Map(container, options);
    // let zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return <>{<MapBlock id="map" ref={kakaoMapRef}></MapBlock>}</>;
};

export default KakaoMap;
