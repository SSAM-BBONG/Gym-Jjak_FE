"use client";

import { PtCourseListData } from "@/feature/pt/type";
import { useState } from "react";
import { CustomOverlayMap, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface OrganizationId {
  organName: string;
  organizationId: number | null;
}


interface PtFindProps {
  latitude?: number ;
  longitude?: number ;
  ptList: PtCourseListData[];
  setOrganizationId: (value: OrganizationId) => void;
}

export default function KakaoMap({latitude, longitude, ptList, setOrganizationId}: PtFindProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? "",
    libraries: ["services"],
  });
  
  const [selectedOrganizationName, setSelectedOrganizationName] = useState<string | null>(null);

  const handleMarkerClick = (organizationName: string, organizationId: number) => {
    setOrganizationId({
      organName: organizationName,
      organizationId,
    });
    setSelectedOrganizationName(organizationName);
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center bg-gray-100">지도를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center bg-gray-100">지도를 불러오지 못했습니다.</div>;
  }
  return (
    // 지도 출력 컴포넌트 
    <Map
      center={{
        lat: latitude || 37.46100271829629,
        lng: longitude || 127.1651323818218,
      }}
      level={5}
      className="h-full"
      draggable={true}
      scrollwheel={true}
    >

    <MapMarker 
    position={{
      lat: latitude || 37.46100271829629,
      lng: longitude || 127.1651323818218,
      }}
    />

    {/* 맵에 나타나는 마커 관련 */}
    {ptList.map((item) => {
      const isSelected = selectedOrganizationName === item.businessName;

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
                 data-testid="organization-marker"
                 onClick={() => handleMarkerClick(item.businessName, item.organizationId)}
                 className={`
                  absolute bottom-full left-1/2 -translate-x-1/2
                  max-w-25 px-3 py-2 border-2 bg-[#1e293994]  rounded-[10px] text-[12px]
                  hover:cursor-pointer 
                  ${isSelected ? "bg-[#beff0b] text-gray-700 font-medium" : "text-white border-[#99A1AF]"}
                  `}
              >
                  <span className="pointer-events-none break-keep whitespace-normal text-center block">
                  {item.businessName}
                </span>
              </button>
        </div>
            
        </CustomOverlayMap>
      );
    })}
    </Map>
  );
}
