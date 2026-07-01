'use client'

import { CloseButton } from "@/components/ui/image";
import ActiveStatus from "../ActiveStatus";
import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import { TrainerAdminDetailAction, TrainerApplicationAdminDetailAction } from "../../action";
import TrainerApplicationStatus from "./TrainerApplicationStatus";
import Image from "next/image";

interface TrainerDetailModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    mode: string;
    trainerId: number;
}

const initTrainerApplicationInfo: TrainerApplication = {
    trainerApplicationId: 0,
    userId: 0,
    profileImageUrl: '',
    profileImageOriginalName: '',
    name: '',
    username: '',
    nickname: '',
    introduction: '',
    qualifications: [],
    certificateUrl: '',
    certificateOriginalName: '',
    awardHistories: [],
    status: 'PENDING'
}

const initTrainerInfo: Trainer = {
    trainerProfileId: 0,
    profileImageUrl: '',
    trainerName: '',
    introduction: '',
    averageRating: 0,
    reviewCount: 0,
    status: 'ACTIVE',
    certifications: [],
    awards: []
}

export default function TrainerDetailModal({ isModal, closeModal, activeModal, noneActiveModal, mode, trainerId }: TrainerDetailModal) {

    const [trainerApplicationInfo, setTrainerApplicationInfo] = useState<TrainerApplication>(initTrainerApplicationInfo)
    const [trainerInfo, setTrainerInfo] = useState<Trainer>(initTrainerInfo)

    useEffect(() => {
        if (!isModal) return;
        async function getTrainerApplicationInfo() {
            const response = await TrainerApplicationAdminDetailAction(trainerId);
            setTrainerApplicationInfo(response);
        }

        async function getTrainerInfo() {
            const response = await TrainerAdminDetailAction(trainerId);
            setTrainerInfo(response);
        }

        mode === 'trainerView' ? getTrainerInfo() : getTrainerApplicationInfo();
    }, [isModal, trainerId])

    if (!isModal) return null;
    const profileImageUrl = trainerApplicationInfo.profileImageUrl || trainerInfo.profileImageUrl;
    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">트레이너 상세 정보</h3>
                        <Image
                            src={CloseButton}
                            alt="모달 닫기 버튼"
                            fill
                            sizes="w-4 h-4"
                        />
                    </div>
                    <div className="flex items-center my-4 gap-6">
                        <div className="w-30 h-30">
                            <Image
                                src={profileImageUrl}
                                alt="트레이너 프로필 사진"
                                fill
                                sizes="w-30 h-30"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-[#E8EAF0] py-2">{trainerApplicationInfo.name || trainerInfo.trainerName}</h3>
                            <p className="font-normal text-base text-[#E8EAF0]">{trainerApplicationInfo.nickname}</p>
                            <p className="font-normal text-base text-[#E8EAF0]">{trainerApplicationInfo.username}</p>
                            {mode === 'trainerView' ? (
                                <ActiveStatus text={trainerInfo.status} />
                            ) : (
                                <TrainerApplicationStatus text={trainerApplicationInfo.status} />
                            )}
                        </div>
                    </div>
                    <section className="flex flex-col gap-6">
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">자기소개</p>
                            <div
                                className="flex items-center gap-4 border-[#364153] border w-full p-4 mt-2 bg-[#1E2939] rounded-md text-[#D1D5DC] text-base font-normal"
                            >
                                <p>{trainerApplicationInfo.introduction || trainerInfo.introduction}</p>
                            </div>
                        </article>
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">자격증</p>
                            {mode === 'trainerView' && (
                                <>
                                    {
                                        trainerInfo.certifications.map((certification) => (
                                            <InfoCard content={certification.name} key={certification.trainerCertificationId} />
                                        ))
                                    }
                                </>
                            )}
                            {mode !== 'trainerView' && (
                                <>
                                    <InfoCard content={trainerApplicationInfo.certificateOriginalName} key={trainerApplicationInfo.certificateOriginalName} href={trainerApplicationInfo.certificateUrl} />

                                    {
                                        trainerApplicationInfo.qualifications.map((qualification) => (
                                            <InfoCard content={qualification} key={qualification} />
                                        ))
                                    }
                                </>
                            )}
                        </article>
                        <article>
                            <p className="text-white font-bold text-lg mb-3.5">대회 경력</p>
                            {mode === 'trainerView' && (
                                <>
                                    {
                                        trainerInfo.awards.map((award) => (
                                            <InfoCard content={award.name} key={award.trainerAwardId} />
                                        ))
                                    }
                                </>
                            )}
                            {mode !== 'trainerView' && (
                                <>
                                    {
                                        trainerApplicationInfo.awardHistories.map((awardHistory) => (
                                            <InfoCard content={awardHistory} key={awardHistory} />
                                        ))
                                    }
                                </>
                            )}
                        </article>
                    </section>
                </article >
                {mode !== 'trainerView' && (
                    <article className='flex gap-3 mt-10'>
                        <button
                            type="button"
                            onClick={noneActiveModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                        >
                            반려
                        </button>
                        <button
                            onClick={activeModal}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                        >
                            승인
                        </button>
                    </article>
                )
                }
            </form >
        </section >
    );
}