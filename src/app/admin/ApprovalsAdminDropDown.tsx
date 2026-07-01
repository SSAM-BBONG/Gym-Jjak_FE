'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import arrowButton from '../../../public/admin-arrowbutton.svg';
import { useState } from "react";
import { AdminApprovals, AdminArrowButton } from "@/components/ui/image";
import Image from "next/image";


export default function ApprovalsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminApprovals}
                        alt="승인 관리"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                승인 관리
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
                <li><AdminNavLink href="/admin/approvals/organizations?page=0">조직 승인</AdminNavLink></li>
                <li><AdminNavLink href="/admin/approvals/trainers?page=0">트레이너 승인</AdminNavLink></li>
            </ul>
        </section>
    );
}