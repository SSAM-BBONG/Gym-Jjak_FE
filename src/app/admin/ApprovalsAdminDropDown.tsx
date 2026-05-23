'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import arrowButton from '../../../public/admin-arrowbutton.svg';
import { useState } from "react";


export default function ApprovalsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img />승인 관리<img src={arrowButton} alt="화살표 버튼" className="ml-auto" />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/approvals/organizations">조직 승인</AdminNavLink></li>
                <li><AdminNavLink href="/admin/approvals/trainers">트레이너 승인</AdminNavLink></li>
            </ul>
        </section>
    );
}