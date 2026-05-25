'use client'

import { AdminArrowButton, AdminLogs } from "@/components/ui/image";
import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import { useState } from "react";

const menu = {
    '회원 관리': ['사용자 조회', '트레이너 조회', '조직 조회', '블랙리스트 조회'],
    '승인 관리': ['트레이너 승인', '조직 승인'],
    '신고 관리': ['PT 관리', '홈트 관리', '리뷰 관리', '댓글 관리', '게시글 관리', '피드백 관리'],
    '시스템 설정': ['카테고리 관리', '태그 관리'],
    '로그 확인': ['시스템 로그 조회', '시스템 경고 로그 조회']
}

export default function LogsAdminDropDown() {
    const [dropDownView, setDropDown] = useState<boolean>(true);

    const handleClickDropDown = () => {
        setDropDown(!dropDownView)
    }

    return (
        <section className="my-2">
            <div onClick={handleClickDropDown} className="flex gap-4 text-[#99A1AF] font-medium text-base py-3 px-4 items-center rounded-md hover:bg-gray-800 hover:text-white">
                <img src={AdminLogs} alt="관리자 로그 관리" />관리자 로그 관리<img src={AdminArrowButton} alt="화살표 버튼" className={dropDownView ? "ml-auto -rotate-90" : "ml-auto"} />
            </div>
            <ul hidden={dropDownView} className="px-4">
                <li><AdminNavLink href="/admin/logs">로그</AdminNavLink></li>
            </ul>
        </section>
    );
}