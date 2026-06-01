import { PtZoneFindCard, PtZonePtManage, PtZonePtRecord, PtZonePtRegist } from "@/components/ui/image";
import PtCard from "@/feature/pt/components/PtCard";
import PtPopularCard from "@/feature/pt/components/PtPopularCard";
import { decodeJWT } from "@/lib/decode";

export default async function PtZonePage() {

    // accessToken 디코딩 한 값 저장
    const userinf = await decodeJWT();

    return (
        <div className="flex flex-col gap-10 px-40">
            <div className="pt-10">
                <p className="text-[40px] font-black text-white"> PT ZONE </p>
                <p className="text-[16px] font-normal text-[#99A1AF]"> 전문 트레이너와 함께하는 1:1 맞춤 PT </p>
            </div>
            {/* 역할에 따라 서로 다른 UI 분기 설정 */}
            {userinf?.role === "TRAINER" ?
                (
                    <div className="grid grid-cols-4 gap-6">
                        <PtCard
                            imgsrc={PtZoneFindCard}
                            title="PT 찾기"
                            content="내 주변 PT 찾기"
                            movecoment="찾아보기"
                            move="/pt/find"
                        />
                        <PtCard
                            imgsrc={PtZonePtRecord}
                            title="PT 기록"
                            content="내 PT 기록 확인"
                            movecoment="확인하기"
                            move="/pt/records"
                        />
                        <PtCard
                            imgsrc={PtZonePtRegist}
                            title="PT 등록"
                            content="새로운 PT 등록 "
                            movecoment="등록하기"
                            move="/pt/regist"
                        />
                        <PtCard
                            imgsrc={PtZonePtManage}
                            title="PT 관리"
                            content="내 PT 관리"
                            movecoment="관리하기"
                            move="/pt/manage"
                        />
                    </div>
                )
                :
                (
                    <div className="grid grid-cols-3 gap-6">
                        <PtCard
                            imgsrc={PtZoneFindCard}
                            title="PT 찾기"
                            content="내 주변 PT 찾기"
                            movecoment="찾아보기"
                            move="/pt/find"
                        />
                        <PtCard
                            imgsrc={PtZonePtRecord}
                            title="PT 기록"
                            content="내 PT 기록 확인"
                            movecoment="확인하기"
                            move="/pt/records"
                        />
                        <PtCard
                            imgsrc={PtZonePtRegist}
                            title="트레이너 등록"
                            content="트레이너 등록 "
                            movecoment="등록하기"
                            move="/pt/trainer"
                        />
                    </div>
                )
            }


            <div className="
            flex justify-around
            border border-[#36415380] rounded-[16px]
            bg-[linear-gradient(90deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            ">
                <div className="flex flex-col items-center">
                    <p className="text-[30px] font-black text-[#BFFF0B]"> 1,234 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 등록된 헬스장 </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[30px] font-black text-[#BFFF0B]"> 892 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 활동 중인 트레이너 </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[30px] font-black text-[#BFFF0B]"> 15,678 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 진행 중인 PT </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[30px] font-black text-[#BFFF0B]"> 4.8 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 평균 만족도 </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 pb-15">
                <p className="text-[24px] font-black text-white"> 인기 강습 </p>
                <div className="grid grid-cols-4 gap-4">
                    <PtPopularCard />
                    <PtPopularCard />
                    <PtPopularCard />
                    <PtPopularCard />
                </div>
            </div>
        </div>
    );
}