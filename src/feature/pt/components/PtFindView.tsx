'use client'

import { useEffect, useMemo, useState } from "react";
import { OnboardingResponse, PtCourseListResponse } from "../type";
import PtFindList from "./PtFindList";
import KakaoMap from "@/components/ui/Map";

interface PtFindResponse {
    listResponse: PtCourseListResponse;
    onBoardingResponse: OnboardingResponse | null;
}

export default function PtFindView({listResponse, onBoardingResponse}: PtFindResponse) {
    // 데스크톱 크기 확인
    const [isDesktop, setIsDesktop] = useState(false);

    // 목록 확장 여부 (모바일일때는 위아래 스크롤 형식으로 목록 보임)
    const [isListExpanded, setIsListExpanded] = useState(false);
    
    // 헬스장 이름, id 저장
    const [organizationId, setOrganizationId] = useState({
        organName: "",
        organizationId: null as number | null,
    });

    // 선택된 헬스장 PT 목록 뽑기 (useMemo 사용해서 값 캐싱)
    const filterPtList = useMemo(() => {
        if (!organizationId.organName) return [];

        return listResponse.data.filter(
            (item) => item.businessName === organizationId.organName
        );
    }, [listResponse.data, organizationId.organName]);

    // 화면 크기 감지
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        // 창 크기 업데이트 되면 화면 크기 저장
        const updateViewport = () => setIsDesktop(mediaQuery.matches);

        updateViewport();
        // 화면 크기 바꿀 때 감지를 위한 이벤트
        mediaQuery.addEventListener("change", updateViewport);

        // 컴포넌트 사라질 때 이벤트도 제거
        return () => mediaQuery.removeEventListener("change", updateViewport);
    }, []);

    // 
    const handleOrganizationSelect = (value: { organName: string; organizationId: number | null }) => {
        setOrganizationId(value);
        setIsListExpanded(true);
    };

    const isOrganizationSelected = Boolean(organizationId.organName);

    // 모바일 UI 분기
    if (!isDesktop) {
        return (
            <div className="relative h-full w-full">
                <div
                    className="h-full w-full bg-gray-500"
                    role="region"
                    aria-label="PT 헬스장 위치 지도"
                >
                    <KakaoMap
                        latitude={onBoardingResponse?.data.preferredRegion.latitude}
                        longitude={onBoardingResponse?.data.preferredRegion.longitude}
                        ptList={listResponse.data}
                        setOrganizationId={handleOrganizationSelect}
                    />
                </div>
                <PtFindList
                    isExpanded={isListExpanded}
                    isMobileSheet
                    onExpandedChange={setIsListExpanded}
                    organizationId={organizationId.organizationId}
                    response={isOrganizationSelected ? filterPtList : listResponse.data}
                />
            </div>
        );
    }

    return (
    <>  
        {/* 데스크톱 분기 */}
        {isOrganizationSelected &&
        <PtFindList
            organizationId={organizationId.organizationId}
            response={filterPtList}
        />
        }

    <div 
        className="flex-10 w-full h-full bg-gray-500"
        role="region"
        aria-label="PT 헬스장 위치 지도">
            <KakaoMap
                latitude={onBoardingResponse?.data.preferredRegion.latitude}
                longitude={onBoardingResponse?.data.preferredRegion.longitude}
                ptList={listResponse.data}
                setOrganizationId={handleOrganizationSelect}
            />
        </div>
    </>
    );
}