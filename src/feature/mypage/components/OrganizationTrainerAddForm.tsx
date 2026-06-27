'use client'

import { CloseButton, OrganizationTrainerDefaultProfile, OrganizationTrainerNotFound, OrganTrainerAdd } from "@/components/ui/image";
import { useState, useTransition } from "react";
import { OrganizationManageTrainerSearchItem } from "../type";
import { organizationTrainerSearchAction } from "../action";

interface TrainerDetailModal {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
}


export default function OrganizationTrainerAddForm({ isModal, closeModal, activeModal}: TrainerDetailModal) {
    if (!isModal) return null;

    const [keyword, setKeyword] = useState("");
    const [trainers, setTrainers] = useState<OrganizationManageTrainerSearchItem[]>([]);
    console.log(trainers);

    const handleSearchClick = async () => {
        const result = await organizationTrainerSearchAction(keyword);

            if (!result.success) {
            setTrainers([]);
            return;
            }

            setTrainers(result.data?.content ?? []);
    };

    return (
       <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-lg rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-6 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">트레이너 추가</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>

                    <div className="flex flex-col gap-3 py-6">   
                        <p className="text-[18px] font-extrabold text-white"> 사용자 ID 검색</p>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="사용자 ID를 입력하세요"
                            className="flex-1 border border-[#364153] rounded-[10px] px-4 py-3 bg-[#1E2939] text-[16px] text-white font-normal"
                            />
                        <button 
                            type="button"
                            onClick={handleSearchClick}
                            className="flex gap-3 items-center px-6 py-3 rounded-[10px] bg-[#BFFF0B]"> 
                            <img src={OrganTrainerAdd} alt="조직 트레이너 검색"/>
                            <p className="text-black font-semibold">  검색 </p> 
                        </button>
                    </div>
                    </div>

                    <div className="flex flex-col border border-[#364153] rounded-[20px] overflow-hidden mb-5">
                        <p className="w-full text-[14px] text-[#99A1AF] font-semibold px-5 py-3 border-b border-[#364153] bg-[#1E293999]"> 검색 결과</p>
                        {trainers.map((trainer) => (
                        <>
                        <div
                            key={trainer.trainerProfileId} 
                            className="flex justify-between items-center px-6 py-5 bg-[#182232]">
                            <div className="flex gap-3 items-center">
                                <img src={OrganizationTrainerDefaultProfile}/>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[18px] text-white font-bold"> {trainer.name}</p>
                                    <div className="flex gap-5">
                                        <p className="text-[14px] font-normal text-[#6A7282]"> {trainer.nickname} </p>
                                        <p className="text-[14px] font-normal text-[#6A7282]"> {trainer.username}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="px-5 py-2 text-black text-[16px] font-bold bg-[#BFFF0B] rounded-[10px]"> + 추가</button>
                        </div>
                        {!trainers &&
                        <div className="flex gap-3 items-center px-6 py-5 bg-[#182232]">
                            <img src={OrganizationTrainerNotFound}/>
                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#FF6467] font-bold"> 사용자를 찾을 수 없습니다</p>
                                <p className="text-[12px] font-normal text-[#6A7282]"> 트레이너ID와 일치하는 사용자가 없습니다. ID를 다시 확인해주세요 </p>
                            </div>
                        </div> 
                        }   
                        </>
                        ))}
                    </div>

                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        추가
                    </button>
                </article>
            </form>
        </section>
    );
}