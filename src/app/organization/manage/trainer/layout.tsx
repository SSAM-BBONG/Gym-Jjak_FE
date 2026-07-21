"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OrganizationTrainerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isTrainerManage = pathname === "/organization/manage/trainer";

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <h1 className="font-extrabold text-4xl text-white"> 트레이너 관리 </h1>
            <p className="text-[14px] font-normal text-[#99A1AF] my-5"> 트레이너를 관리하고 승인하세요 </p>
            <nav aria-label="트레이너 관리 메뉴" className="mb-6 border-b border-[#364153]">
                <div className="flex gap-6">
                    <Link
                        href="/organization/manage/trainer"
                        aria-current={isTrainerManage ? "page" : undefined}
                        className={`border-b-2 px-1 pb-3 text-lg font-extrabold transition-colors ${
                            isTrainerManage
                                ? "border-[#BFFF0B] text-[#BFFF0B]"
                                : "border-transparent text-[#99A1AF] hover:text-white"
                        }`}
                    >
                        트레이너 관리
                    </Link>
                    <Link
                        href="/organization/manage/trainer/approval"
                        aria-current={!isTrainerManage ? "page" : undefined}
                        className={`border-b-2 px-1 pb-3 text-lg font-extrabold transition-colors ${
                            !isTrainerManage
                                ? "border-[#BFFF0B] text-[#BFFF0B]"
                                : "border-transparent text-[#99A1AF] hover:text-white"
                        }`}
                    >
                        트레이너 승인
                    </Link>
                </div>
            </nav>
            {children}
        </section>
    );
}
