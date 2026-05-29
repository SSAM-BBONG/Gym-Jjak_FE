'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import arrowButton from '../../../public/admin-arrowbutton.svg';
import { useState } from "react";
import { AdminApprovals, AdminArrowButton } from "@/components/ui/image";


export default function ApprovalsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img src={AdminApprovals} alt="승인 관리" />승인 관리<img src={AdminArrowButton} alt="화살표 버튼" className={dropDownView ? "ml-auto -rotate-90" : "ml-auto"} />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/approvals/organizations?page=1">조직 승인</AdminNavLink></li>
                <li><AdminNavLink href="/admin/approvals/trainers?page=1">트레이너 승인</AdminNavLink></li>
            </ul>
        </section>
    );
}