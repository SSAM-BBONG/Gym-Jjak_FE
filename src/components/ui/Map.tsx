"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    // 지도 출력 컴포넌트 
    <Map
      center={{
        lat: 37.46098,
        lng: 127.16515,
      }}
      level={3}
      className="h-full"
    >
        {/* 맵에 나타나는 마커 관련 */}
      <MapMarker
        position={{
        lat: 37.46098,
        lng: 127.16515,
        }}
      />
    </Map>
  );
}