'use client'

import { onBoarding6Schema, OnBoarding6Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { onbordingRequest } from "@/feature/auth/type";
import SearchAdressModal from "./SearchAdressModal";
import useModal from "@/components/hooks/useModal";
import { onboardingAction } from "@/feature/auth/action";
import OneButtonModal from "@/components/ui/OneButtonModal";
import Link from "next/link";

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

export default function Onboarding6Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();
    const [userAdress, setUserAddress] = useState({
        "sido": "",
        "sigungu": "",
        "eupmyeondong": "",
        "fullName": "",
        "latitude": 0,
        "longitude": 0
    })
    const [apiState, setApiState] = useState<{ success: boolean; message?: string }>({
        success: false,
        message: ''
    });

    const modal = useModal();

    const errorModal = useModal();

    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OnBoarding6Type>({
        resolver: zodResolver(onBoarding6Schema),
        defaultValues: {
            region: totalData?.region || userAdress
        },
        mode: 'onSubmit'
    })

    const handleNext = async () => {
        const res = await onboardingAction(totalData);
        setApiState(res);
        if (!apiState.success) {
            errorModal.openModal();
        }
    }

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

                    setTotalData({
                        ...totalData,
                        region: newAddress,
                    });

                    setUserAddress(newAddress);
                    setValue("region", newAddress);
                    modal.closeModal();
                }
            );
        });
    };


    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="flex flex-col gap-3 pb-8 sm:pb-10 lg:pb-12 w-full sm:w-md lg:w-md m-auto">
                <label className="text-sm font-medium text-[#D1D5DC]">선호 지역</label>
                <div className="flex mb-4 sm:mb-5 lg:mb-6 gap-2"
                    onClick={modal.openModal}>
                    <input
                        readOnly
                        placeholder="선호 지역을 작성해주세요"
                        value={userAdress.fullName}
                        className="min-w-0 w-full px-3 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-4 text-sm sm:text-base lg:text-base border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
                    <button type="button" className="font-semibold px-3 sm:px-4 lg:px-6 py rounded-[10px] text-sm sm:text-base lg:text-base bg-[#BFFF0B] text-black">주소 찾기</button>
                </div>
            </div>
            {errors && <div className="text-red-500 text-md mb-5 text-center">{errors.region?.message ? errors.region?.message : '주소를 검색해주세요'}</div>}

            <article className="flex">
                <Link href='/auth/onboarding?page=5'> <button type="button" className="py-2.5 sm:py-3 lg:py-3 px-5 sm:px-6 lg:px-8 rounded-[10px] text-sm sm:text-base lg:text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button></Link>
                <button type="submit" className="ml-auto bg-[#BFFF0B] py-2.5 sm:py-3 lg:py-3 px-5 sm:px-6 lg:px-8 rounded-[10px] text-sm sm:text-base lg:text-base font-bold">다음</button>
            </article>
            <SearchAdressModal
                isModal={modal.isModal} closeModal={modal.closeModal} completeHandler={completeHandler} />
            <OneButtonModal isModal={errorModal.isModal} closeModal={errorModal.closeModal} title='온보딩' content={apiState.message ? apiState.message : '확인되지 않는 오류입니다.'} />
        </form>
    );
}
