import PtManageFeedBackCard from "@/feature/pt/components/PtManageFeedBackCard";
import { getPtStudentDetail } from "@/service/ptzone.service";

interface PtManageUserFeedBackPageProps {
  params: Promise<{
    userid: string;
  }>;
}

export default async function PtManageUserFeedBackPage( { params }: PtManageUserFeedBackPageProps) {
    const { userid } = await params

    const response = await getPtStudentDetail(userid);


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
                        <p className="text-[24px] font-black text-white"> {response.data.nickname}</p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> {response.data.email} </p>
                        <p className="px-3 py-1 border border-[#BFFF0B4D] rounded-full bg-[#BFFF0B33] text-[12px] font-extrabold text-[#BFFF0B]"> {response.data.status} </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 진행도 </p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {response.data.progressCount}/{response.data.totalSessionCount}회 </p>
                    </div>
                    <div className="flex h-2 rounded-full bg-[#364153]">
                        <p className="w-[30%] rounded-full bg-[#BFFF0B]"></p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="text-[14px] font-normal text-[#6A7282]"> 강습 : <span className="text-[#99A1AF]"> {response.data.title} </span></p>
                    <p className="text-[14px] font-normal text-[#6A7282]"> 연락처 : <span className="text-[#99A1AF]"> {response.data.phone} </span></p>
                </div>
            </div>

            <div className="
            grid grid-cols-3 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
            ">
                <p className="py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center"> 피드백 관리 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 운동일지 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 식단 관리 </p>
            </div>

            <PtManageFeedBackCard />


        </div>
    );
}