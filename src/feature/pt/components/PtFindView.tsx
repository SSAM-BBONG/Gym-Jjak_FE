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

    const test = listResponse.data.filter(
        (item) => item.organizationName === organizationId.organName
    )

    console.log(test);
    

    return (
    <>  
        {organizationId.organName &&
        <PtFindList
            response={test}/>
        }

        <div className="flex-10 w-full h-full bg-gray-500">
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