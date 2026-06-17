import TrainerEssentialQulification from "./TrainerRegistEssentialQulificatoin";
import TrainerEssential from "./TrainerRegistEssential";
import TrainerAwardHistory from "./TrainerRegistAwardHistory";
import TrainerRegistSelfIntroduction from "./TrainerRegistSelfIntroduction";
import TrainerRegistProfile from "./TrainerRegistProfile";

export default function TrainerRegistForm () {
    return (
        <div className="flex flex-col px-80 pt-10">
            <p className="text-[36px] font-black text-white"> 트레이너 신청</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너로 활동하기 위한 정보를 입력하세요</p>

            <div className="flex flex-col gap-6 mt-6">
            
            <TrainerRegistProfile />

            <TrainerEssentialQulification/>

            <TrainerEssential />

            <TrainerAwardHistory />

            <TrainerRegistSelfIntroduction />
            <div className="flex gap-4">
            <button className="flex-1 bg-[#1E2939] text-white text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 취소 </button>
            <button className="flex-1 bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 신청하기 </button>
            </div>
            </div>
        </div>
    );
}