'use client'

import { AdminArrowButton, OrganizationGym } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import Image from "next/image";
import { useState } from "react";



export default function GymOrgDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <div className="relative w-5 h-5">
                    <Image
                        src={OrganizationGym}
                        alt="헬스장 관리"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                헬스장 관리
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
                <li><AdminNavLink href='/organization/gym/approval'>트레이너 승인</AdminNavLink></li>
                <li><AdminNavLink href='/organization/gym/trainers'>트레이너 관리</AdminNavLink></li>
                <li><AdminNavLink href='/organization/gym/pts'>PT 관리</AdminNavLink></li>
            </ul>
        </section>
    );
}