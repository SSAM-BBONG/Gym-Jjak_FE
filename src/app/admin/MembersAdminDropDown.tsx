'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";

export default function MembersAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section>
            <div onClick={handleClickDropDown} className="flex text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img />회원 관리<img className="ml-auto" />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/members/users">사용자 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/trainers">트레이너 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/organizations">조직 조회</AdminNavLink></li>
                <li><AdminNavLink href="/admin/members/blacklists">블랙리스트 조회</AdminNavLink></li>
            </ul>
        </section>
    );
}