import { PtZoneFindCard, PtZonePtManage, PtZonePtRecord, PtZonePtRegist } from "@/components/ui/image";
import { getPopularPtListsAction, getTrainerPtDashboardAction } from "@/feature/pt/actions";
import PtCard from "@/feature/pt/components/PtCard";
import PtDashboard from "@/feature/pt/components/PtDashboard";
import PtPopularCard from "@/feature/pt/components/PtPopularCard";
import PtTrainerPopularCard from "@/feature/pt/components/PtTrainerPopularCard";
import TrainerMarketReportCard from "@/feature/pt/components/TrainerMarketReportCard";
import { decodeJWT } from "@/lib/decode";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'pt',
    description: 'pt 트레이닝 메인 페이지입니다.',

    openGraph: {
        title: 'pt | GYMJJAK',
        description: 'pt 트레이닝 메인',
        url: '/pt'
    }
}

export default async function PtZonePage() {

    // accessToken 디코딩 한 값 저장
    const userinf = await decodeJWT();

    const popularPtData = await getPopularPtListsAction();
    const TrainerPtData = await getTrainerPtDashboardAction();

    return (
        <main className="flex flex-col gap-6 px-4 sm:gap-8 sm:px-10 md:gap-10 md:px-20 lg:gap-10 lg:px-40">
            <header className="pt-6 sm:pt-8 md:pt-10 lg:pt-10">
                <p className="text-[28px] font-black text-white sm:text-[34px] md:text-[36px] lg:text-[40px]"> PT ZONE </p>
                <p className="text-[14px] font-normal text-[#99A1AF] md:text-[15px] lg:text-[16px]"> 전문 트레이너와 함께하는 1:1 맞춤 PT </p>
            </header>
            {/* 역할에 따라 서로 다른 UI 분기 설정 */}
            {userinf?.role === "TRAINER" ?
                (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-6">
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
                        <TrainerMarketReportCard />
                    </div>
                )
                :
                (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:gap-6">
                        <PtCard
                            imgsrc={PtZoneFindCard}
                            title="PT 찾기"
                            content="내 주변 PT 찾기"
                            movecoment="찾아보기"
                            move="/pt/find"
                            testId="pt-find-link"
                            
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
                            move="/pt/trainer-apply"
                        />
                    </div>
                )
            }

            <section>
                <PtDashboard
                    userInf={userinf}
                    data={TrainerPtData?.data}
                />
            </section>    
            <section className="flex flex-col gap-2 pb-10 sm:gap-3 sm:pb-12 lg:gap-3 lg:pb-15">
                <p className="text-[20px] font-black text-white sm:text-[22px] lg:text-[24px]"> {userinf?.role === "TRAINER" ? "내 인기 강습" : "인기 강습"} </p>
                {userinf?.role === "TRAINER"
                ?
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-4">
                    {TrainerPtData.data?.inProgressPtCourses.map((item) => (
                    <Link 
                        key={item.ptCourseId} 
                        href={`/pt/manage/${item.ptCourseId}`}
                    >
                        <PtTrainerPopularCard 
                            data={item}
                        />
                    </Link>
                    ))}
                </div>
                :
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-4">
                    {popularPtData.data.map((item) => (
                        <Link
                            key={item.ptCourseId} 
                            href={`/pt/${item.ptCourseId}`}>
                        <PtPopularCard 
                            data={item}
                        />
                        </Link>
                    ))}
                </div>
                }

            </section>
        </main>
    );
}