'use client'

import useModal from "@/components/hooks/useModal";
import { MypageMyActivity, PtRecordComplete, PtRecordVideo } from "@/components/ui/image";
import PtFeeBackCheckModal from "./PtFeedBackCheckModal";
import PtFeeBackRegistModal from "./PtFeedBackRegistModal";

export default function PtManageFeedBackCard() {

    const activefunc =() =>{
        console.log('1');
    }   

    const modal = useModal(activefunc);

    return (
        <>
        <div className="
        flex flex-col gap-6
        p-5
        border border-[#1E2939] rounded-[16px]
        bg-[#101828]
        ">
            <p className="text-[20px] font-black text-white"> 주차별 커리큘럼 & 피드백</p>
            <div className="flex items-start gap-3 border border-[#BFFF0B4D] bg-[#1E293980] p-4 rounded-[14px]">
                <img src={PtRecordComplete}/>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-1 justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <p className="text-[16px] font-extrabold text-white"> 1회차: 기초 자세 교정 및 평가 </p>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 수업일 : 2026-05-01 </p>
                        </div>
                        <button className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 수정 </button>
                    </div>   
                    <div className="
                    flex flex-col gap-1
                    border border-[#36415380] rounded-[10px]
                    bg-[#10182880]
                    p-4"
                    onClick={modal.openModal}>
                        <div className="flex flex-col gap-2 pb-2 border-b border-b-[#364153]">
                            <div className="flex justify-between">
                                <p className="flex gap-3 text-[14px] font-extrabold text-[#BFFF0B] whitespace-nowrap items-center">
                                    <img src={PtRecordVideo} alt="PT 상세 신청기록 동영상"/> 
                                    트레이너 피드백 
                                </p>
                                <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-01 </p>
                            </div>
                            <p className="text-[14px] font-medium text-[#99A1AF] hover:text-[#BFFF0B]"> 비디오 피드백 보기</p>
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                            <p className="flex items-center gap-3 text-[14px] font-extrabold text-[#BFFF0B]">
                                <img src={MypageMyActivity} width={16} height={16} alt="PT 상세 신청기록 동영상"/> 
                                텍스트 피드백
                            </p>
                            <p className="text-[14px] font-normal text-[#D1D5DC]"> 첫 수업 잘 하셨습니다. 기본 자세가 안정적이며, 다음 시간에는 무게를 조금 늘려보겠습니다. 호흡법과 자세가 좋으니 다음 주부터 본격적으로 진행하겠습니다. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="
        flex items-center justify-between gap-6
        p-5
        border border-[#1E2939] rounded-[16px]
        bg-[#101828]
        ">
            <div className="flex items-center gap-3">
                <p className="px-4 py-2 text-[14px] font-extrabold text-[#99A1AF] bg-[#364153] rounded-full"> 1 </p>
                <p className="text-[18px] font-extrabold text-white"> 인클라인 프레스 </p>
            </div>
            <button
                onClick={modal.openModal} 
                className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 
                등록하기 
            </button>
            <PtFeeBackRegistModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
            />
        </div>
        </>
    );
}