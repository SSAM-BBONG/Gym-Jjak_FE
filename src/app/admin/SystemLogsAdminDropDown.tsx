'use client'

import { AdminArrowButton, AdminLogs } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import Image from "next/image";
import { useState } from "react";

const menu = {
    '회원 관리': ['사용자 조회', '트레이너 조회', '조직 조회', '블랙리스트 조회'],
    '승인 관리': ['트레이너 승인', '조직 승인'],
    '신고 관리': ['PT 관리', '홈트 관리', '리뷰 관리', '댓글 관리', '게시글 관리', '피드백 관리'],
    '시스템 설정': ['카테고리 관리', '태그 관리'],
    '로그 확인': ['시스템 로그 조회', '시스템 경고 로그 조회']
}

export default function SystemLogsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminLogs}
                        alt="시스템 로그 관리"
                        fill
                        sizes="w-10 h-10"
                    />
                </div>
                시스템 로그 관리
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
                <li><AdminNavLink href="/admin/logs">로그</AdminNavLink></li>
            </ul>
        </section>
    );
}