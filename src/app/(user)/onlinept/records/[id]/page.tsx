import { PtfindTestImg } from "@/components/ui/image";
import OnlinePtManageFeedBackCard from "@/feature/onlinept/components/OnlinePtManageFeedBackCard";
import OnlinePtStatus from "@/feature/onlinept/components/OnlinePtStatus";

export default function PtManageUserFeedBackPage() {
    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
                <div
                    style={{ backgroundImage: `url(${PtfindTestImg})` }}
                    className="flex-3 bg-no-repeat bg-cover">
                </div>
                <div className="flex flex-col gap-2 flex-7 p-6">
                    <p className="text-[24px] font-black text-white"> 체계적인 가슴 집중PT</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 김철수 트레이너</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                            <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 3/12 </p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 상태 </p>
                            <p className="text-[14px] font-extrabold text-white"> 수강중 </p>
                        </div>
                    </div>
                    <div className="flex h-2 bg-[#364153] rounded-full mt-2">
                        <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">강사평 작성</button>
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">채팅</button>
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">신고</button>
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">취소</button>
            </div>

            <OnlinePtManageFeedBackCard />
            <OnlinePtManageFeedBackCard />


        </div>
    );
}