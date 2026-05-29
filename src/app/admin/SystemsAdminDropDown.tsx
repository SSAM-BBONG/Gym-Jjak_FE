'use client'

import { AdminArrowButton, AdminSystems } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";



export default function SystemsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img src={AdminSystems} alt="시스템 관리" />시스템 관리<img src={AdminArrowButton} alt="화살표 버튼" className={dropDownView ? "ml-auto -rotate-90" : "ml-auto"} />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href='/admin/systems/categories?page=1'>카테고리 관리</AdminNavLink></li>
                <li><AdminNavLink href='/admin/systems/tags?page=1'>태그 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}