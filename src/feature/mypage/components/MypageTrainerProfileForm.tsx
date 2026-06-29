import { MypageInbody, TrainerEssentialQulificationIcon, TrainerProfileImgUpload } from "@/components/ui/image";
import { MyTrainerProfileData } from "../type";
import MypageTrainerProfile from "./MypageTrainerProfile";
import MypageTrainerEssentialQUlification from "./MypageTrainerEssendtialQulification";
import MypageTrainerProfileSelfIntroduction from "./MypageTrainerProfileSelfIntroduction";
import MypageTrainerProfileAwardHistory from "./MypageTrainerProfileAwardHistory";
import MypageTrainerQulification from "./MypageTrainerQulification";

interface MypageTrainerProfileFormProps {
    data : MyTrainerProfileData
}

export default function MypageTrainerProfileForm( {data}: MypageTrainerProfileFormProps) {
    return (
        <div className="flex flex-col px-40 pt-10">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-[36px] font-black text-white"> 트레이너 프로필 수정</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너 정보를 수정하세요</p>
                </div>
                <button 
                    type="button"
                    className="bg-[#BFFF0B] text-black text-[16px] px-4 py-2 rounded-[10px] font-bold"> 수정하기 </button>
            </div>

            <div className="flex flex-col gap-6 mt-6">
    
            <MypageTrainerProfile 
                data={data}
            />

            <MypageTrainerEssentialQUlification
                data={data}
            />

            <MypageTrainerQulification
                data={data}
            />

            <MypageTrainerProfileAwardHistory
                data={data}
            />

            <MypageTrainerProfileSelfIntroduction
                data={data}
            />
            <button className="bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 수정하기 </button>
            </div>
        </div>
    );
}