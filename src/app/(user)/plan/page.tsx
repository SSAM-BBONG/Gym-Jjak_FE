import AiAnswerScope from "@/feature/plan/components/AiAnswerScope";
import FeatureCard from "@/feature/plan/components/FeatureCard";
import PlanCard from "@/feature/plan/components/PlanCard";
import ReportFeatureCard from "@/feature/plan/components/ReportFeatureCard";
import SectionTitle from "@/feature/plan/components/SectionTitle";
import SmallFeatureCard from "@/feature/plan/components/SmallFeatureCard";
import SubscriptionPaymentForm from "@/feature/plan/components/SubscriptionPaymentForm";
import {
    Camera,
    ClipboardList,
    Dumbbell,
    MessageCircle,
    Sparkles,
} from "lucide-react";

export default function PlanPage() {
    return (
        <main className="mx-40 py-16">
            <section className="w-full flex flex-col items-center text-center">
                <p className="flex items-center gap-2 rounded-full border border-[#BFFF0B4D] bg-[#BFFF0B0D] px-4 py-1 text-[13px] text-[#BFFF0B] font-extrabold">
                    <Sparkles size={14} />
                    AI 구독
                </p>
                <h1 className="text-[48px] leading-tight text-white font-black mt-7">
                    짐짝만의 데이터로
                    <br />
                    <span className="text-[#BFFF0B]">나에게만 맞는 AI</span>
                </h1>
                <p className="text-[20px] text-[#99A1AF] font-normal leading-9 mt-6">
                    내 운동기록·PT이력·식단 누적치를 직접 아는 AI.
                    <br />
                    챗봇·식단 분석·시장 리포트를 하나의 구독으로.
                </p>
            </section>
            <SubscriptionPaymentForm>
                <h2 className="text-[36px] text-white font-black">구독 플랜 선택</h2>

                <div className="w-full flex gap-6 mt-12">
                    <PlanCard
                        id="monthly"
                        name="planType"
                        value="MONTHLY"
                        title="월간 구독"
                        price="4,900"
                        unit="원/월"
                        description="연간 결제 시 9,800원 절약"
                    />
                    <PlanCard
                        id="yearly"
                        name="planType"
                        value="YEARLY"
                        title="연간 구독"
                        price="49,000"
                        unit="원/년"
                        description="월 4,083원 · 17% 절약"
                        defaultChecked
                        badge="BEST VALUE"
                    />
                </div>

            </SubscriptionPaymentForm>

            <SectionTitle title="일반 회원" badge="유료" />
            <section className="w-full flex gap-6">
                <FeatureCard
                    icon={<MessageCircle size={28} />}
                    title="AI 챗봇"
                    description="서비스 안내·정책 조회·결제 내역·잔여 PT 확인. 내 운동기록을 바탕으로 맞춤 루틴까지 대화로 바로 받아보세요."
                    items={["서비스·환불·고객센터 정책 안내", "결제 내역 / 잔여 PT 횟수 / PT 이력 조회", "운동기록 기반 맞춤 루틴 실시간 생성"]}
                />
                <FeatureCard
                    icon={<Camera size={28} />}
                    title="식단 AI 자동 분석"
                    description="사진 한 장으로 칼로리·탄수화물·단백질·지방을 AI가 자동 계산. 오늘 누적 식단과 목표를 고려한 한줄 코멘트도 바로 제공합니다."
                    items={["사진 → 칼로리·영양소 자동 분석", "직접 수정 가능한 분석값", "매 끼니 실시간 한줄평 코멘트"]}
                />
            </section>

            <SectionTitle title="트레이너 · 조직" badge="유료" />
            <ReportFeatureCard />

            <SectionTitle title="전체 회원" badge="무료" />
            <section className="w-full flex gap-6">
                <SmallFeatureCard
                    icon={<Dumbbell size={24} />}
                    title="AI PT 추천"
                    description="목표·부위·거리 조건 필터 + AI 추천 이유 제공"
                />
                <SmallFeatureCard
                    icon={<ClipboardList size={24} />}
                    title="식단 수기 기록"
                    description="메뉴·식사 유형·칼로리 직접 입력"
                />
            </section>
        </main>
    );
}
