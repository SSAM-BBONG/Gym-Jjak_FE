import { TrainerEssentialQulificationIcon } from "@/components/ui/image";

export default function MypageTrainerEssentialQUlification( {data}) {
    return (
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
                                    <p className="text-[#99A1AF] text-[12px] font-medium"> {data.certifications[0].fileOriginalName} </p>
                                </div>
                            </div>
                </div>
    );
}