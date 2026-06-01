import CheckRole from "@/components/layout/CheckRole";
import { MypageInbody, PtTrainerRegistPending } from "@/components/ui/image";
import TrainerRegistForm from "@/feature/pt/components/TrainerRegistForm";

export default async function PtTrainerRegistPage() {

    return (
        <div>
            <CheckRole mode='nopermission' />
            <TrainerRegistForm />

            <div className="flex flex-col px-40 pt-10">
                <p className="text-[36px] font-black text-white"> 트레이너 신청 현황 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 신청 상태를 확인하세요 </p>

                <div className="flex flex-col gap-6 mt-6">

                    <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        border border-[#F0B1004D] rounded-[16px]
                        ">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <div className="p-3 rounded-[14px] bg-[#F0B10033]">
                                    <img src={PtTrainerRegistPending} alt="트레이너 신청 현황 대기중" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[24px] font-extrabold text-white"> 대기중</p>
                                    <p className="text-[14px] font-normal text-[#99A1AF]"> 신청일: 2026. 5. 17 </p>
                                </div>
                            </div>
                            <p className="text-[16px] font-medium text-white rounded-[10px] bg-[#364153] px-4 py-2"> 수정 </p>
                        </div>
                        <p className="border border-[#F0B1004D] bg-[#733E0A33] px-4 py-4 rounded-[10px] text-[16px] font-normal text-[#FDC700]">관리자의 승인을 기다리고 있습니다. 영업일 기준 3-5일 소요될 수 있습니다.</p>
                    </div>

                    <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        border
                        border-[#36415380]
                        rounded-[16px]
                        ">
                        <p className="text-[20px] font-extrabold text-white"> 프로필 정보 </p>
                        <div className="flex gap-6 items-start  ">
                            <div className="flex items-center justify-center size-30 border-[3px] border-[#BFFF0B] rounded-full">
                                <img className="object-cover" src={MypageInbody} alt="트레이너 프로필 수정 프로필 사진" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-[14px] font-normal text-[#99A1AF]"> 강습 장소</p>
                                <p className="text-[18px] font-extrabold text-white"> 서울체육관</p>
                            </div>
                        </div>
                    </div>

                    <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        border
                        border-[#36415380]
                        rounded-[16px]">
                        <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                        <p className="flex gap-2 text-[16px] font-normal text-[#D1D5DC]"> <span className="text-[#BFFF0B] font-black ">•</span> 생활체육지도사 2급 </p>
                    </div>

                    <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        border
                        border-[#36415380]
                        rounded-[16px]">
                        <p className="text-[20px] font-extrabold text-white"> 대회 경력 </p>
                        <p className="flex gap-2 text-[16px] font-normal text-[#D1D5DC]"> <span className="text-[#BFFF0B] font-black ">•</span> 2023 대회 </p>
                    </div>

                    <div className="
                    flex flex-col gap-4
                    p-8
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    border
                    border-[#36415380]
                    rounded-[16px]">
                        <p className="text-[20px] font-extrabold text-white"> 자기소개 </p>
                        <p className="text-[16px] font-normal text-[#D1D5DC]"> xxx입니다. 잘부탁드립니다 </p>
                    </div>
                </div>
            </div>
        </div>
    );
}