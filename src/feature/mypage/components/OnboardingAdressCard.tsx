'use client'

import SearchAdressModal from "@/app/(user)/auth/onboarding/SearchAdressModal";
import useModal from "@/components/hooks/useModal";
import { MyOnboardingPurpose } from "@/components/ui/image";
import { RegionType } from "@/feature/auth/type";
import { OnboardingType } from "@/lib/onboardingSchema";
import Image from "next/image";
import { useState } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { UseFormSetValue } from "react-hook-form";

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

export default function OnboardingAdressCard({ title, content, setValue }: { title: string, content: RegionType, setValue: UseFormSetValue<OnboardingType> }) {
    const [isKakaoLoading, kakaoError] = useKakaoLoader({
        appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? "",
        libraries: ["services"],
    });

    const [addressError, setAddressError] = useState("");
    const [userAdress, setUserAddress] = useState({
        "sido": content.sido,
        "sigungu": content.sigungu,
        "eupmyeondong": content.eupmyeondong,
        "fullName": content.fullName,
        "latitude": content.latitude,
        "longitude": content.longitude
    })

    const completeHandler = (data: DaumAddressData) => {
        if (isKakaoLoading) {
            setAddressError("지도 서비스를 준비 중입니다. 잠시 후 다시 선택해주세요.");
            return;
        }

        if (kakaoError || !window.kakao?.maps?.services) {
            setAddressError("지도 서비스를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.");
            return;
        }

        setAddressError("");
        const selectedRoadAddress = data.roadAddress;
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
            selectedRoadAddress,
            (result: KakaoAddressResult[], status: string) => {
                if (status !== "OK" || !result[0]) {
                    setAddressError("선택한 주소의 좌표를 찾지 못했습니다. 다른 주소를 선택해주세요.");
                    return;
                }

                const newAddress = {
                    sido: data.sido,
                    sigungu: data.sigungu,
                    eupmyeondong: data.bname || data.roadname,
                    fullName: selectedRoadAddress,
                    latitude: Number(result[0].y),
                    longitude: Number(result[0].x),
                };

                setUserAddress(newAddress);
                setValue('region', newAddress);
                modal.closeModal();
            }
        );
    };

    const modal = useModal();
    return (
        <div className="
                    flex gap-2 sm:gap-3
                    p-5 sm:p-6 lg:p-8
                    rounded-[12px] sm:rounded-[14px] lg:rounded-[16px]
                    border
                    border-[#36415380]
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    mb-3 sm:mb-4">
            <div className="bg-[#BFFF0B1A] w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[10px] p-1.5 sm:p-2 flex justify-center items-center">
                <div className="relative w-4 h-4 lg:w-5 lg:h-5">
                    <Image
                        src={MyOnboardingPurpose}
                        alt="온보딩 개별 사진"
                        fill
                        sizes="w-10 h-10"
                        className="object-cover hover:cursor-pointer"
                    />
                </div>
            </div>
            <div className=" flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full">
                <p className="text-base sm:text-lg lg:text-xl flex items-center h-8 sm:h-9 lg:h-10 text-white font-extrabold ">{title}</p>
                <div
                    onClick={() => {
                        setAddressError("");
                        modal.openModal();
                    }}
                    className="font-normal text-sm sm:text-base text-white w-full bg-[#1E2939] border-[#364153] p-2.5 sm:p-3 rounded-[10px]"
                >{userAdress.fullName ? userAdress.fullName : content.fullName}</div>
                {addressError && <p className="text-xs sm:text-sm text-red-400">{addressError}</p>}
            </div>
            <SearchAdressModal
                isModal={modal.isModal} closeModal={modal.closeModal} completeHandler={completeHandler} />
        </div>
    );
}
