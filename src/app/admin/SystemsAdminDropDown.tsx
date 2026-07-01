'use client'

import { AdminArrowButton, AdminSystems } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import Image from "next/image";
import { useState } from "react";



export default function SystemsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminSystems}
                        alt="시스템 관리"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                시스템 관리
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
                <li><AdminNavLink href='/admin/systems/categories'>카테고리 관리</AdminNavLink></li>
                <li><AdminNavLink href='/admin/systems/tags'>태그 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}