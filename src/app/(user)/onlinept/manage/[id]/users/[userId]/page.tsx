import OnlinePtManageFeedBackCard from "@/feature/onlinept/components/OnlinePtManageFeedBackCard";
import OnlinePtStatus from "@/feature/onlinept/components/OnlinePtStatus";
import PtManageFeedBackCard from "@/feature/pt/components/PtManageFeedBackCard";

export default function PtManageUserFeedBackPage() {
    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#36415380] rounded-[16px]
            p-6
            ">
                <div className="flex gap-6 items-start">
                    <div className="size-20 flex-1 rounded-full border-[2px] border-[#BFFF0B]"></div>
                    <div className="flex flex-9 flex-col gap-2 items-start">
                        <p className="text-[24px] font-black text-white"> 운동초보</p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> student@test.com </p>
                        <OnlinePtStatus text='수강중' />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 진행도 </p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 3/12주 </p>
                    </div>
                    <div className="flex h-2 rounded-full bg-[#364153]">
                        <p className="w-[30%] rounded-full bg-[#BFFF0B]"></p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="text-[14px] font-normal text-[#6A7282]"> 강습 : <span className="text-[#99A1AF]"> 체계적인 강습 집중 PT </span></p>
                    <p className="text-[14px] font-normal text-[#6A7282]"> 연락처 : <span className="text-[#99A1AF]"> 010-1234-5678 </span></p>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold"><img />채팅</button>
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">신고</button>
                <button className="bg-[#1E2939] text-white rounded-[10px] h-12 hover:bg-[#BFFF0B] hover:text-black w-full text-base font-bold">취소</button>
            </div>

            <OnlinePtManageFeedBackCard />
            <OnlinePtManageFeedBackCard />


        </div>
    );
}