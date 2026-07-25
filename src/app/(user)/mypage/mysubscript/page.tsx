import type { MyPlan } from "@/feature/payment/type";
import { getMyPlan } from "@/service/payment.service";
import { format } from "date-fns";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

const planNames: Record<MyPlan["planType"], string> = {
    MONTHLY: "AI 월간 구독권",
    YEARLY: "AI 연간 구독권",
};


export default async function Page() {
    const response = await getMyPlan();
    const subscription: MyPlan | null = response.data;

    return (
        <main className="flex flex-col px-6 pb-12 pt-10 sm:px-12 lg:px-40">
            <h1 className="text-[28px] font-black text-white sm:text-[36px]">
                내 구독 내역
            </h1>
            <p className="mt-1 text-[14px] font-normal text-[#99A1AF]">
                AI 구독 내역을 확인하세요
            </p>

            <section className="mt-8">
                {subscription ? (
                    <div className="relative overflow-hidden rounded-[20px] border border-[#BFFF0B]/25 bg-[#101828] p-6 sm:p-8">
                        <div
                            aria-hidden="true"
                            className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#BFFF0B]/10 blur-3xl"
                        />

                        <div className="relative">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold ${subscription.status === "ACTIVE"
                                            ? "bg-[#BFFF0B]/15 text-[#BFFF0B]"
                                            : "bg-[#364153] text-[#99A1AF]"
                                            }`}
                                    >
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        {subscription.status === "ACTIVE"
                                            ? "이용 중"
                                            : "만료됨"}
                                    </span>

                                    <p className="mt-5 text-[13px] font-semibold text-[#99A1AF]">
                                        {subscription.status === "ACTIVE"
                                            ? "현재 이용 중인 플랜"
                                            : "이전에 이용한 플랜"}
                                    </p>
                                    <h2 className="mt-1 text-[24px] font-black text-white sm:text-[28px]">
                                        {planNames[subscription.planType]}
                                    </h2>
                                    <p className="mt-2 text-[14px] leading-6 text-[#99A1AF]">
                                        AI 맞춤 운동 및 식단 추천 서비스를 이용할 수
                                        있습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 h-px bg-[#36415380]" />

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[14px] border border-[#36415380] bg-[#1E2939]/70 p-4">
                                    <div className="flex items-center gap-2 text-[#99A1AF]">
                                        <CalendarDays className="h-4 w-4" />
                                        <span className="text-[12px] font-semibold">
                                            구독 시작일
                                        </span>
                                    </div>
                                    <p className="mt-2 text-[15px] font-bold text-white">
                                        {format(subscription.startedAt, 'yyyy-MM-dd')}
                                    </p>
                                </div>

                                <div className="rounded-[14px] border border-[#36415380] bg-[#1E2939]/70 p-4">
                                    <div className="flex items-center gap-2 text-[#99A1AF]">
                                        <CalendarDays className="h-4 w-4" />
                                        <span className="text-[12px] font-semibold">
                                            {subscription.status === "ACTIVE"
                                                ? "이용 만료일"
                                                : "만료일"}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-[15px] font-bold text-white">
                                        {format(subscription.expiredAt, 'yyyy-MM-dd')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative overflow-hidden rounded-[20px] border border-[#36415380] bg-[#101828] px-6 py-12 text-center sm:px-10 sm:py-16">
                        <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#BFFF0B]/10 blur-3xl"
                        />

                        <div className="relative mx-auto flex max-w-md flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#BFFF0B]/10 text-[#BFFF0B]">
                                <Sparkles className="h-8 w-8" />
                            </div>
                            <h2 className="mt-5 text-[22px] font-black text-white">
                                아직 이용 중인 구독이 없어요
                            </h2>
                            <p className="mt-2 text-[14px] leading-6 text-[#99A1AF]">
                                AI가 운동 목표와 기록을 분석해 나에게 맞는
                                <br className="hidden sm:block" />
                                운동 루틴과 식단을 추천해 드려요.
                            </p>
                            <Link
                                href="/plan"
                                className="mt-7 inline-flex items-center gap-2 rounded-[12px] bg-[#BFFF0B] px-6 py-3 text-[14px] font-extrabold text-[#101828] transition hover:bg-[#D0FF4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFFF0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101828]"
                            >
                                AI 구독 시작하기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
