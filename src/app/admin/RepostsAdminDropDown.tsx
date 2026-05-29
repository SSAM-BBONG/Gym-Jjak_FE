'use client'

import { AdminArrowButton, AdminReports } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";


export default function ReportsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img src={AdminReports} alt='신고 관리' />신고 관리<img src={AdminArrowButton} alt="화살표 버튼" className={dropDownView ? "ml-auto -rotate-90" : "ml-auto"} />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/reports/comments?page=1">댓글 관리</AdminNavLink></li>
                <li><AdminNavLink href="/admin/reports/feedbacks?page=1">피드백 관리</AdminNavLink></li>
                <li><AdminNavLink href="/admin/reports/posts?page=1">게시글 관리</AdminNavLink></li>
                <li><AdminNavLink href="/admin/reports/pt?page=1">PT 관리</AdminNavLink></li>
                <li><AdminNavLink href="/admin/reports/reviews?page=1">리뷰 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}