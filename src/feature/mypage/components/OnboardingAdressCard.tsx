'use client'

import SearchAdressModal from "@/app/(user)/auth/onboarding/SearchAdressModal";
import useModal from "@/components/hooks/useModal";
import { MyOnboardingPurpose } from "@/components/ui/image";
import { useState } from "react";

interface DaumAddressData {
    roadAddress: string;
    sido: string;
    sigungu: string;
    bname: string;
    roadname: string;
}

interface KakaoAddressResult {
    x: string;
    y: string;
}

export default function OnboardingAdressCard({ title, content }: { title: string, content: string }) {
    const [userAdress, setUserAddress] = useState({
        "sido": "",
        "sigungu": "",
        "eupmyeondong": "",
        "fullName": "",
        "latitude": 0,
        "longitude": 0
    })

    const completeHandler = (data: DaumAddressData) => {
        const selectedRoadAddress = data.roadAddress;

        window.kakao.maps.load(() => {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(
                selectedRoadAddress,
                (result: KakaoAddressResult[], status: string) => {
                    if (status !== "OK") return;

                    const newAddress = {
                        sido: data.sido,
                        sigungu: data.sigungu,
                        eupmyeondong: data.bname || data.roadname,
                        fullName: selectedRoadAddress,
                        latitude: Number(result[0].y),
                        longitude: Number(result[0].x),
                    };



                    setUserAddress(newAddress);
                    modal.closeModal();
                }
            );
        });
    };

    const modal = useModal();
    return (
        <div className="
                    flex gap-3
                    p-8 
                    rounded-[16px]
                    border
                    border-[#36415380]
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    mb-4">
            <div className="bg-[#BFFF0B1A] w-10 h-10 rounded-[10px] p-2 flex justify-center items-center"><img src={MyOnboardingPurpose} alt="온보딩 개별 사진" /></div>
            <div className=" flex flex-col gap-5 w-full">
                <p className="text-xl flex items-center h-10 text-white font-extrabold ">{title}</p>
                <div
                    onClick={modal.openModal}
                    className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                >{userAdress.fullName ? userAdress.fullName : content}</div>
            </div>
            <SearchAdressModal
                isModal={modal.isModal} closeModal={modal.closeModal} completeHandler={completeHandler} />
        </div>
    );
}