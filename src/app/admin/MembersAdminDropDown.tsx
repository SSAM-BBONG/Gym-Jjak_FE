'use client'

import { AdminArrowButton, AdminMembers } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";

export default function MembersAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white gap-4">
                <img src={AdminMembers} alt="회원 관리" />회원 관리<img src={AdminArrowButton} alt="화살표 버튼" className={dropDownView ? "ml-auto -rotate-90" : "ml-auto"} />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/members/users?page=0">사용자 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/trainers?page=0">트레이너 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/organizations?page=0">조직 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/blacklists?page=0">블랙리스트 조회</AdminNavLink></li>
            </ul>
        </section>
    );
}