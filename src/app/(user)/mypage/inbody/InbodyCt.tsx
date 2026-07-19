import { Inbody } from "@/feature/mypage/type";
import InbodyDeleteButton from "./InbodyDeleteButton";

export default function InbodyCt({ inbody, index }: { inbody: Inbody, index: number }) {

    return (
        <div className=" p-4 rounded-md bg-[#1E2939] border-[#364153] border mb-3">
            <div className="flex justify-between">
                <p className="font-normal text-[#99A1AF] text-sm">{inbody.measuredDate}</p>
                {index === 0 && <p className="text-black text-[12px] bg-[#BFFF0B] font-bold py-1 px-2 rounded-xl">최신</p>}
            </div>
            <div className="flex gap-4 mb-3">
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        키
                    </p>
                    <p className="text-sm font-bold text-white" >{inbody.height}cm</p>
                </div>
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        몸무게
                    </p>
                    <p className="text-sm font-bold text-white" >{inbody.weight}kg</p>
                </div>
            </div>
            <div className="flex gap-4 mb-3">
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        체지방률
                    </p>
                    <p className="text-sm font-bold text-white" >{inbody.bodyFatPercentage}</p>
                </div>
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        골격근량
                    </p>
                    <p className="text-sm font-bold text-white" >{inbody.skeletalMuscleMass}</p>
                </div>
            </div>
            <div className="w-full">
                <p className="text-[#6A7282] text-sm font-normal">
                    BMI
                </p>
                <p className="text-sm font-bold text-[#FDC700]" >{inbody.bmi}({inbody.bmiStatusDescription})</p>
            </div>
            <InbodyDeleteButton inbodyId={inbody.inbodyId} />
        </div>
    );
}