"use client";

import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { deletePtCourseAction } from "@/feature/pt/actions";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PtManageCourseActionsProps {
  ptCourseId: number;
}

export default function PtManageCourseActions({ ptCourseId }: PtManageCourseActionsProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    const result = await deletePtCourseAction(ptCourseId);

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="absolute right-3 top-3 z-20" onClick={(event) => event.stopPropagation()}>
      <button type="button" aria-label="PT 강습 관리 메뉴" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((current) => !current)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/70">
        <MoreHorizontal size={18} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-10 w-32 overflow-hidden rounded-lg border border-[#364153] bg-[#101828] py-1 shadow-xl">
          <button type="button" onClick={() => router.push(`/pt/manage/${ptCourseId}/edit`)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-white hover:bg-[#1E2939]"><Pencil size={15} /> 수정하기</button>
          <button type="button" onClick={() => { setIsMenuOpen(false); setIsDeleteConfirmOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#FF6467] hover:bg-[#82181A4D]"><Trash2 size={15} /> 삭제하기</button>
        </div>
      )}

      <TwoButtonModal isModal={isDeleteConfirmOpen} closeModal={() => setIsDeleteConfirmOpen(false)} activeModal={handleDelete} title="PT 강습 삭제" content="강습을 삭제하시겠습니까? 진행 중인 예약이 있는 강습은 삭제할 수 없습니다." />
      <OneButtonModal isModal={Boolean(errorMessage)} closeModal={() => setErrorMessage("")} title="PT 강습 삭제 실패" content={errorMessage} />
    </div>
  );
}
