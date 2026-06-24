import { TrainerEssentialQulificationIcon, TrainerProfileImgDefault } from "@/components/ui/image";
import { TrainerApplicationPending } from "@/feature/pt/components/TrainerApplicationPending";
import TrainerRegistForm from "@/feature/pt/components/TrainerRegistForm";
import { getTrainerApplication } from "@/service/ptzone.service";

export default async function PtTrainerRegistPage() {

    const trainerApplicationData = await getTrainerApplication();

    return (
        <div>
            {trainerApplicationData.code === 'TRAINER_APPLICATION_404_1' 
            ?
            <TrainerRegistForm />
            : (
            <div className="flex flex-col px-80 py-10">
                <p className="text-[36px] font-black text-white"> 트레이너 신청 현황 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 신청 상태를 확인하세요 </p>

                <div className="flex flex-col gap-6 mt-6">

                    <TrainerApplicationPending
                        trainerApplicationId={trainerApplicationData.data.trainerApplicationId}
                    />

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
                            <div className="flex items-center justify-center size-30 border-[3px] border-[#BFFF0B] rounded-full overflow-hidden">
                                <img 
                                    className={`${trainerApplicationData.data.profileImageUrl && "w-full h-full"} object-cover`} 
                                    src={trainerApplicationData.data.profileImageUrl ?? TrainerProfileImgDefault} 
                                    alt="트레이너 프로필 수정 프로필 사진" />
                            </div>
                        </div>
                    </div>

                    <div className="
                                flex flex-col gap-4
                                p-8
                                bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                                border
                                border-[#36415380]
                                rounded-[16px]
                                ">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-3">
                                            <p className="text-[20px] font-extrabold text-white"> 필수 자격증 </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                        <div className="flex flex-1 gap-2 px-3 py-2 border border-[#364153] bg-[#1E293980] items-center rounded-[10px]"> 
                                            <img src={TrainerEssentialQulificationIcon} alt="자격증 업로드시 나오는 아이콘"/>
                                            <p className="text-[#99A1AF] text-[12px] font-medium"> {trainerApplicationData.data.certificateOriginalName} </p>
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
                        {trainerApplicationData.data.qualifications.map((data, index) => (
                        <p key={index} className="flex gap-2 text-[16px] font-normal text-[#D1D5DC]"> 
                            <span className="text-[#BFFF0B] font-black ">•</span> 
                            {data}
                        </p>
                        ))}
                    </div>

                    <div className="
                        flex flex-col gap-4
                        p-8
                        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                        border
                        border-[#36415380]
                        rounded-[16px]">
                        <p className="text-[20px] font-extrabold text-white"> 대회 경력 </p>
                            {trainerApplicationData.data.awardHistories.map((data, index) => (
                                <p key={index} className="flex gap-2 text-[16px] font-normal text-[#D1D5DC]"> 
                                    <span className="text-[#BFFF0B] font-black ">•</span> 
                                    {data}
                                </p>
                            ))}
                    </div>

                    <div className="
                    flex flex-col gap-4
                    p-8
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    border
                    border-[#36415380]
                    rounded-[16px]">
                        <p className="text-[20px] font-extrabold text-white"> 자기소개 </p>
                        <p className="text-[16px] font-normal text-[#D1D5DC]"> {trainerApplicationData.data.introduction} </p>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}