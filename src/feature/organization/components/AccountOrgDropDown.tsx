'use client'

import { AdminArrowButton, AdminSystems } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import Image from "next/image";
import { useState } from "react";
import ChangePwCheck from "./ChangePwCheck";



export default function AccountOrgDropDown() {
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
                        alt="계정 관리"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                계정 관리
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
                <li><AdminNavLink href='/organization/account/gym'>헬스장 정보</AdminNavLink></li>
                <li><ChangePwCheck href='/organization/account/pw'>비밀번호 변경</ChangePwCheck></li>
                <li><AdminNavLink href='/organization/account/cancellation'>헬스장 해지</AdminNavLink></li>
            </ul>
        </section>
    );
}