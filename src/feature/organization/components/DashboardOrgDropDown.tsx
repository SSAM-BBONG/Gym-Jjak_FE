'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";
import { AdminArrowButton, AdminDashboard } from "@/components/ui/image";
import Image from "next/image";


export default function DashboardOrgDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminDashboard}
                        alt="대시보드"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                대시보드
                <div className="relative ml-auto w-2 h-3">
                    <Image
                        src={AdminArrowButton}
                        alt="화살표 버튼"
                        fill
                        sizes="w-4 h-4"
                        className={dropDownView ? "-rotate-90" : ""}
                    />
                </div>
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/organization/dashboard/gym">헬스장 통계</AdminNavLink></li>
                <li><AdminNavLink href="/organization/dashboard/sales">매출 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}