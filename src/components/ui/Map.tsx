"use client";

import { PtContent } from "@/feature/pt/type";
import { useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface OrganizationId {
  organName: string;
}


interface PtFindProps {
  latitude: number;
  longitude: number;
  ptList: PtContent[];
  setOrganizationId: (value: OrganizationId) => void;
}

export default function KakaoMap({latitude, longitude, ptList, setOrganizationId}: PtFindProps) {
  
  const [selectedOrganizationName, setSelectedOrganizationName] = useState<string | null>(null);

  const handleMarkerClick = (organizationName: string) => {
    setOrganizationId({
      organName: organizationName,
    });
    setSelectedOrganizationName(organizationName);
  };
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
    {ptList.map((item) => {
      const isSelected = selectedOrganizationName === item.organizationName;

      return (
        <CustomOverlayMap
          key={item.ptCourseId}
          position={{
          lat: item.latitude,
          lng: item.longitude
          }}
        >    
        <div className="relative">
              <div className="     
              w-0 h-0
              border-[#99A1AF]
                border-l-6 border-l-transparent
                border-r-6 border-r-transparent
                border-t-6 
                "> 
              </div>
             <button
                 onClick={() => handleMarkerClick(item.organizationName)} 
                 className={`
                  absolute bottom-full left-1/2 -translate-x-1/2
                  max-w-25 px-3 py-2 border-2 bg-[#1e293994]  rounded-[10px] text-[12px]
                  hover:cursor-pointer 
                  ${isSelected ? "bg-[#beff0b] text-gray-700 font-medium" : "text-white border-[#99A1AF]"}
                  `}
              >
                  <span className="break-keep whitespace-normal text-center block">
                  {item.organizationName}
                </span>
              </button>
        </div>
            
        </CustomOverlayMap>
      );
    })}
    </Map>
  );
}
