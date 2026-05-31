"use client";

import { PtContent } from "@/feature/pt/type";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";


interface PtFindProps {
  latitude: number;
  longitude: number;
  ptList: PtContent[];
}

export default function KakaoMap({latitude, longitude, ptList}: PtFindProps) {

  // const handleMarkerClick = () => {
  //   ptList.filter()
  // }

  return (
    // 지도 출력 컴포넌트 
    <Map
      center={{
        lat: latitude,
        lng: longitude,
      }}
      level={3}
      className="h-full"
      draggable={true}
      scrollwheel={true}
    >
    <MapMarker 
      position={{
        lat: latitude,
        lng: longitude,
        }}
    />
    {/* 맵에 나타나는 마커 관련 */}
    {ptList.map((item) => (
      <CustomOverlayMap
            key={item.ptCourseId}
        position={{
        lat: item.latitude,
        lng: item.longitude,
        }}
      >
           <div 
              className="w-20 h-10 rounded-[10px] bg-[#BFFF0B] flex flex-col gap-5" 
            > 
              {item.organizationName}

           </div>
      </CustomOverlayMap>
    ))}
    </Map>
  );
}