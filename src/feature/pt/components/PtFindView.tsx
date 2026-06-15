'use client'

import { useState } from "react";
import { OnboardingResponse, PtListResponse } from "../type";
import PtFindList from "./PtFindList";
import KakaoMap from "@/components/ui/Map";

interface PtFindResponse {
    listResponse: PtListResponse;
    onBoardingResponse: OnboardingResponse
}

export default function PtFindView({listResponse, onBoardingResponse}: PtFindResponse) {
    const [organizationId, setOrganizationId] = useState({
        organName: "",
    });

    const filterPtList = listResponse.data.filter(
        (item) => item.organizationName === organizationId.organName
    )    

    return (
    <>  
        {organizationId.organName && filterPtList.length > 0 &&
        <PtFindList
            response={filterPtList}/>
        }

    <div 
        className="flex-10 w-full h-full bg-gray-500"
        role="region"
        aria-label="PT 헬스장 위치 지도">
            <KakaoMap
                latitude={onBoardingResponse.data.preferredRegion.latitude}
                longitude={onBoardingResponse.data.preferredRegion.longitude}
                ptList={listResponse.data}
                setOrganizationId={setOrganizationId}
            />
        </div>
    </>
    );
}