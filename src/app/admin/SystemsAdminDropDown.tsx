'use client'

import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";



export default function SystemsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section>
            <div onClick={handleClickDropDown} className="flex text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img />시스템 관리<img className="ml-auto" />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href='/admin/systems/categories'>카테고리 관리</AdminNavLink></li>
                <li><AdminNavLink href='/admin/systems/tags'>태그 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}